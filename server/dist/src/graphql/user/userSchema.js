"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userSchema = {
    types: "#graphql\n        type User {\n            id: String\n            email: String\n            name: String\n            password: String\n            token: String\n            profile: Profile\n        }\n        \n        type Auth {\n            user: User!\n            token: String!\n            tokenExpiration: Int!\n        }\n    ",
    inputs: "#graphql\n        input UserInput {\n            id: String\n            email: String    \n            name: String\n            password: String\n            profile: ProfileInput\n\n        }\n\n        input LoginInput {\n            email: String!    \n            password: String!\n        }\n    ",
    queries: "#graphql\n        user: User\n        login(loginInput: LoginInput): User\n        logout(id: String): Boolean\n        sendPasswordEmail(email: String!): Boolean\n        confirmPasswordResetCode(email: String!, code: Int!): User\n    ",
    mutations: "#graphql\n\n        saveUser(userInput: UserInput!): User\n        resetPassword(newPassword: String! userInput: UserInput!): Boolean\n    ",
};
exports.default = userSchema;
