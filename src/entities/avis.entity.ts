import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Bouteille } from "./bouteille.entity";
import { TypeVin } from "./typeVin.entity";

@ObjectType()
@Entity()
export class Avis {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  note: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  note_perso: number;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  bouche: string;

  @Field(() => TypeVin, { nullable: true })
  @OneToOne(() => TypeVin, { nullable: true, eager: true })
  type_vin: TypeVin;
}
