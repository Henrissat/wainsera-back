import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Bouteille } from "../entities/bouteille.entity";
import { Vin } from "../entities/vin.entity";
import { Cuvee } from "../entities/cuvee.entity";
import { Cepage } from "../entities/cepage.entity";
import { IAddBouteille } from "../resolvers/bouteille.input";
import { Region } from "../entities/region.entity";

export default class BouteilleService {
  private db: Repository<Bouteille>;
  private vinRepository: Repository<Vin>;
  private cuveeRepository: Repository<Cuvee>;
  private cepageRepository: Repository<Cepage>;
  private regionRepository: Repository<Region>;

  constructor() {
    this.db = datasource.getRepository(Bouteille);
    this.vinRepository = datasource.getRepository(Vin);
    this.cuveeRepository = datasource.getRepository(Cuvee);
    this.cepageRepository = datasource.getRepository(Cepage);
    this.regionRepository = datasource.getRepository(Region);
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

  async deleteBouteille(id: number): Promise<boolean> {
    console.log('Deleting bouteille with ID:', id);
    try {
      const existingBouteille = await this.db.findOne({ where: { id } });
      if (!existingBouteille) {
        throw new Error("Bouteille not found");
      }

      await this.db.remove(existingBouteille);
      return true;
    } catch (error) {
      console.error("Error deleting bouteille:", error);
      throw new Error("Une erreur s'est produite lors de la suppression de la bouteille.");
    }
  }

  async addBouteille(bouteilleInput: IAddBouteille): Promise<Bouteille> {
    try {
      const { millesime, alcool, quantite, vinId, cepageIds, cuveeNom, regionId } = bouteilleInput;
  
      const vin = await this.vinRepository.findOne({ where: { id: vinId } });
      if (!vin) {
        throw new Error("Vin non trouvé");
      }
  
      const region = await this.regionRepository.findOne({ where: { id: regionId } }); 
      if (!region) {
        throw new Error("Region non trouvée");
      }

      // const paysId = region.pays.id;
  
      const cepages = await this.cepageRepository.findByIds(cepageIds);
      if (cepages.length !== cepageIds.length) {
        throw new Error("Un ou plusieurs cépages non trouvés");
      }
  
      let cuvee = null;
      if (cuveeNom) {
        cuvee = this.cuveeRepository.create({ nom_domaine: cuveeNom });
        await this.cuveeRepository.save(cuvee);
      }
  
      const newBouteille = this.db.create({
        millesime,
        alcool,
        quantite,
        vin,
        cepages,
        ...(cuvee && { cuvee }),
        region
      });
  
      return await this.db.save(newBouteille);
    } catch (error) {
      console.error("Error adding bouteille:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de la bouteille.");
    }
  }
  
}
