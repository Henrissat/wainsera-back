"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appellation_entity_1 = require("../entities/appellation.entity");
const datasource_1 = __importDefault(require("../lib/datasource"));
class AppellationService {
    constructor() {
        this.db = datasource_1.default.getRepository(appellation_entity_1.Appellation);
    }
    async listAppellations() {
        try {
            const cuvees = await this.db.find();
            return cuvees;
        }
        catch (error) {
            console.error("Error listing cuvees:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des cuvées.");
        }
    }
    async getAppellationById(id) {
        try {
            return await this.db.findOne({ where: { id } });
        }
        catch (error) {
            console.error("Error getting cuvee by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération de la cuvée.");
        }
    }
}
exports.default = AppellationService;
