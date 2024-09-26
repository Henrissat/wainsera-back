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
const cuvee_entity_1 = require("../entities/cuvee.entity");
class CuveeService {
    constructor() {
        this.db = datasource_1.default.getRepository(cuvee_entity_1.Cuvee);
    }
    listCuvees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuvees = yield this.db.find();
                return cuvees;
            }
            catch (error) {
                console.error("Error listing cuvees:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des cuvées.");
            }
        });
    }
    getCuveeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.findOne({ where: { id } });
            }
            catch (error) {
                console.error("Error getting cuvee by ID:", error);
                throw new Error("Une erreur s'est produite lors de la récupération de la cuvée.");
            }
        });
    }
    addCuvee({ nom_domaine }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCuvee = this.db.create({ nom_domaine });
                return yield this.db.save(newCuvee);
            }
            catch (error) {
                console.error("Error adding cuvee:", error);
                throw new Error("Une erreur s'est produite lors de l'ajout de la cuvée.");
            }
        });
    }
    updateCuvee(id, { nom_domaine }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Updating cuvee with ID:', id);
            try {
                const existingCuvee = yield this.db.findOne({ where: { id } });
                if (!existingCuvee) {
                    throw new Error("Cuvee not found");
                }
                if (nom_domaine !== undefined) {
                    existingCuvee.nom_domaine = nom_domaine;
                }
                return yield this.db.save(existingCuvee);
            }
            catch (error) {
                console.error("Error updating cuvee:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour de la cuvée.");
            }
        });
    }
    deleteCuvee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Deleting cuvee with ID:', id);
            try {
                const existingCuvee = yield this.db.findOne({ where: { id } });
                if (!existingCuvee) {
                    throw new Error("Cuvee not found");
                }
                yield this.db.remove(existingCuvee);
                return true;
            }
            catch (error) {
                console.error("Error deleting cuvee:", error);
                throw new Error("Une erreur s'est produite lors de la suppression de la cuvée.");
            }
        });
    }
}
exports.default = CuveeService;
