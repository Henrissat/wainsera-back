"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const type_graphql_1 = require("type-graphql");
const cepage_entity_1 = require("../entities/cepage.entity");
const cepage_service_1 = __importDefault(require("../services/cepage.service"));
let CepageResolver = class CepageResolver {
    constructor() {
        this.cepageService = new cepage_service_1.default();
    }
    cepages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cepageService.listCepages();
            }
            catch (error) {
                console.error("Error in cepages query:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des cépages.");
            }
        });
    }
    getCepageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cepage = yield this.cepageService.getCepageById(id);
                if (!cepage) {
                    throw new Error("Cepage not found");
                }
                return cepage;
            }
            catch (error) {
                console.error("Error in getCepageById query:", error);
                throw new Error("Une erreur s'est produite lors de la récupération du cépage.");
            }
        });
    }
    addCepage(nom_cepage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cepageService.addCepage({ nom_cepage });
            }
            catch (error) {
                console.error("Error in addCepage mutation:", error);
                throw new Error("Une erreur s'est produite lors de l'ajout du cépage.");
            }
        });
    }
    updateCepage(id, nom_cepage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cepageService.updateCepage(id, { id, nom_cepage });
            }
            catch (error) {
                console.error("Error in updateCepage mutation:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour du cépage.");
            }
        });
    }
    deleteCepage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.cepageService.deleteCepage(id);
                return success;
            }
            catch (error) {
                console.error("Error in deleteCepage mutation:", error);
                throw new Error("Une erreur s'est produite lors de la suppression du cépage.");
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [cepage_entity_1.Cepage]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CepageResolver.prototype, "cepages", null);
__decorate([
    (0, type_graphql_1.Query)(() => cepage_entity_1.Cepage, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CepageResolver.prototype, "getCepageById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cepage_entity_1.Cepage),
    __param(0, (0, type_graphql_1.Arg)("nom_cepage")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CepageResolver.prototype, "addCepage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cepage_entity_1.Cepage, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("nom_cepage", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CepageResolver.prototype, "updateCepage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CepageResolver.prototype, "deleteCepage", null);
CepageResolver = __decorate([
    (0, type_graphql_1.Resolver)(cepage_entity_1.Cepage)
], CepageResolver);
exports.default = CepageResolver;
