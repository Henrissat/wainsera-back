import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Vin } from "./vin.entity";
import { Bouteille } from "./bouteille.entity";

@ObjectType()
@Entity()
export class Cuvee {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_domaine: string;

  @Field(() => [Bouteille], { nullable: true })
  @OneToMany(() => Bouteille, (bouteille) => bouteille.cuvee)
  bouteilles: Bouteille[];
}
