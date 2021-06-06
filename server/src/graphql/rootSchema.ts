import userSchema from './user/userSchema';

const types: string[] = [];
const inputs: string[] = [];
const queries: string[] = [];
const mutations: string[] = [];

//each new schema should be included in the schemas array
const schemas = [userSchema];

//combine all types, inputs, queries and mutations from each schema object
schemas.forEach(schema => {

    // types.push(schema.types);
    // inputs.push(schema.inputs);
    // queries.push(schema.queries);
    // mutations.push(schema.mutations);
});

const rootSchema = `

    ${types.join('\n')}

    ${inputs.join('\n')}

    type Query {
        ${queries.join('\n')}
    }

    type rootMutation {
        ${mutations.join('\n')}
    }

    schema {
        query:RootQuery
        mutation:rootMutation
    }
`;

export default rootSchema;