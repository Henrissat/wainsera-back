import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Bouteille } from "./bouteille.entity";


@ObjectType()
@Entity()
export class Casier {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  rangee: number;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  colonne: number;

  @Field(() => [Bouteille], { nullable: true })
  @OneToMany(() => Bouteille, bouteille => bouteille.casier)
  bouteilles: Bouteille[];
}
