// cuvee.d.ts

export interface IAddCuvee {
    nom_domaine: string;
  }
  
  export interface IUpdateCuvee {
    id: number;
    nom_domaine?: string;
  }
  