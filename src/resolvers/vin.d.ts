import { Bouteille } from "../entities/bouteille.entity";
import { Cepage } from "../entities/cepage.entity";
import { Appellation } from "../entities/appellation.entity";

export interface IVin {
  id: number;
  couleur?: string;
  // bouteilles?: Bouteille[];
  // cepages?: Cepage[];
  // appellations?: Appellation[];
}

export interface  IAddVin {
  id?: number;
  couleur?: string;
  // bouteilles?: Bouteille[];
  // cepages?: Cepage[];
  // appellations?: Appellation[];
}

export interface  IUpdateVin {
  id: number;
  couleur?: string;
  // bouteilles?: Bouteille[];
  // cepages?: Cepage[];
  // appellations?: Appellation[];
}

// vin.d.ts
// import { InputType, Field, ID } from "type-graphql";

// @InputType()
// export class IVin {
//   @Field(() => ID)
//   id: number;

//   @Field({ nullable: true })
//   couleur?: string;

//   @Field(() => [Bouteille], { nullable: true })
//   bouteilles?: Bouteille[];

//   @Field(() => [Cepage], { nullable: true })
//   cepages?: Cepage[];

//   @Field(() => [Appellation], { nullable: true })
//   appellations?: Appellation[];
// }

// @InputType()
// export class IAddVin {
//   @Field()
//   couleur?: string;

//   @Field(() => [ID], { nullable: true })
//   bouteilles?: number[];

//   @Field(() => [ID], { nullable: true })
//   cepages?: number[];

//   @Field(() => [ID], { nullable: true })
//   appellations?: number[];
// }

// @InputType()
// export class IUpdateVin {
//   @Field(() => ID)
//   id: number;

//   @Field({ nullable: true })
//   couleur?: string;

//   @Field(() => [ID], { nullable: true })
//   bouteilles?: number[];

//   @Field(() => [ID], { nullable: true })
//   cepages?: number[];

//   @Field(() => [ID], { nullable: true })
//   appellations?: number[];
// }
