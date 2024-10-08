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
const casier_service_1 = __importDefault(require("../services/casier.service"));
const casier_entity_1 = require("../entities/casier.entity");
// import { IAddCasier, IUpdateCasier } from "./casier";
let CasierResolver = class CasierResolver {
    constructor() {
        this.casierService = new casier_service_1.default();
    }
    async casiers() {
        return this.casierService.listCasiers();
    }
    async casier(id) {
        return this.casierService.getCasierById(id);
    }
    // @Mutation(() => Casier)
    // async addCasier(@Arg("data") data: IAddCasier): Promise<Casier> {
    //   return this.casierService.addCasier(data);
    // }
    // @Mutation(() => Casier)
    // async updateCasier(@Arg("id") id: number, @Arg("data") data: IUpdateCasier): Promise<Casier> {
    //   return this.casierService.updateCasier(id, data);
    // }
    async deleteCasier(id) {
        return this.casierService.deleteCasier(id);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [casier_entity_1.Casier]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CasierResolver.prototype, "casiers", null);
__decorate([
    (0, type_graphql_1.Query)(() => casier_entity_1.Casier, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CasierResolver.prototype, "casier", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CasierResolver.prototype, "deleteCasier", null);
CasierResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CasierResolver);
exports.default = CasierResolver;
