// cuvee.service.ts
import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Cuvee } from "../entities/cuvee.entity";
import { IAddCuvee, IUpdateCuvee } from "../resolvers/cuvee";

export default class CuveeService {
  private db: Repository<Cuvee>;

  constructor() {
    this.db = datasource.getRepository(Cuvee);
  }

  async listCuvees(): Promise<Cuvee[]> {
    try {
      const cuvees = await this.db.find();
      return cuvees;
    } catch (error) {
      console.error("Error listing cuvees:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des cuvées.");
    }
  }

  async getCuveeById(id: number): Promise<Cuvee | null> {
    try {
      return await this.db.findOne({ where: { id } });
    } catch (error) {
      console.error("Error getting cuvee by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de la cuvée.");
    }
  }

  async addCuvee({ nom_domaine }: IAddCuvee): Promise<Cuvee> {
    try {
      const newCuvee = this.db.create({ nom_domaine });
      return await this.db.save(newCuvee);
    } catch (error) {
      console.error("Error adding cuvee:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de la cuvée.");
    }
  }

  async updateCuvee(id: number, { nom_domaine }: IUpdateCuvee): Promise<Cuvee> {
    console.log('Updating cuvee with ID:', id);
    try {
      const existingCuvee = await this.db.findOne({ where: { id } });
      if (!existingCuvee) {
        throw new Error("Cuvee not found");
      }

      if (nom_domaine !== undefined) {
        existingCuvee.nom_domaine = nom_domaine;
      }

      return await this.db.save(existingCuvee);
    } catch (error) {
      console.error("Error updating cuvee:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour de la cuvée.");
    }
  }

  async deleteCuvee(id: number): Promise<boolean> {
    console.log('Deleting cuvee with ID:', id);
    try {
      const existingCuvee = await this.db.findOne({ where: { id } });
      if (!existingCuvee) {
        throw new Error("Cuvee not found");
      }

      await this.db.remove(existingCuvee);
      return true;
    } catch (error) {
      console.error("Error deleting cuvee:", error);
      throw new Error("Une erreur s'est produite lors de la suppression de la cuvée.");
    }
  }
}
