"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_errors_1 = require("apollo-server-errors");
var productUtil_1 = require("./productUtil");
var permission_1 = require("../../permissions/permission");
var productResolver = {
    Query: {
        products: function (_, _a, context) {
            var productInput = _a.productInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var filter, products, error_1;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            filter = {};
                            if (productInput) {
                                filter = productInput;
                                if ((_b = productInput.name) === null || _b === void 0 ? void 0 : _b.trim()) {
                                    filter = __assign(__assign({}, filter), { name: { contains: productInput.name.toLowerCase() } });
                                }
                            }
                            return [4 /*yield*/, context.prisma.product.findMany({
                                    where: filter,
                                    include: {
                                        category: true
                                    }
                                })];
                        case 1:
                            products = _c.sent();
                            return [2 /*return*/, products];
                        case 2:
                            error_1 = _c.sent();
                            throw new apollo_server_errors_1.ApolloError('Error while fetching products: ' + error_1.message, 'INTERNAL_SERVER_ERROR');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        product: function (_, _a, context) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var product, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, context.prisma.product.findUnique({
                                    where: {
                                        id: id
                                    },
                                    include: {
                                        category: true
                                    }
                                })];
                        case 1:
                            product = _b.sent();
                            if (!product) {
                                throw new apollo_server_errors_1.UserInputError('Product not found');
                            }
                            return [2 /*return*/, product];
                        case 2:
                            error_2 = _b.sent();
                            throw new apollo_server_errors_1.ApolloError('Error while fetching product: ' + error_2.message, 'INTERNAL_SERVER_ERROR');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
    },
    Mutation: {
        saveProduct: function (_, _a, context) {
            var productInput = _a.productInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var categoryId, upsertData, product, error_3;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, permission_1.validateAdminUser(context)];
                        case 1:
                            _c.sent();
                            if (!productInput) {
                                throw new apollo_server_errors_1.UserInputError('Please provide inputs');
                            }
                            return [4 /*yield*/, productUtil_1.validate(productInput)];
                        case 2:
                            _c.sent();
                            categoryId = (_b = productInput.category) === null || _b === void 0 ? void 0 : _b.id;
                            upsertData = {
                                name: productInput.name.toLowerCase(),
                                price: productInput.price,
                                category: {
                                    connect: {
                                        id: categoryId
                                    }
                                }
                            };
                            return [4 /*yield*/, context.prisma.product.upsert({
                                    create: upsertData,
                                    update: upsertData,
                                    where: {
                                        id: productInput.id ? productInput.id : ''
                                    },
                                    include: {
                                        category: true
                                    }
                                })];
                        case 3:
                            product = _c.sent();
                            return [2 /*return*/, product];
                        case 4:
                            error_3 = _c.sent();
                            throw new apollo_server_errors_1.ApolloError(error_3.message, error_3.code ? error_3.code :
                                'INTERNAL_SERVER_ERROR');
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        deleteProduct: function (_, _a, context) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var product, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, permission_1.validateAdminUser(context)];
                        case 1:
                            _b.sent();
                            if (!id) {
                                throw new apollo_server_errors_1.UserInputError('Please provide inputs');
                            }
                            return [4 /*yield*/, context.prisma.product.delete({
                                    where: {
                                        id: id
                                    }
                                })];
                        case 2:
                            product = _b.sent();
                            if (product) {
                                return [2 /*return*/, true];
                            }
                            return [2 /*return*/, false];
                        case 3:
                            error_4 = _b.sent();
                            throw new apollo_server_errors_1.ApolloError(error_4.message, error_4.code ? error_4.code :
                                'INTERNAL_SERVER_ERROR');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        imageUpload: function (_, _a, context) {
            var id = _a.id, base64Image = _a.base64Image;
            return __awaiter(void 0, void 0, void 0, function () {
                var error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, permission_1.validateAdminUser(context)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, context.prisma.product.update({
                                    data: {
                                        image: base64Image
                                    },
                                    where: {
                                        id: id
                                    }
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_5 = _b.sent();
                            throw new apollo_server_errors_1.ApolloError(error_5.message, error_5.code ? error_5.code :
                                'INTERNAL_SERVER_ERROR');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
    }
};
exports.default = productResolver;
