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
const cepage_entity_1 = require("../entities/cepage.entity");
class CepageService {
    constructor() {
        this.db = datasource_1.default.getRepository(cepage_entity_1.Cepage);
    }
    listCepages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cepages = yield this.db.find(
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
        });
    }
    getCepageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.findOne({
                    where: { id },
                    relations: ["vins"]
                });
            }
            catch (error) {
                console.error("Error getting cépage by ID:", error);
                throw new Error("Une erreur s'est produite lors de la récupération du cépage.");
            }
        });
    }
    addCepage({ nom_cepage }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCepage = this.db.create({ nom_cepage });
                return yield this.db.save(newCepage);
            }
            catch (error) {
                console.error("Error adding cépage:", error);
                throw new Error("Une erreur s'est produite lors de l'ajout du cépage.");
            }
        });
    }
    updateCepage(id, { nom_cepage }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCepage = yield this.db.findOne({ where: { id } });
                if (!existingCepage) {
                    throw new Error("Cepage not found");
                }
                if (nom_cepage !== undefined) {
                    existingCepage.nom_cepage = nom_cepage;
                }
                return yield this.db.save(existingCepage);
            }
            catch (error) {
                console.error("Error updating cépage:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour du cépage.");
            }
        });
    }
    deleteCepage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCepage = yield this.db.findOne({ where: { id } });
                if (!existingCepage) {
                    throw new Error("Cepage not found");
                }
                yield this.db.remove(existingCepage);
                return true;
            }
            catch (error) {
                console.error("Error deleting cépage:", error);
                throw new Error("Une erreur s'est produite lors de la suppression du cépage.");
            }
        });
    }
}
exports.default = CepageService;
