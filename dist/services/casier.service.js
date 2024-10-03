"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../lib/datasource"));
const casier_entity_1 = require("../entities/casier.entity");
class CasierService {
    constructor() {
        this.db = datasource_1.default.getRepository(casier_entity_1.Casier);
    }
    async listCasiers() {
        try {
            const casiers = await this.db.find({
                relations: ["bouteilles"]
            });
            return casiers;
        }
        catch (error) {
            console.error("Error listing casiers:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des casiers.");
        }
    }
    async getCasierById(id) {
        try {
            return await this.db.findOne({
                where: { id },
                relations: ["bouteilles"]
            });
        }
        catch (error) {
            console.error("Error getting casier by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération du casier.");
        }
    }
    async addCasier({ name, rangee, colonne }) {
        try {
            const newCasier = this.db.create({ name, rangee, colonne });
            return await this.db.save(newCasier);
        }
        catch (error) {
            console.error("Error adding casier:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout du casier.");
        }
    }
    async updateCasier(id, { name, rangee, colonne }) {
        try {
            const existingCasier = await this.db.findOne({ where: { id } });
            if (!existingCasier) {
                throw new Error("Casier not found");
            }
            if (name !== undefined) {
                existingCasier.name = name;
            }
            if (rangee !== undefined) {
                existingCasier.rangee = rangee;
            }
            if (colonne !== undefined) {
                existingCasier.colonne = colonne;
            }
            return await this.db.save(existingCasier);
        }
        catch (error) {
            console.error("Error updating casier:", error);
            throw new Error("Une erreur s'est produite lors de la mise à jour du casier.");
        }
    }
    async deleteCasier(id) {
        try {
            const existingCasier = await this.db.findOne({ where: { id } });
            if (!existingCasier) {
                throw new Error("Casier not found");
            }
            await this.db.remove(existingCasier);
            return true;
        }
        catch (error) {
            console.error("Error deleting casier:", error);
            throw new Error("Une erreur s'est produite lors de la suppression du casier.");
        }
    }
}
exports.default = CasierService;
