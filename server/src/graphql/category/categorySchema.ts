
const categorySchema = {

    types: `#graphql
        type Category {
                id: String
                name: String    
            }
    `,

    inputs: `#graphql
        input CategoryInput {
                id: String
                name: String
            }
    `,

    queries: `#graphql
        categories: [Category!]!`,

    mutations: ``,
}

export default categorySchema;