
import { request } from 'graphql-request'

export const sendRequest = async (reqData: { queryName: string, query: string }, variables: any) => {

    try {

        const { queryName, query } = reqData;
        let data = await request('http://localhost:5000/graphql', query, variables);

        data = data[queryName]
        return data;
    } catch (error) {
        const message = error?.response?.errors[0]?.message;
        throw new Error(message);
    }
}