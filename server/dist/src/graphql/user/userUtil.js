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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordEmail = exports.generateToken = exports.hashPassword = exports.validate = void 0;
var apollo_server_errors_1 = require("apollo-server-errors");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mail_1 = __importDefault(require("@sendgrid/mail"));
var validate = function (userInput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var userDB;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (userInput.id && context.user && userInput.id !== context.user.id) {
                    throw new apollo_server_errors_1.UserInputError('You can only update your own user');
                }
                if (!(userInput === null || userInput === void 0 ? void 0 : userInput.name)) {
                    throw new apollo_server_errors_1.UserInputError('Name is mandatory');
                }
                if (!(userInput === null || userInput === void 0 ? void 0 : userInput.email)) {
                    throw new apollo_server_errors_1.UserInputError('Email is mandatory');
                }
                if (!userInput.password) {
                    throw new apollo_server_errors_1.UserInputError('Password is mandatory');
                }
                return [4 /*yield*/, context.prisma.user.findUnique({
                        where: { email: userInput.email },
                    })];
            case 1:
                userDB = _a.sent();
                if (userDB && userDB.id !== userInput.id) {
                    throw new apollo_server_errors_1.UserInputError('Another user with this email already exists');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.validate = validate;
var hashPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (password && password.length < 4) {
                    throw new apollo_server_errors_1.UserInputError('Password should have at least 4 characters');
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 8)];
            case 1:
                hashedPassword = _a.sent();
                return [2 /*return*/, hashedPassword];
        }
    });
}); };
exports.hashPassword = hashPassword;
var generateToken = function (email, userId, context) { return __awaiter(void 0, void 0, void 0, function () {
    var jwtKey, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jwtKey = process.env.JWT_KEY;
                token = jsonwebtoken_1.default.sign({ email: email, userId: userId }, jwtKey, { expiresIn: '1h' });
                return [4 /*yield*/, context.prisma.user.update({
                        data: {
                            token: token
                        },
                        where: {
                            id: userId
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, token];
        }
    });
}); };
exports.generateToken = generateToken;
var sendPasswordEmail = function (email, context) { return __awaiter(void 0, void 0, void 0, function () {
    var user, code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.prisma.user.findUnique({
                    where: { email: email },
                })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new apollo_server_errors_1.UserInputError('Email not found');
                }
                code = Math.round(100000 + Math.random() * 900000);
                mail_1.default.setApiKey(process.env.SENDGRIP_API_KEY);
                return [4 /*yield*/, mail_1.default.send({
                        to: email,
                        from: 'salesbass@gmail.com',
                        subject: 'Outdoors King - Password Reset',
                        text: "Hello " + ((user === null || user === void 0 ? void 0 : user.name) ? user.name : 'user') + ".Your code to reset your password is " + code + "."
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, context.prisma.passwordReset.upsert({
                        create: {
                            userId: user.id,
                            code: code
                        },
                        update: {
                            code: code
                        },
                        where: {
                            userId: user.id
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.sendPasswordEmail = sendPasswordEmail;