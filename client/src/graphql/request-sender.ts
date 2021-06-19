
import { GraphQLClient } from 'graphql-request'

export const sendRequest = async (reqData: { queryName: string, query: string }, variables: any = null, token?: string) => {

    try {
        const client = new GraphQLClient('http://localhost:5000/graphql');

        const requestHeaders = {
            authorization: token ? `Bearer ${token}` : ''
        }

        const { queryName, query } = reqData;
        let data = await client.request(query, variables, requestHeaders);
        // let data = await request('http://localhost:5000/graphql', query, variables);

        data = data[queryName]
        return data;
    } catch (error) {
        const message = error?.response?.errors[0]?.message;
        throw new Error(message);
    }
}