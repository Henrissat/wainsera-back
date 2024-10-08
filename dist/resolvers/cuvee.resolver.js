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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// cuvee.resolver.ts
const type_graphql_1 = require("type-graphql");
const cuvee_entity_1 = require("../entities/cuvee.entity");
const cuvee_service_1 = __importDefault(require("../services/cuvee.service"));
let CuveeResolver = class CuveeResolver {
    constructor() {
        this.cuveeService = new cuvee_service_1.default();
    }
    async cuvees() {
        try {
            return await this.cuveeService.listCuvees();
        }
        catch (error) {
            console.error("Error in cuvees query:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des cuvées.");
        }
    }
    async getCuveeById(id) {
        try {
            const cuvee = await this.cuveeService.getCuveeById(id);
            if (!cuvee) {
                throw new Error("Cuvee not found");
            }
            return cuvee;
        }
        catch (error) {
            console.error("Error in getCuveeById query:", error);
            throw new Error("Une erreur s'est produite lors de la récupération de la cuvée.");
        }
    }
    async addCuvee(nom_domaine) {
        try {
            return await this.cuveeService.addCuvee({ nom_domaine });
        }
        catch (error) {
            console.error("Error in addCuvee mutation:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout de la cuvée.");
        }
    }
    async updateCuvee(id, nom_domaine) {
        try {
            return await this.cuveeService.updateCuvee(id, { id, nom_domaine });
        }
        catch (error) {
            console.error("Error in updateCuvee mutation:", error);
            throw new Error("Une erreur s'est produite lors de la mise à jour de la cuvée.");
        }
    }
    async deleteCuvee(id) {
        console.log('Resolver: Deleting cuvee with ID:', id);
        try {
            const success = await this.cuveeService.deleteCuvee(id);
            return success;
        }
        catch (error) {
            console.error("Error in deleteCuvee mutation:", error);
            throw new Error("Une erreur s'est produite lors de la suppression de la cuvée.");
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [cuvee_entity_1.Cuvee]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CuveeResolver.prototype, "cuvees", null);
__decorate([
    (0, type_graphql_1.Query)(() => cuvee_entity_1.Cuvee, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CuveeResolver.prototype, "getCuveeById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cuvee_entity_1.Cuvee),
    __param(0, (0, type_graphql_1.Arg)("nom_domaine")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CuveeResolver.prototype, "addCuvee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cuvee_entity_1.Cuvee, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("nom_domaine", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CuveeResolver.prototype, "updateCuvee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CuveeResolver.prototype, "deleteCuvee", null);
CuveeResolver = __decorate([
    (0, type_graphql_1.Resolver)(cuvee_entity_1.Cuvee)
], CuveeResolver);
exports.default = CuveeResolver;
