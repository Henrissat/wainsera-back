// pays.d.ts
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class IPays {
  @Field(() => ID)
  id: number;
}
