import { Bouteille } from "../entities/bouteille.entity";
import { Cepage } from "../entities/cepage.entity";
import { Appellation } from "../entities/appellation.entity";

export interface IVin {
  id: number;
  couleur?: string;
  bouteilles?: Bouteille[];
  cepages?: Cepage[];
  appellations?: Appellation[];
}

export interface  IAddVin {
  id?: number;
  couleur?: string;
  bouteilles?: Bouteille[];
  cepages?: Cepage[];
  appellations?: Appellation[];
}

export interface  IUpdateVin {
  id: number;
  couleur?: string;
  bouteilles?: Bouteille[];
  cepages?: Cepage[];
  appellations?: Appellation[];
}

