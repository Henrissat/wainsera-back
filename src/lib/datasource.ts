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

let databaseConfig: any;

databaseConfig = {
  type: "mysql",
  url: process.env.DATABASE_URL,
  port: 3306, 
  synchronize: true, 
  logging: ["query", "error"],
  entities: [
    Bouteille, User, Cuvee, Vin, Appellation, Avis, TypeVin, Casier, Region, Pays, BouteilleCepage, Cepage
  ],
};


export default new DataSource(databaseConfig);