import { gql } from "graphql-request";



export const categoriesQuery = (
    {
        queryName: 'categories',
        query: gql`
            query categoriesQuery {
                categories {
                    id
                    name
                }
        
            }
        `
    }
);