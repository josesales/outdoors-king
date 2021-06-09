
const userSchema = `#graphql

        type User {
            id: Int
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

        input UserInput {
            id: Int
            email: String    
            name: String
            password: String
            profile: ProfileInput

        }

        input LoginInput {
            email: String!    
            password: String!
        }

        type Query {
            users: [User!]!
            user(userInput: UserInput!): User
            login(loginInput: LoginInput): Auth
            sendPasswordEmail(email: String!): Boolean
            confirmPasswordResetCode(email: String!, code: Int!): User
        }
   
        type Mutation {
            createUser(userInput: UserInput!): User
            resetPassword(newPassword: String! userInput: UserInput!): Boolean
        }
    `;



export default userSchema;