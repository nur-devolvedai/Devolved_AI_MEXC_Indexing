const { ApolloServer, gql } = require('apollo-server');
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

client.connect();

const typeDefs = gql`
  type Block {
    number: Int
    hash: String
  }

  type Transaction {
    hash: String
    block_number: Int
    from_address: String
    to_address: String
    amount: String
    fee: String
  }

  type Account {
    address: String
    balance: String
  }

  type Query {
    blocks: [Block]
    transactions: [Transaction]
    account(address: String!): Account
  }
`;

const resolvers = {
  Query: {
    blocks: async () => {
      const res = await client.query('SELECT * FROM blocks');
      return res.rows;
    },
    transactions: async () => {
      const res = await client.query('SELECT * FROM transactions');
      return res.rows;
    },
    account: async (_, { address }) => {
      const res = await client.query('SELECT * FROM accounts WHERE address = $1', [address]);
      return res.rows[0];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
