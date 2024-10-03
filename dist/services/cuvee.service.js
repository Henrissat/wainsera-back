"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../lib/datasource"));
const cuvee_entity_1 = require("../entities/cuvee.entity");
class CuveeService {
    constructor() {
        this.db = datasource_1.default.getRepository(cuvee_entity_1.Cuvee);
    }
    async listCuvees() {
        try {
            const cuvees = await this.db.find();
            return cuvees;
        }
        catch (error) {
            console.error("Error listing cuvees:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des cuvées.");
        }
    }
    async getCuveeById(id) {
        try {
            return await this.db.findOne({ where: { id } });
        }
        catch (error) {
            console.error("Error getting cuvee by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération de la cuvée.");
        }
    }
    async addCuvee({ nom_domaine }) {
        try {
            const newCuvee = this.db.create({ nom_domaine });
            return await this.db.save(newCuvee);
        }
        catch (error) {
            console.error("Error adding cuvee:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout de la cuvée.");
        }
    }
    async updateCuvee(id, { nom_domaine }) {
        console.log('Updating cuvee with ID:', id);
        try {
            const existingCuvee = await this.db.findOne({ where: { id } });
            if (!existingCuvee) {
                throw new Error("Cuvee not found");
            }
            if (nom_domaine !== undefined) {
                existingCuvee.nom_domaine = nom_domaine;
            }
            return await this.db.save(existingCuvee);
        }
        catch (error) {
            console.error("Error updating cuvee:", error);
            throw new Error("Une erreur s'est produite lors de la mise à jour de la cuvée.");
        }
    }
    async deleteCuvee(id) {
        console.log('Deleting cuvee with ID:', id);
        try {
            const existingCuvee = await this.db.findOne({ where: { id } });
            if (!existingCuvee) {
                throw new Error("Cuvee not found");
            }
            await this.db.remove(existingCuvee);
            return true;
        }
        catch (error) {
            console.error("Error deleting cuvee:", error);
            throw new Error("Une erreur s'est produite lors de la suppression de la cuvée.");
        }
    }
}
exports.default = CuveeService;
