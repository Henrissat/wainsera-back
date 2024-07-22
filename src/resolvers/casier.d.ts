// casier.d.ts
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class IAddCasier {
  @Field()
  name: string;

  @Field({ nullable: true })
  rangee?: number;

  @Field({ nullable: true })
  colonne?: number;
}

@InputType()
export class IUpdateCasier {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  rangee?: number;

  @Field({ nullable: true })
  colonne?: number;
}
