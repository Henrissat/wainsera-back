import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Appellation } from "./appellation.entity";
import { Pays } from "./pays.entity";
import { Bouteille } from "./bouteille.entity";

@ObjectType()
@Entity()
export class Region {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_region: string;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  min_garde: number;

  @Field({ nullable: true })  
  @Column({ type: "int", nullable: true })
  max_garde: number;

  @Field(() => Pays, { nullable: true })
  @ManyToOne(() => Pays, pays => pays.regions, { nullable: true })
  @JoinColumn({ name: "paysId" })
  pays: Pays;

  @Field(() => [Bouteille], { nullable: true })
  @OneToMany(() => Bouteille, bouteille => bouteille.region)
  bouteilles: Bouteille[];

  @Field(() => [Appellation], { nullable: true })
  @OneToMany(() => Appellation, appellation => appellation.region)
  appellations: Appellation[];
}
