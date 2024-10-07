import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Vin } from "./vin.entity";
import { Region } from "./region.entity";
import { Bouteille } from "./bouteille.entity";

@ObjectType()
@Entity()
export class Appellation {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_appellation: string;

  @Field(() => [Vin], { nullable: true })
  @ManyToMany(() => Vin, vin => vin.appellations)
  @JoinTable()
  vins: Vin[];

  @Field(() => Region, { nullable: true })
  @ManyToOne(() => Region, region => region.appellations, { nullable: true })
  @JoinColumn()
  region: Region;

  @Field(() => Bouteille, { nullable: true })
  @OneToMany(() => Bouteille, bouteille => bouteille.appellation, { nullable: true })
  @JoinColumn()
  bouteilles: Bouteille;
}
