import { ApolloError, UserInputError } from "apollo-server-errors";
import { Resolvers, Product } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import { validate } from "./productUtil";
import { validateAdminUser } from "../../permissions/permission";
import { orderBy } from "lodash";

const productResolver: Resolvers<Context> = {
  Query: {
    products: async (_, { productInput }, context): Promise<Product[]> => {
      try {
        let filter = {};

        if (productInput) {
          filter = productInput;

          if (productInput.name?.trim()) {
            filter = {
              ...filter,
              name: { contains: productInput.name.toLowerCase() },
            };
          }
        }

        const products: Product[] = await context.prisma.product.findMany({
          where: filter,
          include: {
            category: true,
          },
          orderBy: { name: "asc" },
        });

        return products;
      } catch (error) {
        if (error instanceof Error) {
          throw new ApolloError(
            "Error while fetching products: " + error.message,
            "INTERNAL_SERVER_ERROR"
          );
        }
        throw new ApolloError(
          "Unknown error occurred while fetching products",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    product: async (_, { id }, context): Promise<Product> => {
      try {
        const product = await context.prisma.product.findUnique({
          where: {
            id,
          },
          include: {
            category: true,
          },
        });

        if (!product) {
          throw new UserInputError("Product not found");
        }

        return product;
      } catch (error) {
        if (error instanceof Error) {
          throw new ApolloError(
            "Error while fetching product: " + error.message,
            "INTERNAL_SERVER_ERROR"
          );
        }
        throw new ApolloError(
          "Unknown error occurred while fetching products",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },

  Mutation: {
    saveProduct: async (_, { productInput }, context): Promise<Product> => {
      try {
        await validateAdminUser(context);

        if (!productInput) {
          throw new UserInputError("Please provide inputs");
        }

        await validate(productInput);

        const categoryId: string = productInput.category?.id!;

        const upsertData = {
          name: productInput.name!.toLowerCase(),
          price: +productInput.price!,
          description: productInput.description,
          category: {
            connect: {
              id: categoryId,
            },
          },
        };

        const product = await context.prisma.product.upsert({
          create: upsertData,
          update: upsertData,
          where: {
            id: productInput.id ? productInput.id : "",
          },
          include: {
            category: true,
          },
        });

        return product;
      } catch (error) {
        if (error instanceof ApolloError) {
          throw new ApolloError(
            error.message,
            error.code ? error.code : "INTERNAL_SERVER_ERROR"
          );
        }
        throw new ApolloError(
          "Unknown error occurred while saving product",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    deleteProduct: async (_, { id }, context): Promise<boolean> => {
      try {
        await validateAdminUser(context);

        if (!id) {
          throw new UserInputError("Please provide inputs");
        }

        const product = await context.prisma.product.delete({
          where: {
            id,
          },
        });

        if (product) {
          return true;
        }
        return false;
      } catch (error) {
        if (error instanceof ApolloError) {
          throw new ApolloError(
            error.message,
            error.code ? error.code : "INTERNAL_SERVER_ERROR"
          );
        }
        throw new ApolloError(
          "Unknown error occurred while deleting product",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    imageUpload: async (_, { id, base64Image }, context): Promise<boolean> => {
      try {
        await validateAdminUser(context);

        await context.prisma.product.update({
          data: {
            image: base64Image,
          },
          where: {
            id,
          },
        });

        return true;
      } catch (error) {
        if (error instanceof ApolloError) {
          throw new ApolloError(
            error.message,
            error.code ? error.code : "INTERNAL_SERVER_ERROR"
          );
        }
        throw new ApolloError(
          "Unknown error occurred while uploading image",
          "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },
};

export default productResolver;
