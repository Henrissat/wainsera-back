import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Casier } from "../entities/casier.entity";
import { IAddCasier, IUpdateCasier } from "../resolvers/casier";

export default class CasierService {
  private db: Repository<Casier>;

  constructor() {
    this.db = datasource.getRepository(Casier);
  }

  async listCasiers(): Promise<Casier[]> {
    try {
      const casiers = await this.db.find({
        relations: ["bouteilles"]
      });
      return casiers;
    } catch (error) {
      console.error("Error listing casiers:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des casiers.");
    }
  }

  async getCasierById(id: number): Promise<Casier | null> {
    try {
      return await this.db.findOne({
        where: { id },
        relations: ["bouteilles"]
      });
    } catch (error) {
      console.error("Error getting casier by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération du casier.");
    }
  }

  async addCasier({ name, rangee, colonne }: IAddCasier): Promise<Casier> {
    try {
      const newCasier = this.db.create({ name, rangee, colonne });
      return await this.db.save(newCasier);
    } catch (error) {
      console.error("Error adding casier:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout du casier.");
    }
  }

  async updateCasier(id: number, { name, rangee, colonne }: IUpdateCasier): Promise<Casier> {
    try {
      const existingCasier = await this.db.findOne({ where: { id } });
      if (!existingCasier) {
        throw new Error("Casier not found");
      }

      if (name !== undefined) {
        existingCasier.name = name;
      }
      if (rangee !== undefined) {
        existingCasier.rangee = rangee;
      }
      if (colonne !== undefined) {
        existingCasier.colonne = colonne;
      }

      return await this.db.save(existingCasier);
    } catch (error) {
      console.error("Error updating casier:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour du casier.");
    }
  }

  async deleteCasier(id: number): Promise<boolean> {
    try {
      const existingCasier = await this.db.findOne({ where: { id } });
      if (!existingCasier) {
        throw new Error("Casier not found");
      }

      await this.db.remove(existingCasier);
      return true;
    } catch (error) {
      console.error("Error deleting casier:", error);
      throw new Error("Une erreur s'est produite lors de la suppression du casier.");
    }
  }
}
