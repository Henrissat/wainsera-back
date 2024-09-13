import { getRepository, Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Bouteille } from "../entities/bouteille.entity";
import { Vin } from "../entities/vin.entity";
import { Cuvee } from "../entities/cuvee.entity";
import { Cepage } from "../entities/cepage.entity";
import { IAddBouteille, IUpdateBouteille } from "../resolvers/bouteille.input";
import { Region } from "../entities/region.entity";
import { Casier } from "../entities/casier.entity";
import { IUpdateCasier } from "../resolvers/casier";

export default class BouteilleService {
  private db: Repository<Bouteille>;
  private vinRepository: Repository<Vin>;
  private cuveeRepository: Repository<Cuvee>;
  private cepageRepository: Repository<Cepage>;
  private regionRepository: Repository<Region>;
  private casierRepository: Repository<Casier>;

  constructor() {
    this.db = datasource.getRepository(Bouteille);
    this.vinRepository = datasource.getRepository(Vin);
    this.cuveeRepository = datasource.getRepository(Cuvee);
    this.cepageRepository = datasource.getRepository(Cepage);
    this.regionRepository = datasource.getRepository(Region);
    this.casierRepository = datasource.getRepository(Casier);
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
      return await this.db.findOne({
        where: { id },
        relations: ["cepages", "bouteilleCepages"]
      });
      
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
      const { millesime, garde_apogee, alcool, quantite, note, note_perso, bouche, accord, vinId, casierId, cepageIds, cuveeNom, regionId } = bouteilleInput;
  
      const vin = await this.vinRepository.findOne({ where: { id: vinId } });
      if (!vin) {
        throw new Error("Vin non trouvé");
      }

      const casier = await this.casierRepository.findOne({ where: { id: casierId } });
      if (!casier) {
        throw new Error("Casier non trouvé");
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
        garde_apogee,
        alcool,
        quantite,
        note,
        note_perso,
        bouche,
        accord,
        vin,
        cepages,
        ...(cuvee && { cuvee }),
        region,
        casier
      });
  
      return await this.db.save(newBouteille);
    } catch (error) {
      console.error("Error adding bouteille:", error);
      throw new Error("Une erreur s'est produite lors de l'ajout de la bouteille.");
    }
  }

  async updateBouteille(bouteilleInput: IUpdateBouteille): Promise<Bouteille> {
    try {
      const { id, millesime, garde_apogee, alcool, quantite, note, note_perso, bouche, accord, vinId, casierId, cepageIds, cuveeNom, regionId } = bouteilleInput;

      // Trouver la bouteille existante
      const existingBouteille = await this.db.findOne({ where: { id } });
      if (!existingBouteille) {
        throw new Error("Bouteille non trouvée");
      }

      // Mettre à jour les champs si les nouvelles valeurs sont fournies
      if (millesime !== undefined) existingBouteille.millesime = millesime;
      if (garde_apogee !== undefined) existingBouteille.garde_apogee = garde_apogee;
      if (alcool !== undefined) existingBouteille.alcool = alcool;
      if (quantite !== undefined) existingBouteille.quantite = quantite;
      if (note !== undefined) existingBouteille.note = note;
      if (note_perso !== undefined) existingBouteille.note_perso = note_perso;
      if (bouche !== undefined) existingBouteille.bouche = bouche;
      if (accord !== undefined) existingBouteille.accord = accord;

      if (vinId !== undefined) {
        const vin = await this.vinRepository.findOne({ where: { id: vinId } });
        if (!vin) {
          throw new Error("Vin non trouvé");
        }
        existingBouteille.vin = vin;
      }

      if(casierId !== undefined) {
        const casier = await this.casierRepository.findOne({ where: { id: casierId } });
        if (!casier) {
          throw new Error("Casier non trouvé");
        }
        existingBouteille.casier = casier;
      }

      if (regionId !== undefined) {
        const region = await this.regionRepository.findOne({ where: { id: regionId } });
        if (!region) {
          throw new Error("Région non trouvée");
        }
        existingBouteille.region = region;

        // Récupérer le paysId depuis la région
        // existingBouteille.paysId = region.paysId;
      }

      if (cepageIds !== undefined) {
        const cepages = await this.cepageRepository.findByIds(cepageIds);
        if (cepages.length !== cepageIds.length) {
          throw new Error("Un ou plusieurs cépages non trouvés");
        }
        existingBouteille.cepages = cepages;
      }

      if (cuveeNom !== undefined) {
        let cuvee = existingBouteille.cuvee;
        if (!cuvee) {
          cuvee = this.cuveeRepository.create({ nom_domaine: cuveeNom });
        } else {
          cuvee.nom_domaine = cuveeNom;
        }
        await this.cuveeRepository.save(cuvee);
        existingBouteille.cuvee = cuvee;
      }

      // if (casierId) {
      //   let casier = await this.casierRepository.findOne({ where: { id: casierId } });
      //   if (!casier) {
      //     casier = this.casierRepository.create({ rangee: 0, colonne: 0 });
      //     await this.casierRepository.save(casier);
      //   } else{
      //     const updateCasierInput: IUpdateCasier = {
      //       id: casier.id,
      //       name: casier.name,
      //       rangee: casier.rangee,
      //       colonne: casier.colonne,

      //     };
      //     casier = this.casierRepository.merge(casier, updateCasierInput);
      //     await this.casierRepository.save(casier);
      //   }
      //   existingBouteille.casier = casier;
      // }
 

      // Enregistrer les modifications
      return await this.db.save(existingBouteille);
    } catch (error) {
      console.error("Error updating bouteille:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour de la bouteille.");
    }
  }
  
}
