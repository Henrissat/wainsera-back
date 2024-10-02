"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_core_2 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const datasource_1 = __importDefault(require("./lib/datasource"));
const utilities_1 = require("./lib/utilities"); // Fonction pour extraire l'utilisateur du token
const bouteille_resolver_1 = __importDefault(require("./resolvers/bouteille.resolver"));
const vin_resolvers_1 = __importDefault(require("./resolvers/vin.resolvers"));
const region_resolver_1 = __importDefault(require("./resolvers/region.resolver"));
const cepage_resolver_1 = __importDefault(require("./resolvers/cepage.resolver"));
const casier_resolver_1 = __importDefault(require("./resolvers/casier.resolver"));
const user_resolver_1 = __importDefault(require("./resolvers/user.resolver"));
const corsConfig = {
    origin: ["https://wainsera.netlify.app/"],
    credentials: true,
};
const start = async () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)(corsConfig));
    const httpServer = http_1.default.createServer(app);
    const port = process.env.PORT || 8000;
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [bouteille_resolver_1.default, vin_resolvers_1.default, region_resolver_1.default, cepage_resolver_1.default, casier_resolver_1.default, user_resolver_1.default],
        validate: false,
    });
    // Instanciation et configuration du serveur Apollo
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        csrfPrevention: true,
        introspection: true,
        cache: "bounded",
        plugins: [
            (0, apollo_server_core_2.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        ],
        context: async ({ req }) => {
            const { authorization } = req.headers;
            let userLogged = await (0, utilities_1.getUserFromToken)(authorization);
            return { userLogged };
        },
    });
    await server.start();
    server.applyMiddleware({ app, cors: false });
    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Serveur prêt à l'adresse http://localhost:${port}${server.graphqlPath}`);
    await datasource_1.default.initialize();
};
start();
