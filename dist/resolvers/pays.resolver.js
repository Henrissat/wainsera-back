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
const pays_entity_1 = require("../entities/pays.entity");
const pays_service_1 = __importDefault(require("../services/pays.service"));
let PaysResolver = class PaysResolver {
    constructor() {
        this.paysService = new pays_service_1.default();
    }
    async pays() {
        try {
            return await this.paysService.listPays();
        }
        catch (error) {
            console.error("Error in pays query:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des pays.");
        }
    }
    async getPaysById(id) {
        try {
            const pays = await this.paysService.getPaysById(id);
            if (!pays) {
                throw new Error("Pays not found");
            }
            return pays;
        }
        catch (error) {
            console.error("Error in getPaysById query:", error);
            throw new Error("Une erreur s'est produite lors de la récupération du pays.");
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [pays_entity_1.Pays]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaysResolver.prototype, "pays", null);
__decorate([
    (0, type_graphql_1.Query)(() => pays_entity_1.Pays, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaysResolver.prototype, "getPaysById", null);
PaysResolver = __decorate([
    (0, type_graphql_1.Resolver)(pays_entity_1.Pays)
], PaysResolver);
exports.default = PaysResolver;
