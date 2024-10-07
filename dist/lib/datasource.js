"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bouteille_entity_1 = require("../entities/bouteille.entity");
const cuvee_entity_1 = require("../entities/cuvee.entity");
const vin_entity_1 = require("../entities/vin.entity");
const appellation_entity_1 = require("../entities/appellation.entity");
const avis_entity_1 = require("../entities/avis.entity");
const typeVin_entity_1 = require("../entities/typeVin.entity");
const casier_entity_1 = require("../entities/casier.entity");
const region_entity_1 = require("../entities/region.entity");
const pays_entity_1 = require("../entities/pays.entity");
const cepage_entity_1 = require("../entities/cepage.entity");
const bouteilleCepage_entity_1 = require("../entities/bouteilleCepage.entity");
const user_entity_1 = require("../entities/user.entity");
let databaseConfig;
databaseConfig = {
    type: "mysql",
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    synchronize: true,
    logging: ["query", "error"],
    entities: [
        bouteille_entity_1.Bouteille, user_entity_1.User, cuvee_entity_1.Cuvee, vin_entity_1.Vin, appellation_entity_1.Appellation, avis_entity_1.Avis, typeVin_entity_1.TypeVin, casier_entity_1.Casier, region_entity_1.Region, pays_entity_1.Pays, bouteilleCepage_entity_1.BouteilleCepage, cepage_entity_1.Cepage, appellation_entity_1.Appellation
    ],
    driver: require('mysql2')
};
exports.default = new typeorm_1.DataSource(databaseConfig);
