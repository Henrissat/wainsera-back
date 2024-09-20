// user.types.ts
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LoginUser {
  @Field()
  id: string;

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
