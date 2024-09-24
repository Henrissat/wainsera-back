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
const region_entity_1 = require("../entities/region.entity");
// import { IAddRegion, IUpdateRegion } from "../resolvers/region";
class RegionService {
    constructor() {
        this.db = datasource_1.default.getRepository(region_entity_1.Region);
    }
    listRegions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regions = yield this.db.find({
                    relations: ["pays", "appellations"]
                });
                return regions;
            }
            catch (error) {
                console.error("Error listing regions:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des régions.");
            }
        });
    }
    getRegionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.findOne({
                    where: { id },
                    relations: ["pays", "appellations"]
                });
            }
            catch (error) {
                console.error("Error getting region by ID:", error);
                throw new Error("Une erreur s'est produite lors de la récupération de la région.");
            }
        });
    }
}
exports.default = RegionService;
