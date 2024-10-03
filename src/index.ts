import * as dotenv from "dotenv";
dotenv.config();

import express, { Request } from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";

import datasource from "./lib/datasource";
import { getUserFromToken } from "./lib/utilities"; // Fonction pour extraire l'utilisateur du token
import BouteilleResolver from './resolvers/bouteille.resolver';
import VinResolver from './resolvers/vin.resolvers';
import RegionResolver from './resolvers/region.resolver';
import CepageResolver from './resolvers/cepage.resolver';
import CasierResolver from './resolvers/casier.resolver';
import UserResolver from './resolvers/user.resolver';

const corsConfig = {
  origin: ["https://wainsera.netlify.app", "https://wainsera.netlify.app/, http://localhost:3000, http://localhost:3000/"],
  credentials: true, 
};

const start = async () => {
  const app = express();
  app.use(cors(corsConfig));

  const httpServer = http.createServer(app);
  const port = process.env.PORT || 8000;

  const schema = await buildSchema({
    resolvers: [BouteilleResolver, VinResolver, RegionResolver, CepageResolver, CasierResolver, UserResolver],
    validate: false,
  });

  // Instanciation et configuration du serveur Apollo
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }), 
      ApolloServerPluginDrainHttpServer({ httpServer }), 
    ],
    context: async ({ req }: { req: Request}) => {
      const { authorization } = req.headers;
      let userLogged = await getUserFromToken(authorization); 
      return { userLogged }; 
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: corsConfig,
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Serveur prêt à l'adresse http://localhost:${port}${server.graphqlPath}`);

  await datasource.initialize();
};

start();
