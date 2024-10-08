"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRights = exports.getUserFromToken = exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const SECRET_KEY = 'sdngzhfbjhsuygshbjfysgfbs';
//fonction permettant de générer un token
function generateToken(infos) {
    let token = jwt.sign(infos, SECRET_KEY, { expiresIn: '2h' });
    return token;
}
exports.generateToken = generateToken;
function getUserFromToken(authorization) {
    return new Promise((resolve, reject) => {
        if (authorization) {
            let token = authorization.split(" ")[1];
            try {
                jwt.verify(token, SECRET_KEY, async (err, payload) => {
                    let userLogged = await new user_service_1.default().getUserByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
                    resolve(userLogged);
                });
            }
            catch (err) {
                reject(err);
            }
        }
        else {
            resolve(null);
        }
    });
}
exports.getUserFromToken = getUserFromToken;
/**
 *
 * Méthode qui va venir s'alimenter petit à petit pour vos droits
 */
function checkRights(userLogged, rights) {
    if (!userLogged) {
        throw new Error("Vous devez être connectés");
    }
}
exports.checkRights = checkRights;
