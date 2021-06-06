import { merge } from 'lodash';
import userResolver from './user/userResolver';

// //merge all the resolver into one rootResolver
const rootResolver = merge(userResolver);

export default rootResolver;