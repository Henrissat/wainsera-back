import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Bouteille } from "./bouteille.entity";
import { IsEmail } from "class-validator";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  fullname: string;

  @Field()
  @Column({ type: "varchar", unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column({ type: "text" })
  password: string;

  @Field(() => [Bouteille], { nullable: true })
  @OneToMany(() => Bouteille, bouteille => bouteille.user)
  bouteilles: Bouteille[];
}
