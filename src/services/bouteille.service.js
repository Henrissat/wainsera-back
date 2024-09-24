"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../lib/datasource"));
const bouteille_entity_1 = require("../entities/bouteille.entity");
const vin_entity_1 = require("../entities/vin.entity");
const cuvee_entity_1 = require("../entities/cuvee.entity");
const cepage_entity_1 = require("../entities/cepage.entity");
const region_entity_1 = require("../entities/region.entity");
const casier_entity_1 = require("../entities/casier.entity");
const user_entity_1 = require("../entities/user.entity");
class BouteilleService {
    constructor() {
        this.db = datasource_1.default.getRepository(bouteille_entity_1.Bouteille);
        this.vinRepository = datasource_1.default.getRepository(vin_entity_1.Vin);
        this.cuveeRepository = datasource_1.default.getRepository(cuvee_entity_1.Cuvee);
        this.cepageRepository = datasource_1.default.getRepository(cepage_entity_1.Cepage);
        this.regionRepository = datasource_1.default.getRepository(region_entity_1.Region);
        this.casierRepository = datasource_1.default.getRepository(casier_entity_1.Casier);
        this.userRepository = datasource_1.default.getRepository(user_entity_1.User);
    }
    listBouteilles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bouteilles = yield this.db.find({
                    relations: ["cuvee", "vin", "cepages", "region", "region.pays", "casier"],
                });
                console.log(bouteilles);
                return bouteilles;
            }
            catch (error) {
                console.error("Error listing bouteilles:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des bouteilles.");
            }
        });
    }
    getBouteilleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.findOne({
                    where: { id },
                    relations: ["cepages", "bouteilleCepages"]
                });
            }
            catch (error) {
                console.error("Error getting bouteille by ID:", error);
                throw new Error("Une erreur s'est produite lors de la récupération de la bouteille.");
            }
        });
    }
    deleteBouteille(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Deleting bouteille with ID:', id);
            try {
                const existingBouteille = yield this.db.findOne({ where: { id } });
                if (!existingBouteille) {
                    throw new Error("Bouteille not found");
                }
                yield this.db.remove(existingBouteille);
                return true;
            }
            catch (error) {
                console.error("Error deleting bouteille:", error);
                throw new Error("Une erreur s'est produite lors de la suppression de la bouteille.");
            }
        });
    }
    addBouteille(bouteilleInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { millesime, garde_apogee, alcool, quantite, note, note_perso, bouche, accord, vinId, casierId, cepageIds, cuveeNom, regionId, userId } = bouteilleInput;
                const vin = yield this.vinRepository.findOne({ where: { id: vinId } });
                if (!vin) {
                    throw new Error("Vin non trouvé");
                }
                const casier = yield this.casierRepository.findOne({ where: { id: casierId } });
                if (!casier) {
                    throw new Error("Casier non trouvé");
                }
                const region = yield this.regionRepository.findOne({ where: { id: regionId } });
                if (!region) {
                    throw new Error("Region non trouvée");
                }
                // const paysId = region.pays.id;
                const cepages = yield this.cepageRepository.findByIds(cepageIds);
                if (cepages.length !== cepageIds.length) {
                    throw new Error("Un ou plusieurs cépages non trouvés");
                }
                let cuvee = null;
                if (cuveeNom) {
                    cuvee = this.cuveeRepository.create({ nom_domaine: cuveeNom });
                    yield this.cuveeRepository.save(cuvee);
                }
                const user = yield this.userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    throw new Error("Utilisateur non trouvé");
                }
                const newBouteille = this.db.create(Object.assign(Object.assign({ millesime,
                    garde_apogee,
                    alcool,
                    quantite,
                    note,
                    note_perso,
                    bouche,
                    accord,
                    vin,
                    cepages }, (cuvee && { cuvee })), { region,
                    casier,
                    user }));
                return yield this.db.save(newBouteille);
            }
            catch (error) {
                console.error("Error adding bouteille:", error);
                throw new Error("Une erreur s'est produite lors de l'ajout de la bouteille.");
            }
        });
    }
    updateBouteille(bouteilleInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, millesime, garde_apogee, alcool, quantite, note, note_perso, bouche, accord, vinId, casierId, cepageIds, cuveeNom, regionId, userId } = bouteilleInput;
                // Trouver la bouteille existante
                const existingBouteille = yield this.db.findOne({ where: { id } });
                if (!existingBouteille) {
                    throw new Error("Bouteille non trouvée");
                }
                // Mettre à jour les champs si les nouvelles valeurs sont fournies
                if (millesime !== undefined)
                    existingBouteille.millesime = millesime;
                if (garde_apogee !== undefined)
                    existingBouteille.garde_apogee = garde_apogee;
                if (alcool !== undefined)
                    existingBouteille.alcool = alcool;
                if (quantite !== undefined)
                    existingBouteille.quantite = quantite;
                if (note !== undefined)
                    existingBouteille.note = note;
                if (note_perso !== undefined)
                    existingBouteille.note_perso = note_perso;
                if (bouche !== undefined)
                    existingBouteille.bouche = bouche;
                if (accord !== undefined)
                    existingBouteille.accord = accord;
                if (vinId !== undefined) {
                    const vin = yield this.vinRepository.findOne({ where: { id: vinId } });
                    if (!vin) {
                        throw new Error("Vin non trouvé");
                    }
                    existingBouteille.vin = vin;
                }
                if (casierId !== undefined) {
                    const casier = yield this.casierRepository.findOne({ where: { id: casierId } });
                    if (!casier) {
                        throw new Error("Casier non trouvé");
                    }
                    existingBouteille.casier = casier;
                }
                if (regionId !== undefined) {
                    const region = yield this.regionRepository.findOne({ where: { id: regionId } });
                    if (!region) {
                        throw new Error("Région non trouvée");
                    }
                    existingBouteille.region = region;
                    // Récupérer le paysId depuis la région
                    // existingBouteille.paysId = region.paysId;
                }
                if (cepageIds !== undefined) {
                    const cepages = yield this.cepageRepository.findByIds(cepageIds);
                    if (cepages.length !== cepageIds.length) {
                        throw new Error("Un ou plusieurs cépages non trouvés");
                    }
                    existingBouteille.cepages = cepages;
                }
                if (cuveeNom !== undefined) {
                    let cuvee = existingBouteille.cuvee;
                    if (!cuvee) {
                        cuvee = this.cuveeRepository.create({ nom_domaine: cuveeNom });
                    }
                    else {
                        cuvee.nom_domaine = cuveeNom;
                    }
                    yield this.cuveeRepository.save(cuvee);
                    existingBouteille.cuvee = cuvee;
                }
                if (userId !== undefined) {
                    const user = yield this.userRepository.findOne({ where: { id: userId } });
                    if (!user)
                        throw new Error("Utilisateur non trouvé");
                    existingBouteille.user = user;
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
                return yield this.db.save(existingBouteille);
            }
            catch (error) {
                console.error("Error updating bouteille:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour de la bouteille.");
            }
        });
    }
}
exports.default = BouteilleService;
