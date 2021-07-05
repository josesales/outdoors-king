import categorySchema from "./category/categorySchema";
import productSchema from "./product/productSchema";
import profileSchema from "./profile/profileSchema";
import userSchema from "./user/userSchema";
import checkoutSchema from "./checkout/checkoutSchema";
import cartSchema from "./cart/cartSchema";

const types: String[] = [];
const inputs: String[] = [];
const queries: String[] = [];
const mutations: String[] = [];

//each new schema should be included in the schemas array
const schemas = [userSchema, profileSchema, productSchema, categorySchema, checkoutSchema, cartSchema];

//combine all types, inputs, queries and mutations from each schema object
schemas.forEach(schema => {

    types.push(schema.types);
    inputs.push(schema.inputs);
    queries.push(schema.queries);
    mutations.push(schema.mutations);
});

const rootSchema = `

    ${types.join('\n')}

    ${inputs.join('\n')}

    type Query {
        ${queries.join('\n')}
    }

    type Mutation {
        ${mutations.join('\n')}
    }
`;

export default rootSchema;