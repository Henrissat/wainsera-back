import { Repository, getRepository } from "typeorm";
import { Vin } from "../entities/vin.entity";
import { IAddVin, IUpdateVin } from "../resolvers/vin";

export default class VinService {
  private db: Repository<Vin>;

  constructor() {
    this.db = getRepository(Vin);
  }

  async listVins(): Promise<Vin[]> {
    try {
      const vins = await this.db.find({
        relations: ["bouteilles", "cepages", "appellations"]
      });
      return vins;
    } catch (error) {
      console.error("Error listing vins:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des vins.");
    }
  }


  async getVinByColor(couleur: string): Promise<Vin[]> {
    try {
      return await this.db
        .createQueryBuilder("vin")
        .where("vin.couleur = :couleur", { couleur })
        .leftJoinAndSelect("vin.bouteilles", "bouteille")
        .leftJoinAndSelect("vin.cepages", "cepage")
        .leftJoinAndSelect("vin.appellations", "appellation")
        .getMany();
    } catch (error) {
      console.error(`Error retrieving vins for couleur '${couleur}':`, error);
      throw new Error("Une erreur s'est produite lors de la récupération des vins par couleur.");
    }
  }

  async addVin(data: IAddVin): Promise<Vin> {
    try {
      const vin = this.db.create(data);
      await this.db.save(vin);
      return vin;
    } catch (error) {
      console.error("Error adding vin:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout du vin.");
    }
  }

  async updateVin(id: number, data: IUpdateVin): Promise<Vin | null> {
    try {
      let vin = await this.db.findOne({ where: { id } });
      if (!vin) {
        throw new Error("Vin not found");
      }
      vin = { ...vin, ...data };
      await this.db.save(vin);
      return vin;
    } catch (error) {
      console.error("Error updating vin:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour du vin.");
    }
  }

  async deleteVin(id: number): Promise<boolean> {
    console.log('Deleting vin with ID:', id);
    try {
      const existingVin = await this.db.findOne({ where: { id } });
      if (!existingVin) {
        throw new Error("vin not found");
      }

      await this.db.remove(existingVin);
      return true;
    } catch (error) {
      console.error("Error deleting vin:", error);
      throw new Error("Une erreur s'est produite lors de la suppression du vin.");
    }
  }
}
