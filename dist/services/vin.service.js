"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../lib/datasource"));
const vin_entity_1 = require("../entities/vin.entity");
class VinService {
    constructor() {
        this.db = datasource_1.default.getRepository(vin_entity_1.Vin);
    }
    async listVins() {
        try {
            const vins = await this.db.find(
            //   {
            //   relations: ["cepages", "appellations"]
            // }
            );
            console.log('vins', vins);
            return vins;
        }
        catch (error) {
            console.error("Error listing vins:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des vins.");
        }
    }
    async getVinByColor(couleur) {
        try {
            return await this.db
                .createQueryBuilder("vin")
                .where("vin.couleur = :couleur", { couleur })
                .leftJoinAndSelect("vin.bouteilles", "bouteille")
                .leftJoinAndSelect("vin.cepages", "cepage")
                .leftJoinAndSelect("vin.appellations", "appellation")
                .getMany();
        }
        catch (error) {
            console.error(`Error retrieving vins for couleur '${couleur}':`, error);
            throw new Error("Une erreur s'est produite lors de la récupération des vins par couleur.");
        }
    }
    async addVin(data) {
        try {
            const vin = this.db.create(data);
            await this.db.save(vin);
            return vin;
        }
        catch (error) {
            console.error("Error adding vin:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout du vin.");
        }
    }
    async updateVin(id, data) {
        try {
            let vin = await this.db.findOne({ where: { id } });
            if (!vin) {
                throw new Error("Vin not found");
            }
            vin = Object.assign(Object.assign({}, vin), data);
            await this.db.save(vin);
            return vin;
        }
        catch (error) {
            console.error("Error updating vin:", error);
            throw new Error("Une erreur s'est produite lors de la mise à jour du vin.");
        }
    }
    async deleteVin(id) {
        console.log('Deleting vin with ID:', id);
        try {
            const existingVin = await this.db.findOne({ where: { id } });
            if (!existingVin) {
                throw new Error("vin not found");
            }
            await this.db.remove(existingVin);
            return true;
        }
        catch (error) {
            console.error("Error deleting vin:", error);
            throw new Error("Une erreur s'est produite lors de la suppression du vin.");
        }
    }
}
exports.default = VinService;
