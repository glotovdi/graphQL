import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { FactAPI } from "./api/index.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    name:String
    id: Int!
  }

  type Fact {
    fact:String
    length: Int!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    user(id:Int): User
    fact: Fact
  }
`;

const users = [
  {
    id: 1,
    name: "Elizabeth Bennet",
  },
  {
    id: 2,
    name: "Fitzwilliam Darcy",
  },
];

const resolvers = {
  Query: {
    user: (parent, { id }, contextValue, info) =>
      users.find((user) => user.id === id),
    users: () => users,
    fact: async (_, { id }, { dataSources }) => {
      return dataSources.factAPI.getFact();
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});
interface ContextValue {
  dataSources: {
    factAPI: FactAPI;
  };
}

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const res = async () =>
  await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        // We create new instances of our data sources with each request,
        // passing in our server's cache.
        dataSources: {
          factAPI: new FactAPI({ cache }),
        },
      };
    },
    listen: { port: 4000 },
  });

res().then((r) => console.log(`🚀  Server ready at: ${r.url}`));
