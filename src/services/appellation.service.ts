// appellation.service.ts
import { Repository } from "typeorm";
import { Appellation } from "../entities/appellation.entity";
import datasource from "../lib/datasource";

export default class AppellationService {
  private db: Repository<Appellation>;

  constructor() {
    this.db = datasource.getRepository(Appellation);
  }

  async listAppellations(): Promise<Appellation[]> {
    try {
      const cuvees = await this.db.find();
      return cuvees;
    } catch (error) {
      console.error("Error listing cuvees:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des cuvées.");
    }
  }

  async getAppellationById(id: number): Promise<Appellation | null> {
    try {
      return await this.db.findOne({ where: { id } });
    } catch (error) {
      console.error("Error getting cuvee by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de la cuvée.");
    }
  }
}