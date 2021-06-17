
const userSchema = {

    types: `#graphql
        type User {
            id: String
            email: String
            name: String
            password: String
            token: String
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
        user: User
        login(loginInput: LoginInput): User
        logout(id: String): Boolean
        sendPasswordEmail(email: String!): Boolean
        confirmPasswordResetCode(email: String!, code: Int!): User
    `,

    mutations: `#graphql

        saveUser(userInput: UserInput!): User
        resetPassword(newPassword: String! userInput: UserInput!): Boolean
    `,
}

export default userSchema;