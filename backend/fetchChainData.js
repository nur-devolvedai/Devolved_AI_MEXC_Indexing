const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

// Initialize WebSocket provider for the Substrate node
const wsProvider = new WsProvider(process.env.ARGOCHAIN_RPC_URL);

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

const RETRY_LIMIT = 5; // Number of retries for block processing
const RETRY_DELAY = 5000; // Delay between retries (in milliseconds)
const BATCH_SIZE = parseInt(process.env.FETCHING_BATCH_SIZE, 10); // Number of blocks to process in a batch

const main = async () => {
  try {
    // Create API instance
    const api = await ApiPromise.create({ provider: wsProvider });

    // Get the latest block number
    const latestHeader = await api.rpc.chain.getHeader();
    const latestBlockNumber = latestHeader.number.toNumber();
    console.log(`Latest block number: ${latestBlockNumber}`);

    // Load last processed block number if it exists
    let startBlockNumber = 0;
    if (fs.existsSync('lastProcessedBlock.txt')) {
      startBlockNumber = parseInt(fs.readFileSync('lastProcessedBlock.txt', 'utf8'), 10) + 1;
    }

    // Process blocks in batches
    for (let blockNumber = startBlockNumber; blockNumber <= latestBlockNumber; blockNumber += BATCH_SIZE) {
      const endBlockNumber = Math.min(blockNumber + BATCH_SIZE - 1, latestBlockNumber);
      await processBlockBatch(api, blockNumber, endBlockNumber);
    }

    // Fetch and store all account balances
    await fetchAndStoreAllAccounts(api);

    await pool.end();
  } catch (error) {
    console.error('Error initializing API:', error);
    await pool.end();
  }
};

// Process a batch of blocks
const processBlockBatch = async (api, startBlockNumber, endBlockNumber) => {
  const blockNumbers = [];
  for (let blockNumber = startBlockNumber; blockNumber <= endBlockNumber; blockNumber++) {
    blockNumbers.push(blockNumber);
  }

  const blockPromises = blockNumbers.map(blockNumber => processBlockWithRetries(api, blockNumber));
  await Promise.all(blockPromises);
};

// Retry processing a block up to the RETRY_LIMIT
const processBlockWithRetries = async (api, blockNumber) => {
  let retries = 0;
  while (retries < RETRY_LIMIT) {
    try {
      await processBlock(api, blockNumber);
      // Save last processed block number
      fs.writeFileSync('lastProcessedBlock.txt', blockNumber.toString(), 'utf8');
      break;
    } catch (error) {
      retries++;
      console.error(`Error processing block ${blockNumber}:`, error);
      if (retries < RETRY_LIMIT) {
        console.log(`Retrying block ${blockNumber} (${retries}/${RETRY_LIMIT})...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        console.error(`Failed to process block ${blockNumber} after ${RETRY_LIMIT} retries.`);
      }
    }
  }
};

// Process a single block
const processBlock = async (api, blockNumber) => {
  const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  const blockEvents = await api.query.system.events.at(blockHash);

  // Store block details
  const blockInsertQuery = `
    INSERT INTO blocks (number, hash, parent_hash, state_root, extrinsics_root)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT DO NOTHING
  `;
  const blockValues = [
    blockNumber,
    blockHash.toHex(),
    signedBlock.block.header.parentHash.toHex(),
    signedBlock.block.header.stateRoot.toHex(),
    signedBlock.block.header.extrinsicsRoot.toHex()
  ];
  await pool.query(blockInsertQuery, blockValues);

  // Process extrinsics (transactions) within the block
  const transactionQueries = [];
  signedBlock.block.extrinsics.forEach((extrinsic, index) => {
    const { isSigned, meta, method: { method, section }, args, signer, hash } = extrinsic;

    let gasFee = '0'; // Default gas fee to 0

    if (isSigned && section === 'balances' && method === 'Transfer') {
      const [to, amount] = args;
      const tip = meta.isSome ? meta.unwrap().tip.toString() : '0';

      // Check for Withdraw event within the block events to capture the gas fee
      blockEvents.forEach(({ event }) => {
        if (event.section === 'balances' && event.method === 'Withdraw') {
          const [who, fee] = event.data;
          if (who.toString() === signer.toString()) {
            gasFee = fee.toString();
          }
        }
      });

      transactionQueries.push({
        text: `
          INSERT INTO transactions (hash, block_number, from_address, to_address, amount, tip, gas_fee)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT DO NOTHING
        `,
        values: [hash.toHex(), blockNumber, signer.toString(), to.toString(), amount.toString(), tip, gasFee]
      });

      updateAccountBalance(api, signer.toString());
      updateAccountBalance(api, to.toString());
    }
  });

  if (transactionQueries.length > 0) {
    await Promise.all(transactionQueries.map(query => pool.query(query)));
  }

  // Store events
  const eventQueries = blockEvents.map(({ event, phase }) => {
    const { section, method, data } = event;
    return {
      text: `
        INSERT INTO events (block_number, section, method, data)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
      `,
      values: [blockNumber, section, method, JSON.stringify(data.map(d => d.toString()))]
    };
  });

  if (eventQueries.length > 0) {
    await Promise.all(eventQueries.map(query => pool.query(query)));
  }
};

// Update account balance for a given address
const updateAccountBalance = async (api, address) => {
  try {
    // Check if the address is of the correct length (32 bytes)
    if (address.length !== 48) { // 48 characters for hex representation of 32 bytes
      console.error(`Invalid AccountId provided, expected 32 bytes, found ${address.length / 2} bytes`);
      return;
    }

    const { data: { free: balance } } = await api.query.system.account(address);

    await pool.query(
      'INSERT INTO accounts (address, balance) VALUES ($1, $2) ON CONFLICT (address) DO UPDATE SET balance = $2',
      [address, balance.toString()]
    );
  } catch (error) {
    console.error(`Error updating balance for account ${address}:`, error);
  }
};

// Fetch and store all accounts and their balances
const fetchAndStoreAllAccounts = async (api) => {
  try {
    const accounts = await api.query.system.account.entries();
    const accountQueries = accounts.map(([key, account]) => {
      const address = key.args.map(k => k.toString())[0];
      const balance = account.data.free.toString();
      return {
        text: `
          INSERT INTO accounts (address, balance) VALUES ($1, $2)
          ON CONFLICT (address) DO UPDATE SET balance = $2
        `,
        values: [address, balance]
      };
    });

    if (accountQueries.length > 0) {
      await Promise.all(accountQueries.map(query => pool.query(query)));
    }
  } catch (error) {
    console.error('Error fetching and storing accounts:', error);
  }
};

// Start the main process
main().catch(console.error);
