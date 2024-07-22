import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Bouteille } from "./bouteille.entity";
import { Cuvee } from "./cuvee.entity";
import { Cepage } from "./cepage.entity";
import { Appellation } from "./appellation.entity";


@ObjectType()
@Entity()
export class Vin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text" })
  couleur: string;

  @Field(() => [Bouteille], { nullable: true })
  @OneToMany(() => Bouteille, bouteille => bouteille.vin)
  bouteilles: Bouteille[];

  @Field(() => [Appellation], { nullable: true })
  @ManyToMany(() => Appellation, appellation => appellation.vins)
  @JoinTable({ name: "appellationId" })
  appellations: Appellation[];
}
