"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../lib/datasource"));
const pays_entity_1 = require("../entities/pays.entity");
class PaysService {
    constructor() {
        this.db = datasource_1.default.getRepository(pays_entity_1.Pays);
    }
    async listPays() {
        try {
            const pays = await this.db.find({
                relations: ["regions"]
            });
            return pays;
        }
        catch (error) {
            console.error("Error listing pays:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des pays.");
        }
    }
    async getPaysById(id) {
        try {
            return await this.db.findOne({ where: { id } });
        }
        catch (error) {
            console.error("Error getting pays by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération du pays.");
        }
    }
}
exports.default = PaysService;
