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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avis = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const bouteille_entity_1 = require("./bouteille.entity");
const typeVin_entity_1 = require("./typeVin.entity");
let Avis = class Avis {
};
exports.Avis = Avis;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Avis.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => typeVin_entity_1.TypeVin, { nullable: true }),
    (0, typeorm_1.OneToOne)(() => typeVin_entity_1.TypeVin, { nullable: true, eager: true }),
    __metadata("design:type", typeVin_entity_1.TypeVin)
], Avis.prototype, "type_vin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bouteille_entity_1.Bouteille, bouteille => bouteille.avis),
    __metadata("design:type", bouteille_entity_1.Bouteille)
], Avis.prototype, "bouteille", void 0);
exports.Avis = Avis = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Avis);
