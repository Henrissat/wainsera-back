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
const vin_entity_1 = require("../entities/vin.entity");
class VinService {
    constructor() {
        this.db = datasource_1.default.getRepository(vin_entity_1.Vin);
    }
    listVins() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vins = yield this.db.find(
                //   {
                //   relations: ["cepages", "appellations"]
                // }
                );
                console.log('vins', vins);
                return vins;
            }
            catch (error) {
                console.error("Error listing vins:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des vins.");
            }
        });
    }
    getVinByColor(couleur) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db
                    .createQueryBuilder("vin")
                    .where("vin.couleur = :couleur", { couleur })
                    .leftJoinAndSelect("vin.bouteilles", "bouteille")
                    .leftJoinAndSelect("vin.cepages", "cepage")
                    .leftJoinAndSelect("vin.appellations", "appellation")
                    .getMany();
            }
            catch (error) {
                console.error(`Error retrieving vins for couleur '${couleur}':`, error);
                throw new Error("Une erreur s'est produite lors de la récupération des vins par couleur.");
            }
        });
    }
    addVin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vin = this.db.create(data);
                yield this.db.save(vin);
                return vin;
            }
            catch (error) {
                console.error("Error adding vin:", error);
                throw new Error("Une erreur s'est produite lors de l'ajout du vin.");
            }
        });
    }
    updateVin(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vin = yield this.db.findOne({ where: { id } });
                if (!vin) {
                    throw new Error("Vin not found");
                }
                vin = Object.assign(Object.assign({}, vin), data);
                yield this.db.save(vin);
                return vin;
            }
            catch (error) {
                console.error("Error updating vin:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour du vin.");
            }
        });
    }
    deleteVin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Deleting vin with ID:', id);
            try {
                const existingVin = yield this.db.findOne({ where: { id } });
                if (!existingVin) {
                    throw new Error("vin not found");
                }
                yield this.db.remove(existingVin);
                return true;
            }
            catch (error) {
                console.error("Error deleting vin:", error);
                throw new Error("Une erreur s'est produite lors de la suppression du vin.");
            }
        });
    }
}
exports.default = VinService;
