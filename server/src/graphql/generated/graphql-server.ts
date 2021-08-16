import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};


export type Auth = {
  __typename?: 'Auth';
  user: User;
  token: Scalars['String'];
  tokenExpiration: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Cart = {
  __typename?: 'Cart';
  id?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  cartProducts?: Maybe<Array<Maybe<CartProduct>>>;
};

export type CartProduct = {
  __typename?: 'CartProduct';
  id?: Maybe<Scalars['String']>;
  cart?: Maybe<Cart>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
};

/** graphql */
export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Product>>>;
};

/** graphql */
export type CategoryInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Checkout = {
  __typename?: 'Checkout';
  tokenId: Scalars['String'];
  amount: Scalars['Float'];
};

/** graphql */
export type CheckoutInput = {
  tokenId: Scalars['String'];
  amount: Scalars['Float'];
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  saveUser?: Maybe<User>;
  resetPassword?: Maybe<Scalars['Boolean']>;
  /** graphql */
  saveProduct?: Maybe<Product>;
  deleteProduct?: Maybe<Scalars['Boolean']>;
  imageUpload?: Maybe<Scalars['Boolean']>;
  /** graphql */
  checkout?: Maybe<Scalars['Boolean']>;
};


export type MutationSaveUserArgs = {
  userInput: UserInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  userInput: UserInput;
};


export type MutationSaveProductArgs = {
  productInput: ProductInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationImageUploadArgs = {
  id: Scalars['String'];
  base64Image: Scalars['String'];
};


export type MutationCheckoutArgs = {
  checkoutInput: CheckoutInput;
};

export type Product = {
  __typename?: 'Product';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  category?: Maybe<Category>;
  image?: Maybe<Scalars['Upload']>;
};

/** graphql */
export type ProductInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  category?: Maybe<CategoryInput>;
};

export type Profile = {
  __typename?: 'Profile';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ProfileInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** graphql */
  user?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  sendPasswordEmail?: Maybe<Scalars['Boolean']>;
  confirmPasswordResetCode?: Maybe<User>;
  /** graphql */
  products: Array<Product>;
  product?: Maybe<Product>;
  /** graphql */
  categories: Array<Category>;
  /** graphql */
  cart?: Maybe<Cart>;
};


export type QueryLoginArgs = {
  loginInput?: Maybe<LoginInput>;
};


export type QueryLogoutArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QuerySendPasswordEmailArgs = {
  email: Scalars['String'];
};


export type QueryConfirmPasswordResetCodeArgs = {
  email: Scalars['String'];
  code: Scalars['Int'];
};


export type QueryProductsArgs = {
  productInput?: Maybe<ProductInput>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


/** graphql */
export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
};

/** graphql */
export type UserInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<ProfileInput>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<Auth>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CacheControlScope: CacheControlScope;
  Cart: ResolverTypeWrapper<Cart>;
  CartProduct: ResolverTypeWrapper<CartProduct>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  Checkout: ResolverTypeWrapper<Checkout>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CheckoutInput: CheckoutInput;
  File: ResolverTypeWrapper<File>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileInput: ProfileInput;
  Query: ResolverTypeWrapper<{}>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: Auth;
  String: Scalars['String'];
  Int: Scalars['Int'];
  Cart: Cart;
  CartProduct: CartProduct;
  Category: Category;
  CategoryInput: CategoryInput;
  Checkout: Checkout;
  Float: Scalars['Float'];
  CheckoutInput: CheckoutInput;
  File: File;
  LoginInput: LoginInput;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Product: Product;
  ProductInput: ProductInput;
  Profile: Profile;
  ProfileInput: ProfileInput;
  Query: {};
  Upload: Scalars['Upload'];
  User: User;
  UserInput: UserInput;
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenExpiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  cartProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['CartProduct']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartProduct'] = ResolversParentTypes['CartProduct']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Checkout'] = ResolversParentTypes['Checkout']> = {
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  saveUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSaveUserArgs, 'userInput'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPassword' | 'userInput'>>;
  saveProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationSaveProductArgs, 'productInput'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  imageUpload?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationImageUploadArgs, 'id' | 'base64Image'>>;
  checkout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCheckoutArgs, 'checkoutInput'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Upload']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryLoginArgs, never>>;
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryLogoutArgs, never>>;
  sendPasswordEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QuerySendPasswordEmailArgs, 'email'>>;
  confirmPasswordResetCode?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryConfirmPasswordResetCodeArgs, 'email' | 'code'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsArgs, never>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  CartProduct?: CartProductResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Checkout?: CheckoutResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;