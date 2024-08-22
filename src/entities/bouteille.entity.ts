import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Cuvee } from "./cuvee.entity"; 
import { Vin } from "./vin.entity";
import { Casier } from "./casier.entity"; 
import { Avis } from "./avis.entity"; 
import { Cepage } from "./cepage.entity";
import { BouteilleCepage } from "./bouteilleCepage.entity";
import { Region } from "./region.entity";

@ObjectType()
@Entity()
export class Bouteille {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  millesime: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  alcool: number;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  quantite: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  note: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  note_perso: number;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  bouche: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  accord: string;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  garde_apogee: number;

  @Field(() => Cuvee, { nullable: true })
  @ManyToOne(() => Cuvee, cuvee => cuvee.bouteilles, { nullable: true, eager: true })
  @JoinColumn({ name: "cuveeId" })
  cuvee: Cuvee;

  @Field(() => Vin, { nullable: true })
  @ManyToOne(() => Vin, vin => vin.bouteilles, { nullable: true, eager: true })
  @JoinColumn({ name: "vinId" })
  vin: Vin;
  
  @Field(() => [Cepage], { nullable: true })
  @ManyToMany(() => Cepage, cepage => cepage.bouteilles)
  @JoinTable({
    name: "bouteilleCepage",
    joinColumn: {
      name: "bouteilleId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "cepageId",
      referencedColumnName: "id"
    }
  })
  cepages: Cepage[];

  @OneToMany(() => BouteilleCepage, bouteilleCepage => bouteilleCepage.bouteille)
  bouteilleCepages: BouteilleCepage[];

  @Field(() => Region, { nullable: true })
  @ManyToOne(() => Region, region => region.bouteilles, { nullable: true, eager: true })
  @JoinColumn({ name: "regionId" })
  region: Region;

  @Field(() => Casier, { nullable: true })
  @OneToOne(() => Casier, { eager: true, nullable: true })
  @JoinColumn({ name: "casierId" })
  casier: Casier;

  @Field(() => [Avis], { nullable: true })
  @OneToMany(() => Avis, avis => avis.bouteille)
  avis: Avis[];
}
