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
exports.IUser = exports.IAddUserInput = exports.IUpdateUser = exports.IAddUser = void 0;
//user.d.ts
const type_graphql_1 = require("type-graphql");
let IAddUser = class IAddUser {
};
exports.IAddUser = IAddUser;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IAddUser.prototype, "fullname", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IAddUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IAddUser.prototype, "password", void 0);
exports.IAddUser = IAddUser = __decorate([
    (0, type_graphql_1.InputType)()
], IAddUser);
let IUpdateUser = class IUpdateUser {
};
exports.IUpdateUser = IUpdateUser;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], IUpdateUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], IUpdateUser.prototype, "fullname", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], IUpdateUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], IUpdateUser.prototype, "password", void 0);
exports.IUpdateUser = IUpdateUser = __decorate([
    (0, type_graphql_1.InputType)()
], IUpdateUser);
let IAddUserInput = class IAddUserInput {
};
exports.IAddUserInput = IAddUserInput;
__decorate([
    (0, type_graphql_1.Field)(() => IAddUser),
    __metadata("design:type", IAddUser)
], IAddUserInput.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IAddUserInput.prototype, "token", void 0);
exports.IAddUserInput = IAddUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], IAddUserInput);
let IUser = class IUser {
};
exports.IUser = IUser;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IUser.prototype, "fullname", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IUser.prototype, "password", void 0);
exports.IUser = IUser = __decorate([
    (0, type_graphql_1.InputType)()
], IUser);
