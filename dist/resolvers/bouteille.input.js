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
exports.IUpdateBouteille = exports.IAddBouteille = void 0;
const type_graphql_1 = require("type-graphql");
let IAddBouteille = class IAddBouteille {
};
exports.IAddBouteille = IAddBouteille;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "millesime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "garde_apogee", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "alcool", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "quantite", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "note_perso", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IAddBouteille.prototype, "bouche", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IAddBouteille.prototype, "accord", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "vinId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [type_graphql_1.Int]),
    __metadata("design:type", Array)
], IAddBouteille.prototype, "cepageIds", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "regionId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], IAddBouteille.prototype, "cuveeNom", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IAddBouteille.prototype, "casierId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IAddBouteille.prototype, "userId", void 0);
exports.IAddBouteille = IAddBouteille = __decorate([
    (0, type_graphql_1.InputType)()
], IAddBouteille);
let IUpdateBouteille = class IUpdateBouteille {
};
exports.IUpdateBouteille = IUpdateBouteille;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "millesime", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "garde_apogee", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "alcool", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "quantite", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "note_perso", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IUpdateBouteille.prototype, "bouche", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IUpdateBouteille.prototype, "accord", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "vinId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [type_graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], IUpdateBouteille.prototype, "cepageIds", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "regionId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], IUpdateBouteille.prototype, "cuveeNom", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], IUpdateBouteille.prototype, "casierId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IUpdateBouteille.prototype, "userId", void 0);
exports.IUpdateBouteille = IUpdateBouteille = __decorate([
    (0, type_graphql_1.InputType)()
], IUpdateBouteille);
