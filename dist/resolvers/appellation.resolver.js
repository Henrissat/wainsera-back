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
const type_graphql_1 = require("type-graphql");
const appellation_entity_1 = require("../entities/appellation.entity");
const appellation_service_1 = __importDefault(require("../services/appellation.service"));
let AppellationResolver = class AppellationResolver {
    constructor() {
        this.appellationService = new appellation_service_1.default();
    }
    async vins() {
        try {
            return await this.appellationService.listAppellations();
        }
        catch (error) {
            console.error("Error in vins query:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des vins.");
        }
    }
    async getAppellationById(id) {
        try {
            const appellation = await this.appellationService.getAppellationById(id);
            if (!appellation) {
                throw new Error("Appellation not found");
            }
            return appellation;
        }
        catch (error) {
            console.error("Error in getAppellationById query:", error);
            throw new Error("Une erreur s'est produite lors de la sélection de l'appellation.");
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [appellation_entity_1.Appellation]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppellationResolver.prototype, "vins", null);
__decorate([
    (0, type_graphql_1.Query)(() => [appellation_entity_1.Appellation]),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppellationResolver.prototype, "getAppellationById", null);
AppellationResolver = __decorate([
    (0, type_graphql_1.Resolver)(appellation_entity_1.Appellation)
], AppellationResolver);
exports.default = AppellationResolver;
