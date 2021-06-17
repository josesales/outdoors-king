import { gql } from "graphql-request";

const allFields = `
    id
    token
    email
    name
    profile {
        id
        name
    }
`;


export const loginQuery = (selectedFields?: string) => (
    {
        queryName: 'login',
        query: gql`
            query loginQuery($loginInput: LoginInput) {
                login(loginInput: $loginInput) {
                    ${selectedFields ? selectedFields : allFields}
                }
        
            }
        `
    }
);

export const logoutQuery = () => (
    {
        queryName: 'logout',
        query: gql`
            query logoutQuery($id: String) {
                logout(id: $id)
            }
        `
    }
);

export const saveUserMutation = (selectedFields?: string) => (
    {
        queryName: 'saveUser',
        query: gql`
            mutation saveUserMutation($userInput: UserInput!) {
                saveUser(userInput: $userInput) {
                    ${selectedFields ? selectedFields : allFields}
                }
            }
        `
    }
);
