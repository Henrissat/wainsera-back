
import datasource from './lib/datasource';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';
import BouteilleResolver from './resolvers/bouteille.resolver';
import VinResolver from './resolvers/vin.resolvers';
import RegionResolver from './resolvers/region.resolver';
import CepageResolver from './resolvers/cepage.resolver';


async function main() {

  const schema = await buildSchema({
    resolvers: [BouteilleResolver, VinResolver, RegionResolver, CepageResolver],
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
