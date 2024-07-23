import { InputType, Field, Int } from "type-graphql";

@InputType()
export class IAddBouteille {
  @Field(() => Int)
  millesime: number;

  @Field(() => Int)
  alcool: number;

  @Field(() => Int)
  quantite: number;

  @Field(() => Int)
  vinId: number;

  @Field(() => [Int])
  cepageIds: number[];

  @Field(() => Int, { nullable: true })
  regionId?: number;

  @Field({ nullable: true })
  cuveeNom?: string;
}

@InputType()
export class IUpdateBouteille {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  millesime?: number;

  @Field(() => Int, { nullable: true })
  alcool?: number;

  @Field(() => Int, { nullable: true })
  quantite?: number;

  @Field(() => Int, { nullable: true })
  vinId?: number;

  @Field(() => [Int], { nullable: true })
  cepageIds?: number[];

  @Field(() => Int, { nullable: true })
  regionId?: number;

  @Field({ nullable: true })
  cuveeNom?: string;
}