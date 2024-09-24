import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Region } from "./region.entity";

@ObjectType()
@Entity()
export class Pays {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_pays: string;

  @Field(() => [Region], { nullable: true })
  @OneToMany(() => Region, region => region.pays)
  regions: Region[];
}
