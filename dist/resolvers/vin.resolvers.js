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
const vin_entity_1 = require("../entities/vin.entity");
const vin_service_1 = __importDefault(require("../services/vin.service"));
let VinResolver = class VinResolver {
    constructor() {
        this.vinService = new vin_service_1.default();
    }
    vins() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.vinService.listVins();
            }
            catch (error) {
                console.error("Error in vins query:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des vins.");
            }
        });
    }
    //   @Query(() => Vin, { nullable: true })
    //   async getVinById(@Arg("id") id: number): Promise<Vin | null> {
    //     try {
    //       return await this.vinService.getVinById(id);
    //     } catch (error) {
    //       console.error("Error in getVinById query:", error);
    //       throw new Error("Une erreur s'est produite lors de la récupération du vin.");
    //     }
    //   }
    getVinByColor(couleur) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.vinService.getVinByColor(couleur);
            }
            catch (error) {
                console.error(`Error retrieving vins for couleur '${couleur}':`, error);
                throw new Error("Une erreur s'est produite lors de la récupération des vins par couleur.");
            }
        });
    }
    addVin(couleur) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.vinService.addVin({ couleur });
            }
            catch (error) {
                console.error("Error in addVin mutation:", error);
                throw new Error("Une erreur s'est produite lors de l'ajout d'un vin'.");
            }
        });
    }
    updateVin(id, couleur) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.vinService.updateVin(id, { id, couleur });
            }
            catch (error) {
                console.error("Error in updateVin mutation:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour d'un vin.");
            }
        });
    }
    deleteVin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Resolver: Deleting vin with ID:', id);
            try {
                const success = yield this.vinService.deleteVin(id);
                return success;
            }
            catch (error) {
                console.error("Error in deleteVin mutation:", error);
                throw new Error("Une erreur s'est produite lors de la suppression du vin.");
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [vin_entity_1.Vin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VinResolver.prototype, "vins", null);
__decorate([
    (0, type_graphql_1.Query)(() => [vin_entity_1.Vin]),
    __param(0, (0, type_graphql_1.Arg)("couleur")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VinResolver.prototype, "getVinByColor", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => vin_entity_1.Vin),
    __param(0, (0, type_graphql_1.Arg)("couleur")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VinResolver.prototype, "addVin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => vin_entity_1.Vin, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("couleur")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], VinResolver.prototype, "updateVin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VinResolver.prototype, "deleteVin", null);
VinResolver = __decorate([
    (0, type_graphql_1.Resolver)(vin_entity_1.Vin)
], VinResolver);
exports.default = VinResolver;
