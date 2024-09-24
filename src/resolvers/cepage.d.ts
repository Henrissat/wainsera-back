import { Vin } from "../entities/vin.entity";

export interface ICepage {
  id: number;
  nom_cepage: string;
  vins?: Vin[];
}

export interface IAddCepage {
  nom_cepage: string;
}

export interface IUpdateCepage {
  id: number;
  nom_cepage?: string;
}
