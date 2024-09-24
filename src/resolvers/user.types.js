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
exports.LoginResponse = exports.LoginUser = void 0;
// user.types.ts
const type_graphql_1 = require("type-graphql");
let LoginUser = class LoginUser {
};
exports.LoginUser = LoginUser;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginUser.prototype, "fullname", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginUser.prototype, "email", void 0);
exports.LoginUser = LoginUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginUser);
let LoginResponse = class LoginResponse {
};
exports.LoginResponse = LoginResponse;
__decorate([
    (0, type_graphql_1.Field)(() => LoginUser),
    __metadata("design:type", LoginUser)
], LoginResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "token", void 0);
exports.LoginResponse = LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
