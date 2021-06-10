
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

    queries: ``,

    mutations: ``,
}

export default categorySchema;