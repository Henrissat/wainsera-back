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
exports.Region = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const appellation_entity_1 = require("./appellation.entity");
const pays_entity_1 = require("./pays.entity");
const bouteille_entity_1 = require("./bouteille.entity");
let Region = class Region {
};
exports.Region = Region;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Region.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Region.prototype, "nom_region", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Region.prototype, "min_garde", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Region.prototype, "max_garde", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => pays_entity_1.Pays, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => pays_entity_1.Pays, pays => pays.regions, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "paysId" }),
    __metadata("design:type", pays_entity_1.Pays)
], Region.prototype, "pays", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [bouteille_entity_1.Bouteille], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => bouteille_entity_1.Bouteille, bouteille => bouteille.region),
    __metadata("design:type", Array)
], Region.prototype, "bouteilles", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [appellation_entity_1.Appellation], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => appellation_entity_1.Appellation, appellation => appellation.region),
    __metadata("design:type", Array)
], Region.prototype, "appellations", void 0);
exports.Region = Region = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Region);
