import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Vin } from "./vin.entity";

@ObjectType()
@Entity()
export class Cuvee {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_domaine: string;

  @Field(() => [Vin], { nullable: true })
  @OneToMany(() => Vin, vin => vin.cuvee)
  vins: Vin[];
}
