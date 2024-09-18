// user.types.ts
import { ObjectType, Field } from "type-graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class LoginUser {
  @Field()
  fullname: string;

  @Field()
  email: string;

}

@ObjectType()
export class LoginResponse {
  @Field(() => LoginUser)
  user: LoginUser;

  @Field()
  token: string;
}
