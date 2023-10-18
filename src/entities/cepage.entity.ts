import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Vin } from "./vin.entity";

@ObjectType()
@Entity()
export class Cepage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_cepage: string;

  @Field(() => [Vin], { nullable: true })
  @ManyToMany(() => Vin, vin => vin.cepages)
  @JoinTable()
  vins: Vin[];
}
