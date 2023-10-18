import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Appellation } from "./appellation.entity";
import { Pays } from "./pays.entity";

@ObjectType()
@Entity()
export class Region {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text", nullable: true })
  nom_region: string;

  @Field(() => Pays, { nullable: true })
  @ManyToOne(() => Pays, { nullable: true })
  @JoinColumn()
  pays: Pays;

  @Field(() => [Appellation], { nullable: true })
  @OneToMany(() => Appellation, appellation => appellation.region)
  appellations: Appellation[];
}
