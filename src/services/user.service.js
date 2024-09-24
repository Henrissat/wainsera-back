"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.db.find();
                return users;
            }
            catch (error) {
                console.error("Error listing users:", error);
                throw new Error("Une erreur s'est produite lors de la récupération des utilisateurs.");
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.findOne({ where: { id } });
            }
            catch (error) {
                console.error("Error getting user by ID:", error);
                throw new Error("Une erreur s'est produite lors de la récupération de l'utilisateur.");
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (email) {
                return yield this.db.findOneBy({ email });
            }
            else {
                return null;
            }
        });
    }
    addUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Input received:", input);
                const hashedPassword = yield bcrypt_1.default.hash(input.password, 10);
                console.log("Password hashed:", hashedPassword);
                const user = yield this.db.save({
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
        });
    }
    updateUser(id, { fullname, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Updating user with ID:', id);
            try {
                const existingUser = yield this.db.findOne({ where: { id } });
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
                return yield this.db.save(existingUser);
            }
            catch (error) {
                console.error("Error updating user:", error);
                throw new Error("Une erreur s'est produite lors de la mise à jour de l'utilisateur.");
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Deleting user with ID:', id);
            try {
                const existingUser = yield this.db.findOne({ where: { id } });
                if (!existingUser) {
                    throw new Error("User not found");
                }
                yield this.db.remove(existingUser);
                return true;
            }
            catch (error) {
                console.error("Error deleting user:", error);
                throw new Error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
            }
        });
    }
}
exports.default = UserService;
