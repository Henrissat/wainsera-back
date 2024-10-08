import { InputType, Field, Int, Float } from "type-graphql";

@InputType()
export class IAddBouteille {
  @Field(() => Int)
  millesime: number;

  @Field(() => Int, { nullable: true })
  garde_apogee?: number;

  @Field(() => Float)
  alcool: number;

  @Field(() => Int)
  quantite: number;

  @Field(() => Float, { nullable: true })
  note?: number;

  @Field(() => Float, { nullable: true })
  note_perso?: number;

  @Field (() => String, { nullable: true })
  bouche?: string;

  @Field (() => String, { nullable: true })
  accord?: string;

  @Field(() => Int)
  vinId: number;

  @Field(() => [Int])
  cepageIds: number[];

  @Field(() => Int, { nullable: true })
  regionId?: number;

  @Field(() => Int, { nullable: true })
  appellationId?: number;

  @Field({ nullable: true })
  cuveeNom?: string;

  @Field(() => Int, { nullable: true })
  casierId?: number;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  picture?: string; 
}

@InputType()
export class IUpdateBouteille {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  millesime?: number;

  @Field(() => Int, { nullable: true })
  garde_apogee?: number;

  @Field(() => Float, { nullable: true })
  alcool?: number;

  @Field(() => Int, { nullable: true })
  quantite?: number;

  @Field(() => Float, { nullable: true })
  note: number;

  @Field(() => Float, { nullable: true })
  note_perso: number;

  @Field (() => String, { nullable: true })
  bouche: string;

  @Field (() => String, { nullable: true })
  accord: string;

  @Field(() => Int, { nullable: true })
  vinId?: number;

  @Field(() => [Int], { nullable: true })
  cepageIds?: number[];

  @Field(() => Int, { nullable: true })
  regionId?: number;

  @Field(() => Int, { nullable: true })
  appellationId?: number;

  @Field({ nullable: true })
  cuveeNom?: string;

  @Field(() => Int, { nullable: true })
  casierId?: number;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  picture?: string; 
}