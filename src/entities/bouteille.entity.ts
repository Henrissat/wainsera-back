import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
// import { Cuvee } from "./Cuvee"; 
// import { Vin } from "./Vin";
// import { Casier } from "./Casier"; 

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
  @ManyToOne(() => Vin)
  vin: Vin;

  @Field(() => Casier, { nullable: true })
  @ManyToOne(() => Casier, { nullable: true })
  casier: Casier;
}
