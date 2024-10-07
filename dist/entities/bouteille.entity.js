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
exports.Bouteille = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const cuvee_entity_1 = require("./cuvee.entity");
const vin_entity_1 = require("./vin.entity");
const casier_entity_1 = require("./casier.entity");
const avis_entity_1 = require("./avis.entity");
const cepage_entity_1 = require("./cepage.entity");
const bouteilleCepage_entity_1 = require("./bouteilleCepage.entity");
const region_entity_1 = require("./region.entity");
const user_entity_1 = require("./user.entity");
const appellation_entity_1 = require("./appellation.entity");
let Bouteille = class Bouteille {
};
exports.Bouteille = Bouteille;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bouteille.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Bouteille.prototype, "millesime", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], Bouteille.prototype, "alcool", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Bouteille.prototype, "quantite", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], Bouteille.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], Bouteille.prototype, "note_perso", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Bouteille.prototype, "bouche", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Bouteille.prototype, "accord", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Bouteille.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Bouteille.prototype, "garde_apogee", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => cuvee_entity_1.Cuvee, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => cuvee_entity_1.Cuvee, cuvee => cuvee.bouteilles, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "cuveeId" }),
    __metadata("design:type", cuvee_entity_1.Cuvee)
], Bouteille.prototype, "cuvee", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => vin_entity_1.Vin, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => vin_entity_1.Vin, vin => vin.bouteilles, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "vinId" }),
    __metadata("design:type", vin_entity_1.Vin)
], Bouteille.prototype, "vin", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => appellation_entity_1.Appellation, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => appellation_entity_1.Appellation, appellation => appellation.bouteilles, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "appellationId" }),
    __metadata("design:type", appellation_entity_1.Appellation)
], Bouteille.prototype, "appellation", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [cepage_entity_1.Cepage], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => cepage_entity_1.Cepage, cepage => cepage.bouteilles),
    (0, typeorm_1.JoinTable)({
        name: "bouteilleCepage",
        joinColumn: {
            name: "bouteilleId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "cepageId",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Bouteille.prototype, "cepages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bouteilleCepage_entity_1.BouteilleCepage, bouteilleCepage => bouteilleCepage.bouteille),
    __metadata("design:type", Array)
], Bouteille.prototype, "bouteilleCepages", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => region_entity_1.Region, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, region => region.bouteilles, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "regionId" }),
    __metadata("design:type", region_entity_1.Region)
], Bouteille.prototype, "region", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => casier_entity_1.Casier, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => casier_entity_1.Casier, casier => casier.bouteilles, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "casierId" }),
    __metadata("design:type", casier_entity_1.Casier)
], Bouteille.prototype, "casier", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [avis_entity_1.Avis], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => avis_entity_1.Avis, avis => avis.bouteille),
    __metadata("design:type", Array)
], Bouteille.prototype, "avis", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.bouteilles, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.User)
], Bouteille.prototype, "user", void 0);
exports.Bouteille = Bouteille = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Bouteille);
