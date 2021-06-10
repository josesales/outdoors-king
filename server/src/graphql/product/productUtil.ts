import { ProductInput } from "../generated/graphql-server";
import { UserInputError } from "apollo-server-errors";


export const validate = async (productInput: ProductInput) => {

    if (!productInput?.name) {
        throw new UserInputError('Name is mandatory');
    }

    if (!productInput?.price) {
        throw new UserInputError('Price is mandatory');
    }

    if (!productInput?.category || !productInput?.category.id) {
        throw new UserInputError('Category is mandatory');
    }
}