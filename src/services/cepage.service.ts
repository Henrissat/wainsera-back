import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Cepage } from "../entities/cepage.entity";
import { IAddCepage, IUpdateCepage } from "../resolvers/cepage";

export default class CepageService {
  private db: Repository<Cepage>;

  constructor() {
    this.db = datasource.getRepository(Cepage);
  }

  async listCepages(): Promise<Cepage[]> {
    try {
      const cepages = await this.db.find(
        // {
        // relations: ["vins"]
        // }  
      );
      return cepages;
    } catch (error) {
      console.error("Error listing cépages:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des cépages.");
    }
  }

  async getCepageById(id: number): Promise<Cepage | null> {
    try {
      return await this.db.findOne({
        where: { id },
        relations: ["vins"]
      });
    } catch (error) {
      console.error("Error getting cépage by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération du cépage.");
    }
  }

  async addCepage({ nom_cepage }: IAddCepage): Promise<Cepage> {
    try {
      const newCepage = this.db.create({ nom_cepage });
      return await this.db.save(newCepage);
    } catch (error) {
      console.error("Error adding cépage:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout du cépage.");
    }
  }

  async updateCepage(id: number, { nom_cepage }: IUpdateCepage): Promise<Cepage> {
    try {
      const existingCepage = await this.db.findOne({ where: { id } });
      if (!existingCepage) {
        throw new Error("Cepage not found");
      }

      if (nom_cepage !== undefined) {
        existingCepage.nom_cepage = nom_cepage;
      }

      return await this.db.save(existingCepage);
    } catch (error) {
      console.error("Error updating cépage:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour du cépage.");
    }
  }

  async deleteCepage(id: number): Promise<boolean> {
    try {
      const existingCepage = await this.db.findOne({ where: { id } });
      if (!existingCepage) {
        throw new Error("Cepage not found");
      }

      await this.db.remove(existingCepage);
      return true;
    } catch (error) {
      console.error("Error deleting cépage:", error);
      throw new Error("Une erreur s'est produite lors de la suppression du cépage.");
    }
  }
}
