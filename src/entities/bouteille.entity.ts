import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Cuvee } from "./cuvee.entity"; 
import { Vin } from "./vin.entity";
import { Casier } from "./casier.entity"; 
import { Avis } from "./avis.entity"; 

@ObjectType()
@Entity()
export class Bouteille {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  millésime: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  alcool: number;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  quantite: number;

  @Field(() => Cuvee, { nullable: true })
  @ManyToOne(() => Cuvee, { nullable: true })
  cuvee: Cuvee;

  @Field(() => Vin)
  @OneToOne(() => Vin, { eager: true, nullable: true })
  @JoinColumn({ name: "vin_id" })
  vin: Vin;

  @Field(() => Casier, { nullable: true })
  @OneToOne(() => Casier, { eager: true, nullable: true })
  @JoinColumn({ name: "casier_id" })
  casier: Casier;

  @Field(() => Avis, { nullable: true })
  @OneToOne(() => Avis, { eager: true, nullable: true })
  @JoinColumn({ name: "avis_id" })
  avis: Avis;
}
