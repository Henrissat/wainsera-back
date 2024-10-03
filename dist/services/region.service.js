"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../lib/datasource"));
const region_entity_1 = require("../entities/region.entity");
// import { IAddRegion, IUpdateRegion } from "../resolvers/region";
class RegionService {
    constructor() {
        this.db = datasource_1.default.getRepository(region_entity_1.Region);
    }
    async listRegions() {
        try {
            const regions = await this.db.find({
                relations: ["pays", "appellations"]
            });
            return regions;
        }
        catch (error) {
            console.error("Error listing regions:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des régions.");
        }
    }
    async getRegionById(id) {
        try {
            return await this.db.findOne({
                where: { id },
                relations: ["pays", "appellations"]
            });
        }
        catch (error) {
            console.error("Error getting region by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération de la région.");
        }
    }
}
exports.default = RegionService;
