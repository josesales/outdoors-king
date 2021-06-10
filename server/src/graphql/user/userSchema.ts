
const userSchema = {

    types: `#graphql
        type User {
            id: String
            email: String
            name: String
            password: String
            profile: Profile
        }
        
        type Auth {
            user: User!
            token: String!
            tokenExpiration: Int!
        }
    `,

    inputs: `#graphql
        input UserInput {
            id: String
            email: String    
            name: String
            password: String
            profile: ProfileInput

        }

        input LoginInput {
            email: String!    
            password: String!
        }
    `,

    queries: `#graphql
        users: [User!]!
        user(userInput: UserInput!): User
        login(loginInput: LoginInput): Auth
        sendPasswordEmail(email: String!): Boolean
        confirmPasswordResetCode(email: String!, code: Int!): User
    `,

    mutations: `#graphql

        createUser(userInput: UserInput!): User
        resetPassword(newPassword: String! userInput: UserInput!): Boolean
    `,
}

export default userSchema;