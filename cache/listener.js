const { Client } = require('pg');
const { createClient } = require('redis');
require('dotenv').config();

const pgClient = new Client({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT
});

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

const initialize = async () => {
  try {
    await pgClient.connect();
    console.log('Connected to PostgreSQL');

    await redisClient.connect();
    console.log('Connected to Redis');

    pgClient.query('LISTEN new_transaction');
    pgClient.query('LISTEN new_block');

    // Initial setup of the Redis list for transactions and blocks
    await initializeRedisTransactions();
    await initializeRedisBlocks();

    // Periodically update Redis cache
    setInterval(async () => {
      await initializeRedisTransactions();
      await initializeRedisBlocks();
    }, 5000); // Update every 5 seconds

    // Listen for new transactions and blocks
    pgClient.on('notification', async (msg) => {
      const payload = JSON.parse(msg.payload);

      if (msg.channel === 'new_transaction') {
        const txHash = payload.txHash;
        const query = 'SELECT * FROM transactions WHERE tx_hash = $1';
        const values = [txHash];
        try {
          const res = await pgClient.query(query, values);
          if (res.rows.length > 0) {
            await addTransactionWithTimestampToRedis(res.rows[0]);
          }
        } catch (err) {
          console.error('Error fetching new transaction from PostgreSQL', err);
        }
      }

      if (msg.channel === 'new_block') {
        const blockNumber = payload.blockNumber;
        const query = 'SELECT * FROM blocks WHERE block_number = $1';
        const values = [blockNumber];
        try {
          const res = await pgClient.query(query, values);
          if (res.rows.length > 0) {
            await redisClient.rPush('latest_blocks', JSON.stringify(res.rows[0]));
            await redisClient.lTrim('latest_blocks', 0, 99); // Ensure there are only 100 elements
          }
        } catch (err) {
          console.error('Error fetching new block from PostgreSQL', err);
        }
      }
    });

    pgClient.on('error', (err) => {
      console.error('PostgreSQL client error', err);
      reconnectPostgres();
    });

    redisClient.on('error', (err) => {
      console.error('Redis client error', err);
      reconnectRedis();
    });

  } catch (err) {
    console.error('Error in initialize function:', err);
    setTimeout(initialize, 5000); // Retry after 5 seconds
  }
};

const reconnectPostgres = () => {
  console.log('Reconnecting to PostgreSQL...');
  pgClient.connect((err) => {
    if (err) {
      console.error('PostgreSQL client reconnection error', err);
      setTimeout(reconnectPostgres, 5000); // Retry after 5 seconds
    } else {
      console.log('Reconnected to PostgreSQL');
    }
  });
};

const reconnectRedis = () => {
  console.log('Reconnecting to Redis...');
  redisClient.connect().catch((err) => {
    console.error('Redis client reconnection error', err);
    setTimeout(reconnectRedis, 5000); // Retry after 5 seconds
  });
};

// Function to initialize the Redis list with the latest 100 transactions
const initializeRedisTransactions = async () => {
  const query = 'SELECT * FROM transactions ORDER BY block_number DESC LIMIT 100';
  try {
    const res = await pgClient.query(query);
    await redisClient.del('latest_transactions');
    for (const row of res.rows) {
      await addTransactionWithTimestampToRedis(row);
    }
  } catch (err) {
    console.error('Error initializing Redis with latest transactions', err);
  }
};

// Function to add a new transaction with its block timestamp to Redis
const addTransactionWithTimestampToRedis = async (transaction) => {
  const blockQuery = 'SELECT timestamp FROM blocks WHERE block_number = $1';
  const blockValues = [transaction.block_number];
  try {
    const blockRes = await pgClient.query(blockQuery, blockValues);
    if (blockRes.rows.length > 0) {
      transaction.timestamp = blockRes.rows[0].timestamp;
    }
    await redisClient.rPush('latest_transactions', JSON.stringify(transaction));
    await redisClient.lTrim('latest_transactions', 0, 99); // Ensure there are only 100 elements
  } catch (err) {
    console.error('Error adding transaction with timestamp to Redis', err);
  }
};

// Function to initialize the Redis list with the latest 100 blocks
const initializeRedisBlocks = async () => {
  const query = 'SELECT * FROM blocks ORDER BY block_number DESC LIMIT 100';
  try {
    const res = await pgClient.query(query);
    await redisClient.del('latest_blocks');
    for (const row of res.rows) {
      await redisClient.rPush('latest_blocks', JSON.stringify(row));
    }
    await redisClient.lTrim('latest_blocks', 0, 99); // Ensure there are only 100 elements
  } catch (err) {
    console.error('Error initializing Redis with latest blocks', err);
  }
};

initialize();