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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const user_service_1 = __importDefault(require("../services/user.service"));
const user_entity_1 = require("../entities/user.entity");
const user_input_1 = require("../resolvers/user.input");
const utilities_1 = require("../lib/utilities");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_types_1 = require("./user.types");
const login_input_1 = require("./login.input");
let UserResolver = class UserResolver {
    constructor() {
        this.userService = new user_service_1.default();
    }
    async listUsers() {
        try {
            return await this.userService.listUsers();
        }
        catch (error) {
            console.error("Error listing users:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des utilisateurs.");
        }
    }
    async getUserById(id) {
        try {
            return await this.userService.getUserById(id);
        }
        catch (error) {
            console.error("Error getting user by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération de l'utilisateur.");
        }
    }
    async login(input) {
        const { email, password } = input;
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new Error("Cet utilisateur n'existe pas");
            }
            const match = await bcrypt_1.default.compare(password, user.password);
            if (!match) {
                throw new Error("Vérifiez vos informations");
            }
            const token = (0, utilities_1.generateToken)({ email });
            return {
                user: {
                    fullname: user.fullname,
                    email: user.email,
                    id: user.id
                },
                token
            };
        }
        catch (error) {
            console.error('Error during login:', error);
            throw new Error("Une erreur s'est produite lors de la connexion.");
        }
    }
    async addUser(input) {
        try {
            console.log("Input received in resolver:", input);
            console.log("UserService instance:", this.userService);
            const result = await this.userService.addUser(input);
            console.log("Result from service:", result);
            return result.user;
        }
        catch (error) {
            console.error("Error adding user in resolver:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
        }
    }
    async updateUser(id, input) {
        try {
            return await this.userService.updateUser(id, input);
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Une erreur s'est produite lors de la mise à jour de l'utilisateur.");
        }
    }
    async deleteUser(id) {
        try {
            return await this.userService.deleteUser(id);
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [user_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "listUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_types_1.LoginResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.ILoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)("input", () => user_input_1.IAddUser)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.IAddUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("input", () => user_input_1.IUpdateUser)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_input_1.IUpdateUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.default = UserResolver;
