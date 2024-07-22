import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Bouteille } from "./bouteille.entity";
import { BouteilleCepage } from "./bouteilleCepage.entity";

@ObjectType()
@Entity()
export class Cepage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_cepage: string;

  @Field(() => [Bouteille], { nullable: true })
  @ManyToMany(() => Bouteille, bouteille => bouteille.cepages)
  bouteilles: Bouteille[];

  @OneToMany(() => BouteilleCepage, bouteilleCepage => bouteilleCepage.cepage)
  bouteilleCepages: BouteilleCepage[];
}
