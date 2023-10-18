import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Vin } from "./vin.entity";
import { Region } from "./region.entity";

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
  @ManyToOne(() => Region, { nullable: true })
  @JoinColumn()
  region: Region;
}
