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
var apollo_server_errors_1 = require("apollo-server-errors");
var userUtil_1 = require("./userUtil");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var permission_1 = require("../../permissions/permission");
var userResolver = {
    Query: {
        user: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    permission_1.validateAuthenticatedUser(context);
                    return [2 /*return*/, context.user];
                }
                catch (error) {
                    throw new apollo_server_errors_1.ApolloError('Error while fetching user: ' + error.message, 'INTERNAL_SERVER_ERROR');
                }
                return [2 /*return*/];
            });
        }); },
        login: function (parent, _a, context) {
            var loginInput = _a.loginInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, isPasswordRight, _b, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 4, , 5]);
                            if (!loginInput) {
                                throw new apollo_server_errors_1.UserInputError('Please provide inputs');
                            }
                            return [4 /*yield*/, context.prisma.user.findUnique({
                                    where: {
                                        email: loginInput === null || loginInput === void 0 ? void 0 : loginInput.email
                                    },
                                    include: {
                                        profile: true
                                    }
                                })];
                        case 1:
                            user = _c.sent();
                            if (!user) {
                                throw new apollo_server_errors_1.UserInputError('Invalid Credentials');
                            }
                            return [4 /*yield*/, bcryptjs_1.default.compare(loginInput.password, user.password)];
                        case 2:
                            isPasswordRight = _c.sent();
                            if (!isPasswordRight) {
                                throw new apollo_server_errors_1.UserInputError('Invalid Credentials');
                            }
                            _b = user;
                            return [4 /*yield*/, userUtil_1.generateToken(loginInput.email, user.id, context)];
                        case 3:
                            _b.token = _c.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_1 = _c.sent();
                            return [2 /*return*/, new apollo_server_errors_1.ApolloError(error_1.message, 'INTERNAL_SERVER_ERROR')];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        logout: function (_, _a, context) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            if (!id) {
                                throw new apollo_server_errors_1.UserInputError('Please provide inputs');
                            }
                            return [4 /*yield*/, context.prisma.user.update({
                                    data: {
                                        token: null
                                    },
                                    where: {
                                        id: id
                                    },
                                })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new apollo_server_errors_1.UserInputError('Invalid Inputs');
                            }
                            return [2 /*return*/, true];
                        case 2:
                            error_2 = _b.sent();
                            console.log(error_2.message);
                            throw new apollo_server_errors_1.ApolloError(error_2.message, error_2.code ? error_2.code :
                                'INTERNAL_SERVER_ERROR');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        sendPasswordEmail: function (_, _a, context) {
            var email = _a.email;
            return __awaiter(void 0, void 0, void 0, function () {
                var userDB, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            if (!email) {
                                throw new apollo_server_errors_1.UserInputError('Please provide email');
                            }
                            return [4 /*yield*/, context.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            userDB = _b.sent();
                            if (!userDB) {
                                throw new apollo_server_errors_1.UserInputError('Email is not in the system');
                            }
                            return [4 /*yield*/, userUtil_1.sendPasswordEmail(email, context)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_3 = _b.sent();
                            throw new apollo_server_errors_1.ApolloError(error_3.message, 'INTERNAL_SERVER_ERROR');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        confirmPasswordResetCode: function (_, _a, context) {
            var email = _a.email, code = _a.code;
            return __awaiter(void 0, void 0, void 0, function () {
                var passwordReset, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, context.prisma.passwordReset.findFirst({
                                    where: {
                                        code: code,
                                        user: {
                                            email: email
                                        }
                                    },
                                    include: {
                                        user: true,
                                    }
                                })];
                        case 1:
                            passwordReset = _b.sent();
                            if (!passwordReset) {
                                throw new apollo_server_errors_1.UserInputError('Invalid Code');
                            }
                            return [2 /*return*/, passwordReset.user];
                        case 2:
                            error_4 = _b.sent();
                            throw new apollo_server_errors_1.ApolloError(error_4.message, 'INTERNAL_SERVER_ERROR');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
    },
    Mutation: {
        saveUser: function (_, _a, context) {
            var userInput = _a.userInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var password, profileId, profileName, profile, upsertData, user, _b, error_5;
                var _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 8, , 9]);
                            if (!userInput) {
                                throw new apollo_server_errors_1.UserInputError('Please provide inputs');
                            }
                            if (userInput.id) {
                                permission_1.validateAuthenticatedUser(context);
                            }
                            return [4 /*yield*/, userUtil_1.validate(userInput, context)];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, userUtil_1.hashPassword(userInput.password)];
                        case 2:
                            password = _e.sent();
                            profileId = '';
                            profileName = 'client';
                            if (!(((_d = (_c = userInput.profile) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === 'admin')) return [3 /*break*/, 4];
                            return [4 /*yield*/, permission_1.validateAdminUser(context)];
                        case 3:
                            _e.sent();
                            profileName = 'admin';
                            _e.label = 4;
                        case 4: return [4 /*yield*/, context.prisma.profile.findUnique({
                                where: {
                                    name: profileName
                                }
                            })];
                        case 5:
                            profile = _e.sent();
                            profileId = profile === null || profile === void 0 ? void 0 : profile.id;
                            upsertData = {
                                name: userInput.name,
                                email: userInput.email,
                                password: password,
                                profile: {
                                    connect: {
                                        id: profileId
                                    }
                                }
                            };
                            return [4 /*yield*/, context.prisma.user.upsert({
                                    create: upsertData,
                                    update: upsertData,
                                    where: {
                                        id: userInput.id ? userInput.id : ''
                                    },
                                    include: {
                                        profile: true
                                    }
                                })];
                        case 6:
                            user = _e.sent();
                            _b = user;
                            return [4 /*yield*/, userUtil_1.generateToken(userInput.email, user.id, context)];
                        case 7:
                            _b.token = _e.sent();
                            return [2 /*return*/, user];
                        case 8:
                            error_5 = _e.sent();
                            throw new apollo_server_errors_1.ApolloError(error_5.message, error_5.code ? error_5.code :
                                'INTERNAL_SERVER_ERROR');
                        case 9: return [2 /*return*/];
                    }
                });
            });
        },
        resetPassword: function (_, _a, context) {
            var newPassword = _a.newPassword, userInput = _a.userInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var password, id, name_1, email, user, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            if (!newPassword || !userInput) {
                                throw new apollo_server_errors_1.UserInputError('Please provide inputs');
                            }
                            return [4 /*yield*/, userUtil_1.hashPassword(newPassword)];
                        case 1:
                            password = _b.sent();
                            id = userInput.id, name_1 = userInput.name, email = userInput.email;
                            if (!id || !name_1 || !email) {
                                throw new apollo_server_errors_1.UserInputError('Please provide inputs');
                            }
                            return [4 /*yield*/, context.prisma.user.update({
                                    data: {
                                        password: password
                                    },
                                    where: {
                                        passwordResetKey: { id: id, name: name_1, email: email }
                                    },
                                })];
                        case 2:
                            user = _b.sent();
                            if (!user) {
                                throw new apollo_server_errors_1.UserInputError('Invalid Inputs');
                            }
                            return [2 /*return*/, true];
                        case 3:
                            error_6 = _b.sent();
                            throw new apollo_server_errors_1.ApolloError(error_6.message, error_6.code ? error_6.code :
                                'INTERNAL_SERVER_ERROR');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
    },
};
exports.default = userResolver;
