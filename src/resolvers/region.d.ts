import { InputType, Field, ID } from "type-graphql";
import { Pays } from "../entities/pays.entity";
import { Appellation } from "../entities/appellation.entity";

@InputType()
export class IAddRegion {
  @Field()
  nom_region: string;

  @Field(() => ID, { nullable: true })
  paysId?: number;
}

@InputType()
export class IUpdateRegion {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  nom_region?: string;

  @Field(() => ID, { nullable: true })
  paysId?: number;
}
