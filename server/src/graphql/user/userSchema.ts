
const userSchema = `#graphql

        type User {
            id: Int
            email: String
            name: String
            password: String
            profile: Profile
        }
        
        type AuthData {
            userId: Int!
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

        type Query{
            users: [User!]!
            user(userInput: UserInput!): User!
            login(loginInput: LoginInput): AuthData!
        }
   
        type Mutation {
            createUser(userInput: UserInput): User
        }
    `;



export default userSchema;