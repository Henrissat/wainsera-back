import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Pays } from "../entities/pays.entity";

export default class PaysService {
  private db: Repository<Pays>;

  constructor() {
    this.db = datasource.getRepository(Pays);
  }

  async listPays(): Promise<Pays[]> {
    try {
      const pays = await this.db.find({
        relations: ["regions"]
      });
      return pays;
    } catch (error) {
      console.error("Error listing pays:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des pays.");
    }
  }

  async getPaysById(id: number): Promise<Pays | null> {
    try {
      return await this.db.findOne({where: { id }});
    } catch (error) {
      console.error("Error getting pays by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération du pays.");
    }
  }
}
