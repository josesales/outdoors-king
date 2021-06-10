
const categorySchema = {

    types: `#graphql
        type Category {
                id: Int
                name: String    
            }
    `,

    inputs: `#graphql
        input CategoryInput {
                id: Int
                name: String
            }
    `,

    queries: ``,

    mutations: ``,
}

export default categorySchema;