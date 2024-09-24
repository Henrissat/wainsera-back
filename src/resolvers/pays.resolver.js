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
const pays_entity_1 = require("../entities/pays.entity");
const pays_service_1 = __importDefault(require("../services/pays.service"));
let PaysResolver = class PaysResolver {
    constructor() {
        this.paysService = new pays_service_1.default();
    }
    pays() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.paysService.listPays();
            }
            catch (error) {
                console.error("Error in pays query:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des pays.");
            }
        });
    }
    getPaysById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pays = yield this.paysService.getPaysById(id);
                if (!pays) {
                    throw new Error("Pays not found");
                }
                return pays;
            }
            catch (error) {
                console.error("Error in getPaysById query:", error);
                throw new Error("Une erreur s'est produite lors de la récupération du pays.");
            }
        });
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
