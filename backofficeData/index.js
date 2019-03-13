 const { GraphQLServer } = require('graphql-yoga');
 const { queryType, stringArg, makeSchema } = require('nexus');
 const {pg} = require ('pg');
 const knex = require('knex');

 const env = process.env.NODE_ENV || 'development';
 const config = require(`./config/${env}`)
 const db = config.DB;


 
 const Query = queryType({
  definition(t) {
    t.string("hello", {
      args: { name: stringArg({ nullable: true }) },
      resolve: (parent, { name }) => `Hello ${name || "World"}!`,
    });
  },
  definition(t) {
    t.string("yourage", {
      args: { age: stringArg({ nullable: true }) },
      resolve: (parent, { age }) => `your age is ${age || "wow u old"}!`,
    });
  }
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts",
  },
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    yourage(age: Int): Int!
  }
`
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    yourage: (_, { age }) => `your age is ${age || 'wow u old'}`,
  },
}

const server = new GraphQLServer({
  typeDefs, 
  resolvers
})


server.start(() => console.log('Server is running on localhost:4000'))