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
const region_entity_1 = require("../entities/region.entity");
const region_service_1 = __importDefault(require("../services/region.service"));
let RegionResolver = class RegionResolver {
    constructor() {
        this.regionService = new region_service_1.default();
        // @Mutation(() => Region)
        // async addRegion(@Arg("data") data: IAddRegion) {
        //   try {
        //     return await this.regionService.addRegion(data);
        //   } catch (error) {
        //     console.error("Error in addRegion mutation:", error);
        //     throw new Error("Une erreur s'est produite lors de l'ajout de la région.");
        //   }
        // }
        // @Mutation(() => Region, { nullable: true })
        // async updateRegion(@Arg("id") id: number, @Arg("data") data: IUpdateRegion) {
        //   try {
        //     return await this.regionService.updateRegion(id, data);
        //   } catch (error) {
        //     console.error("Error in updateRegion mutation:", error);
        //     throw new Error("Une erreur s'est produite lors de la mise à jour de la région.");
        //   }
        // }
        // @Mutation(() => Boolean)
        // async deleteRegion(@Arg("id") id: number) {
        //   try {
        //     const success = await this.regionService.deleteRegion(id);
        //     return success;
        //   } catch (error) {
        //     console.error("Error in deleteRegion mutation:", error);
        //     throw new Error("Une erreur s'est produite lors de la suppression de la région.");
        //   }
        // }
    }
    regions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.regionService.listRegions();
            }
            catch (error) {
                console.error("Error in regions query:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des régions.");
            }
        });
    }
    getRegionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const region = yield this.regionService.getRegionById(id);
                if (!region) {
                    throw new Error("Region not found");
                }
                return region;
            }
            catch (error) {
                console.error("Error in getRegionById query:", error);
                throw new Error("Une erreur s'est produite lors de la récupération de la région.");
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [region_entity_1.Region]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionResolver.prototype, "regions", null);
__decorate([
    (0, type_graphql_1.Query)(() => region_entity_1.Region, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegionResolver.prototype, "getRegionById", null);
RegionResolver = __decorate([
    (0, type_graphql_1.Resolver)(region_entity_1.Region)
], RegionResolver);
exports.default = RegionResolver;
