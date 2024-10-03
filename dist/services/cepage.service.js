"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../lib/datasource"));
const cepage_entity_1 = require("../entities/cepage.entity");
class CepageService {
    constructor() {
        this.db = datasource_1.default.getRepository(cepage_entity_1.Cepage);
    }
    async listCepages() {
        try {
            const cepages = await this.db.find(
            // {
            // relations: ["vins"]
            // }  
            );
            return cepages;
        }
        catch (error) {
            console.error("Error listing cépages:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des cépages.");
        }
    }
    async getCepageById(id) {
        try {
            return await this.db.findOne({
                where: { id },
                relations: ["vins"]
            });
        }
        catch (error) {
            console.error("Error getting cépage by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération du cépage.");
        }
    }
    async addCepage({ nom_cepage }) {
        try {
            const newCepage = this.db.create({ nom_cepage });
            return await this.db.save(newCepage);
        }
        catch (error) {
            console.error("Error adding cépage:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout du cépage.");
        }
    }
    async updateCepage(id, { nom_cepage }) {
        try {
            const existingCepage = await this.db.findOne({ where: { id } });
            if (!existingCepage) {
                throw new Error("Cepage not found");
            }
            if (nom_cepage !== undefined) {
                existingCepage.nom_cepage = nom_cepage;
            }
            return await this.db.save(existingCepage);
        }
        catch (error) {
            console.error("Error updating cépage:", error);
            throw new Error("Une erreur s'est produite lors de la mise à jour du cépage.");
        }
    }
    async deleteCepage(id) {
        try {
            const existingCepage = await this.db.findOne({ where: { id } });
            if (!existingCepage) {
                throw new Error("Cepage not found");
            }
            await this.db.remove(existingCepage);
            return true;
        }
        catch (error) {
            console.error("Error deleting cépage:", error);
            throw new Error("Une erreur s'est produite lors de la suppression du cépage.");
        }
    }
}
exports.default = CepageService;
