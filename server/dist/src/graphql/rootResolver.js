"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var userResolver_1 = __importDefault(require("./user/userResolver"));
var productResolver_1 = __importDefault(require("./product/productResolver"));
var categoryResolver_1 = __importDefault(require("./category/categoryResolver"));
var checkoutResolver_1 = __importDefault(require("./checkout/checkoutResolver"));
//merge all the resolver into one rootResolver
var rootResolver = lodash_1.merge(userResolver_1.default, productResolver_1.default, categoryResolver_1.default, checkoutResolver_1.default);
exports.default = rootResolver;
