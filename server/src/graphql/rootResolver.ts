import { merge } from 'lodash';
import userResolver from "./user/userResolver";
import productResolver from './product/productResolver';
import categoryResolver from './category/categoryResolver';
import checkoutResolver from './checkout/checkoutResolver';

//merge all the resolver into one rootResolver
const rootResolver: any = merge(userResolver, productResolver, categoryResolver, checkoutResolver);

export default rootResolver;