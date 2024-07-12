import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
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
  millesime: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  alcool: number;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  quantite: number;

  @Field(() => Cuvee, { nullable: true })
  @ManyToOne(() => Cuvee, { nullable: true })
  cuvee: Cuvee;

  @Field(() => Vin, { nullable: true })
  @OneToOne(() => Vin, { eager: true, nullable: true })
  @JoinColumn({ name: "vinId" })
  vin: Vin;

  @Field(() => Casier, { nullable: true })
  @OneToOne(() => Casier, { eager: true, nullable: true })
  @JoinColumn({ name: "casierId" })
  casier: Casier;

  @Field(() => [Avis], { nullable: true })
  @OneToMany(() => Avis, avis => avis.bouteille)
  avis: Avis[];
}
