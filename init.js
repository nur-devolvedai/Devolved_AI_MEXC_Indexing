const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD
});

client.connect();

const createTables = async () => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS blocks (
      number INTEGER PRIMARY KEY,
      hash TEXT,
      parent_hash TEXT,
      state_root TEXT,
      extrinsics_root TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_blocks_hash ON blocks(hash);

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      block_number INTEGER,
      section TEXT,
      method TEXT,
      data JSON
    );

    CREATE INDEX IF NOT EXISTS idx_events_block_number ON events(block_number);
    CREATE INDEX IF NOT EXISTS idx_events_section_method ON events(section, method);

    CREATE TABLE IF NOT EXISTS transactions (
      hash TEXT PRIMARY KEY,
      block_number INTEGER,
      from_address TEXT,
      to_address TEXT,
      amount TEXT,
      fee TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_transactions_block_number ON transactions(block_number);
    CREATE INDEX IF NOT EXISTS idx_transactions_from_address ON transactions(from_address);
    CREATE INDEX IF NOT EXISTS idx_transactions_to_address ON transactions(to_address);

    CREATE TABLE IF NOT EXISTS accounts (
      address TEXT PRIMARY KEY,
      balance TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_accounts_balance ON accounts(balance);

    CREATE TABLE IF NOT EXISTS metadata (
      id SERIAL PRIMARY KEY,
      data JSONB NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  client.end();
};

createTables();
