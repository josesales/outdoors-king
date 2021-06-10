import { merge } from 'lodash';
import userResolver from "./user/userResolver";
import productResolver from './product/productResolver';

//merge all the resolver into one rootResolver
const rootResolver = merge(userResolver, productResolver);

export default rootResolver;