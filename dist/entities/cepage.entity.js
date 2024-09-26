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
exports.Cepage = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const bouteille_entity_1 = require("./bouteille.entity");
const bouteilleCepage_entity_1 = require("./bouteilleCepage.entity");
let Cepage = class Cepage {
};
exports.Cepage = Cepage;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cepage.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Cepage.prototype, "nom_cepage", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [bouteille_entity_1.Bouteille], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => bouteille_entity_1.Bouteille, bouteille => bouteille.cepages),
    __metadata("design:type", Array)
], Cepage.prototype, "bouteilles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bouteilleCepage_entity_1.BouteilleCepage, bouteilleCepage => bouteilleCepage.cepage),
    __metadata("design:type", Array)
], Cepage.prototype, "bouteilleCepages", void 0);
exports.Cepage = Cepage = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Cepage);
