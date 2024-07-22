import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Bouteille } from "./bouteille.entity";
import { Cepage } from "./cepage.entity";

@Entity()
export class BouteilleCepage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bouteille, bouteille => bouteille.bouteilleCepages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "bouteilleId" })
  bouteille: Bouteille;

  @ManyToOne(() => Cepage, cepage => cepage.bouteilleCepages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "cepageId" })
  cepage: Cepage;
}
