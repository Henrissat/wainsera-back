
import datasource from './lib/datasource';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';
import BouteilleResolver from './resolvers/bouteille.resolver';


async function main() {
  const schema = await buildSchema({
    resolvers: [BouteilleResolver],
    validate: false
  });
  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
  });

  await datasource.initialize();
  console.log(`🚀  Server ready at: ${url}`);
}

main();
