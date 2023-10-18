import { DataSource } from "typeorm";

import * as path from "path";
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

export default new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname,"./wainsera.sqlite"),
  synchronize: true,
  entities: [Bouteille, Cuvee, Vin, Appellation, Avis, TypeVin, Casier, Region, Pays, Cepage,],
  logging: ["query", "error"],
});
