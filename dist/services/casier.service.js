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
const casier_entity_1 = require("../entities/casier.entity");
class CasierService {
    constructor() {
        this.db = datasource_1.default.getRepository(casier_entity_1.Casier);
    }
    listCasiers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const casiers = yield this.db.find({
                    relations: ["bouteilles"]
                });
                return casiers;
            }
            catch (error) {
                console.error("Error listing casiers:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des casiers.");
            }
        });
    }
    getCasierById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.findOne({
                    where: { id },
                    relations: ["bouteilles"]
                });
            }
            catch (error) {
                console.error("Error getting casier by ID:", error);
                throw new Error("Une erreur s'est produite lors de la récupération du casier.");
            }
        });
    }
    addCasier({ name, rangee, colonne }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCasier = this.db.create({ name, rangee, colonne });
                return yield this.db.save(newCasier);
            }
            catch (error) {
                console.error("Error adding casier:", error);
                throw new Error("Une erreur s'est produite lors de l'ajout du casier.");
            }
        });
    }
    updateCasier(id, { name, rangee, colonne }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCasier = yield this.db.findOne({ where: { id } });
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
                return yield this.db.save(existingCasier);
            }
            catch (error) {
                console.error("Error updating casier:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour du casier.");
            }
        });
    }
    deleteCasier(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCasier = yield this.db.findOne({ where: { id } });
                if (!existingCasier) {
                    throw new Error("Casier not found");
                }
                yield this.db.remove(existingCasier);
                return true;
            }
            catch (error) {
                console.error("Error deleting casier:", error);
                throw new Error("Une erreur s'est produite lors de la suppression du casier.");
            }
        });
    }
}
exports.default = CasierService;
