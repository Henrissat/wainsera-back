import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Region } from "../entities/region.entity";
// import { IAddRegion, IUpdateRegion } from "../resolvers/region";

export default class RegionService {
  private db: Repository<Region>;

  constructor() {
    this.db = datasource.getRepository(Region);
  }

  async listRegions(): Promise<Region[]> {
    try {
      const regions = await this.db.find({
        relations: ["pays", "appellations"]
      });
      return regions;
    } catch (error) {
      console.error("Error listing regions:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des régions.");
    }
  }

  async getRegionById(id: number): Promise<Region | null> {
    try {
      return await this.db.findOne({
        where: { id },
        relations: ["pays", "appellations"]
      });
    } catch (error) {
      console.error("Error getting region by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de la région.");
    }
  }

  // async addRegion({ nom_region, paysId }: IAddRegion): Promise<Region> {
  //   try {
  //     const newRegion = this.db.create({ nom_region, pays: { id: paysId } });
  //     return await this.db.save(newRegion);
  //   } catch (error) {
  //     console.error("Error adding region:", error);
  //     throw new Error("Une erreur s'est produite lors de l'ajout de la région.");
  //   }
  // }

  // async updateRegion(id: number, { nom_region, paysId }: IUpdateRegion): Promise<Region> {
  //   try {
  //     const existingRegion = await this.db.findOne({ where: { id } });
  //     if (!existingRegion) {
  //       throw new Error("Region not found");
  //     }

  //     if (nom_region !== undefined) {
  //       existingRegion.nom_region = nom_region;
  //     }
  //     if (paysId !== undefined) {
  //       existingRegion.pays = { id: paysId };
  //     }

  //     return await this.db.save(existingRegion);
  //   } catch (error) {
  //     console.error("Error updating region:", error);
  //     throw new Error("Une erreur s'est produite lors de la mise à jour de la région.");
  //   }
  // }

  // async deleteRegion(id: number): Promise<boolean> {
  //   try {
  //     const existingRegion = await this.db.findOne({ where: { id } });
  //     if (!existingRegion) {
  //       throw new Error("Region not found");
  //     }

  //     await this.db.remove(existingRegion);
  //     return true;
  //   } catch (error) {
  //     console.error("Error deleting region:", error);
  //     throw new Error("Une erreur s'est produite lors de la suppression de la région.");
  //   }
  // }
}
