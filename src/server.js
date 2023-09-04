import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from "fs";
import path from 'path';
import resolvers from './resolver.js';

const typeDefs = fs.readFileSync(path.join(process.cwd(), "src", "schema.gql"), "utf-8")
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
 
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);












