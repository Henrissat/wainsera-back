// bouteille.d.ts

export interface  IAddBouteille {
    id?: number;
    millesime?: number;
    alcool?: number;
    quantite: number;
  }
  
export interface  IUpdateBouteille {
    id: number;
    millesime?: number;
    alcool?: number;
    quantite?: number;
  }
  