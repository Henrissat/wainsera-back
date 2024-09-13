// user.types.ts
import { ObjectType, Field } from "type-graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
