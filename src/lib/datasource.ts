import { DataSource } from "typeorm";

import { Bouteille } from "../entities/bouteille.entity";
import { Cuvee } from "../entities/cuvee.entity";
import { Vin } from "../entities/vin.entity";
import { Appellation } from "../entities/appellation.entity";
import { Avis } from "../entities/avis.entity";
import { TypeVin } from "../entities/typeVin.entity";
import { Casier } from "../entities/casier.entity";
import { Region } from "../entities/region.entity";
import { Pays } from "../entities/pays.entity";
import { Cepage } from "../entities/cepage.entity";
import { BouteilleCepage } from "../entities/bouteilleCepage.entity";
import { User } from "../entities/user.entity";


const isProduction = process.env.NODE_ENV === 'production';

let databaseConfig: any;

if (isProduction) {
  databaseConfig = {
    type: "mysql",
    url: process.env.DATABASE_URL,
    // host: process.env.DB_HOST,
    port: 3306, 
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    synchronize: true, 
    logging: ["query", "error"],
    entities: [
      Bouteille, User, Cuvee, Vin, Appellation, Avis, TypeVin, Casier, Region, Pays, BouteilleCepage, Cepage
    ],
  };
} else {
  databaseConfig = {
    type: "sqlite",
    database: "./wainsera.sqlite",
    synchronize: true, 
    logging: ["query", "error"],
    entities: [
      Bouteille, User, Cuvee, Vin, Appellation, Avis, TypeVin, Casier, Region, Pays, BouteilleCepage, Cepage
    ],
  };
}

export default new DataSource(databaseConfig);