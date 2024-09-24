// user.input.ts
import { InputType, Field } from "type-graphql";

@InputType()
export class ILoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
