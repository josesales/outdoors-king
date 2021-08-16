import { gql } from "graphql-request";

const allFields = `
    id
    name
    description
    price
    image
    category {
        id
        name
    }
`;

const allFieldsButImage = `
    id
    name
    description
    price
    image
    category {
        id
        name
    }
`;


export const productsQuery = (selectedFields?: string) => (
    {
        queryName: 'products',
        query: gql`
            query productsQuery($productInput: ProductInput!) {
                products(productInput: $productInput) {
                    ${selectedFields ? selectedFields : allFields}
                }
        
            }
        `
    }
);

export const productQuery = (selectedFields?: string) => (
    {
        queryName: 'product',
        query: gql`
            query productsQuery($id: String!) {
                product(id: $id) {
                    ${selectedFields ? selectedFields : allFields}
                }
        
            }
        `
    }
);

export const saveProductMutation = (selectedFields?: string) => (
    {
        queryName: 'saveProduct',
        query: gql`
            mutation saveProductMutation($productInput: ProductInput!) {
                saveProduct(productInput: $productInput) {
                    ${selectedFields ? selectedFields : allFieldsButImage}
                }
            }
        `
    }
);

export const deleteProductMutation = {
    queryName: 'deleteProduct',
    query: gql`
            mutation deleteProductMutation($id: String!) {
                deleteProduct(id: $id)
            }
        `
};

export const imageUploadMutation = {
    queryName: 'imageUpload',
    query: gql`
            mutation imageUploadMutation($id: String!, $base64Image: String!) {
                imageUpload(id: $id, base64Image: $base64Image)
            }
        `
};