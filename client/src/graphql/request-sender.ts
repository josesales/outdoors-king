import { GraphQLClient } from "graphql-request";

const url = "https://outdoorsking.net/api/graphql";
// const url =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:5000/graphql"
//     : "https://outdoorsking.net/api/graphql";

export const sendRequest = async (
  reqData: { queryName: string; query: string },
  variables: any = null,
  token?: string
) => {
  try {
    const client = new GraphQLClient(url);

    const requestHeaders = {
      authorization: token ? `Bearer ${token}` : "",
    };

    const { queryName, query } = reqData;
    let data = await client.request(query, variables, requestHeaders);

    data = data[queryName];
    return data;
  } catch (error: any) {
    const message = error?.response?.errors[0]?.message;
    throw new Error(message);
  }
};
