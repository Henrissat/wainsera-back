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
const pays_entity_1 = require("../entities/pays.entity");
class PaysService {
    constructor() {
        this.db = datasource_1.default.getRepository(pays_entity_1.Pays);
    }
    listPays() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pays = yield this.db.find({
                    relations: ["regions"]
                });
                return pays;
            }
            catch (error) {
                console.error("Error listing pays:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des pays.");
            }
        });
    }
    getPaysById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.findOne({ where: { id } });
            }
            catch (error) {
                console.error("Error getting pays by ID:", error);
                throw new Error("Une erreur s'est produite lors de la récupération du pays.");
            }
        });
    }
}
exports.default = PaysService;
