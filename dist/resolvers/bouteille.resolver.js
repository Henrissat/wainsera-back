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
// src/resolvers/bouteille.resolver.ts
const type_graphql_1 = require("type-graphql");
const bouteille_entity_1 = require("../entities/bouteille.entity");
const bouteille_service_1 = __importDefault(require("../services/bouteille.service"));
const bouteille_input_1 = require("./bouteille.input");
let BouteilleResolver = class BouteilleResolver {
    constructor() {
        this.bouteilleService = new bouteille_service_1.default();
    }
    async bouteilles() {
        try {
            return await this.bouteilleService.listBouteilles();
        }
        catch (error) {
            console.error("Error in bouteilles query:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des bouteilles.");
        }
    }
    async getBouteilleById(id) {
        try {
            const bouteille = await this.bouteilleService.getBouteilleById(id);
            if (!bouteille) {
                throw new Error("Bouteille not found");
            }
            return bouteille;
        }
        catch (error) {
            console.error("Error in getBouteilleById query:", error);
            throw new Error("Une erreur s'est produite lors de la récupération de la bouteille.");
        }
    }
    async addBouteille(bouteilleInput) {
        try {
            return await this.bouteilleService.addBouteille(bouteilleInput);
        }
        catch (error) {
            console.error("Error in addBouteille mutation:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout de la bouteille.");
        }
    }
    async updateBouteille(bouteilleInput) {
        try {
            return await this.bouteilleService.updateBouteille(bouteilleInput);
        }
        catch (error) {
            console.error("Error in updateBouteille mutation:", error);
            throw new Error("Une erreur s'est produite lors de la modification de la bouteille.");
        }
    }
    async deleteBouteille(id) {
        console.log('Resolver: Deleting bouteille with ID:', id);
        try {
            const success = await this.bouteilleService.deleteBouteille(id);
            return success;
        }
        catch (error) {
            console.error("Error in deleteBouteille mutation:", error);
            throw new Error("Une erreur s'est produite lors de la suppression de la bouteille.");
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [bouteille_entity_1.Bouteille]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BouteilleResolver.prototype, "bouteilles", null);
__decorate([
    (0, type_graphql_1.Query)(() => bouteille_entity_1.Bouteille, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BouteilleResolver.prototype, "getBouteilleById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => bouteille_entity_1.Bouteille),
    __param(0, (0, type_graphql_1.Arg)("bouteille")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bouteille_input_1.IAddBouteille]),
    __metadata("design:returntype", Promise)
], BouteilleResolver.prototype, "addBouteille", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => bouteille_entity_1.Bouteille),
    __param(0, (0, type_graphql_1.Arg)("bouteille")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bouteille_input_1.IUpdateBouteille]),
    __metadata("design:returntype", Promise)
], BouteilleResolver.prototype, "updateBouteille", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BouteilleResolver.prototype, "deleteBouteille", null);
BouteilleResolver = __decorate([
    (0, type_graphql_1.Resolver)(bouteille_entity_1.Bouteille)
], BouteilleResolver);
exports.default = BouteilleResolver;
