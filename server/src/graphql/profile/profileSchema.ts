
const profileSchema = {

    types: `#graphql

        type Profile {
            id: Int
            name: String    
        }
    `,

    inputs: `#graphql
    
        input ProfileInput {
            id: Int
            name: String
        }
    `,

    queries: ``,

    mutations: ``,
}

export default profileSchema;