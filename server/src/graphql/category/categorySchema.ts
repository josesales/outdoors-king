
const categorySchema = {

    types: `#graphql
        type Category {
                id: String
                name: String  
                products: [Product]  
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