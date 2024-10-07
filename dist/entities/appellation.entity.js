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
exports.Appellation = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const vin_entity_1 = require("./vin.entity");
const region_entity_1 = require("./region.entity");
const bouteille_entity_1 = require("./bouteille.entity");
let Appellation = class Appellation {
};
exports.Appellation = Appellation;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appellation.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Appellation.prototype, "nom_appellation", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [vin_entity_1.Vin], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => vin_entity_1.Vin, vin => vin.appellations),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Appellation.prototype, "vins", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => region_entity_1.Region, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, region => region.appellations, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", region_entity_1.Region)
], Appellation.prototype, "region", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => bouteille_entity_1.Bouteille, { nullable: true }),
    (0, typeorm_1.OneToMany)(() => bouteille_entity_1.Bouteille, bouteille => bouteille.appellation, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", bouteille_entity_1.Bouteille)
], Appellation.prototype, "bouteilles", void 0);
exports.Appellation = Appellation = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Appellation);
