
const profileSchema = {

    types: `#graphql

        type Profile {
            id: String
            name: String    
        }
    `,

    inputs: `#graphql
    
        input ProfileInput {
            id: String
            name: String
        }
    `,

    queries: ``,

    mutations: ``,
}

export default profileSchema;