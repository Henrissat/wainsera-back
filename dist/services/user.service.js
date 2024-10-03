"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const datasource_1 = __importDefault(require("../lib/datasource"));
const user_entity_1 = require("../entities/user.entity");
const utilities_1 = require("../lib/utilities");
class UserService {
    constructor() {
        this.db = datasource_1.default.getRepository(user_entity_1.User);
    }
    async listUsers() {
        try {
            const users = await this.db.find();
            return users;
        }
        catch (error) {
            console.error("Error listing users:", error);
            throw new Error("Une erreur s'est produite lors de la récupération des utilisateurs.");
        }
    }
    async getUserById(id) {
        try {
            return await this.db.findOne({ where: { id } });
        }
        catch (error) {
            console.error("Error getting user by ID:", error);
            throw new Error("Une erreur s'est produite lors de la récupération de l'utilisateur.");
        }
    }
    async getUserByEmail(email) {
        if (email) {
            return await this.db.findOneBy({ email });
        }
        else {
            return null;
        }
    }
    async addUser(input) {
        try {
            console.log("Input received:", input);
            const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
            console.log("Password hashed:", hashedPassword);
            const user = await this.db.save({
                fullname: input.fullname,
                email: input.email,
                password: hashedPassword,
            });
            console.log("User saved:", user);
            const token = (0, utilities_1.generateToken)({ email: user.email });
            console.log("Token generated:", token);
            return { user, token };
        }
        catch (error) {
            console.error("Error adding user in service:", error);
            throw new Error("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
        }
    }
    async updateUser(id, { fullname, email, password }) {
        console.log('Updating user with ID:', id);
        try {
            const existingUser = await this.db.findOne({ where: { id } });
            if (!existingUser) {
                throw new Error("User not found");
            }
            if (fullname !== undefined) {
                existingUser.fullname = fullname;
            }
            if (email !== undefined) {
                existingUser.email = email;
            }
            if (password !== undefined) {
                existingUser.password = password;
            }
            return await this.db.save(existingUser);
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Une erreur s'est produite lors de la mise à jour de l'utilisateur.");
        }
    }
    async deleteUser(id) {
        console.log('Deleting user with ID:', id);
        try {
            const existingUser = await this.db.findOne({ where: { id } });
            if (!existingUser) {
                throw new Error("User not found");
            }
            await this.db.remove(existingUser);
            return true;
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
        }
    }
}
exports.default = UserService;
