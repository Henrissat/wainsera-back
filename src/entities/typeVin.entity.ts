import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class TypeVin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  puissance: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  tannin: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  sec: number;

  @Field({ nullable: true })
  @Column({ type: "float", nullable: true })
  acide: number;
}
