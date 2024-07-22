import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Bouteille } from "../entities/bouteille.entity";
import { IAddBouteille, IUpdateBouteille } from "../resolvers/bouteille";

export default class BouteilleService {
  private db: Repository<Bouteille>;

  constructor() {
    this.db = datasource.getRepository(Bouteille);
  }

  async listBouteilles(): Promise<Bouteille[]> {
    try {
      const bouteilles = await this.db.find({
        relations: ["cuvee", "vin", "cepages", "region", "region.pays", "casier"],
      });
      console.log(bouteilles); 
      return bouteilles;
    } catch (error) {
      console.error("Error listing bouteilles:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des bouteilles.");
    }
  }

  async getBouteilleById(id: number): Promise<Bouteille | null> {
    try {
      return await this.db.findOne({ where: { id } });
    } catch (error) {
      console.error("Error getting bouteille by ID:", error);
      throw new Error("Une erreur s'est produite lors de la récupération de la bouteille.");
    }
  }

  // async addBouteille({ millesime, alcool, quantite }: IAddBouteille): Promise<Bouteille> {
  //   try {
  //     const newBouteille = this.db.create({ millesime, alcool, quantite });
  //     return await this.db.save(newBouteille);
  //   } catch (error) {
  //     console.error("Error adding bouteille:", error);
  //     throw new Error("Une erreur s'est produite lors de l'ajout de la bouteille.");
  //   }
  // }

  // async updateBouteille(id: number, { millesime, alcool, quantite }: IUpdateBouteille): Promise<Bouteille> {
  //   console.log('Updating bouteille with ID:', id);
  //   try {
  //     const existingBouteille = await this.db.findOne({ where: { id } });
  //     if (!existingBouteille) {
  //       throw new Error("Bouteille not found");
  //     }

  //     if (millesime !== undefined) {
  //       existingBouteille.millesime = millesime;
  //     }
  //     if (alcool !== undefined) {
  //       existingBouteille.alcool = alcool;
  //     }
  //     if (quantite !== undefined) {
  //       existingBouteille.quantite = quantite;
  //     }

  //     return await this.db.save(existingBouteille);
  //   } catch (error) {
  //     console.error("Error updating bouteille:", error);
  //     throw new Error("Une erreur s'est produite lors de la mise à jour de la bouteille.");
  //   }
  // }

  async deleteBouteille(id: number): Promise<boolean> {
    console.log('Deleting bouteille with ID:', id);
    try {
      const existingBouteille = await this.db.findOne({ where: { id } });
      if (!existingBouteille) {
        throw new Error("Bouteille not found");
      }

      // Uncomment and adjust the following if needed
      // if (existingBouteille.avis) {
      //     const avisRepository = getRepository(Avis);
      //     await avisRepository.remove(existingBouteille.avis);
      // }
      // if (existingBouteille.casier) {
      //     const casierRepository = getRepository(Casier);
      //     await casierRepository.remove(existingBouteille.casier);
      // }
      // if (existingBouteille.cuvee) {
      //     const cuveeRepository = getRepository(Cuvee);
      //     await cuveeRepository.remove(existingBouteille.cuvee);
      // }

      await this.db.remove(existingBouteille);
      return true;
    } catch (error) {
      console.error("Error deleting bouteille:", error);
      throw new Error("Une erreur s'est produite lors de la suppression de la bouteille.");
    }
  }
}