//user.d.ts
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class IAddUser {
  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class IUpdateUser {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  fullname?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}
