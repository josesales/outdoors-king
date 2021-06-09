const categorySchema = `#graphql

        type Profile {
            id: Int
            name: String    
        }

        input ProfileInput {
            id: Int
            name: String
        }

    `;

export default categorySchema;