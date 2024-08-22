import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Bouteille } from "./bouteille.entity";
import { TypeVin } from "./typeVin.entity";

@ObjectType()
@Entity()
export class Avis {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => TypeVin, { nullable: true })
  @OneToOne(() => TypeVin, { nullable: true, eager: true })
  type_vin: TypeVin;

  @ManyToOne(() => Bouteille, bouteille => bouteille.avis)
  bouteille: Bouteille;
}
