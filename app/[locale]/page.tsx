import 'server-only';
import { generateMetadata as generateMetadataFn } from './[...slug]/page';
import Page from './[...slug]/page';

export default Page;
export const generateMetadata = generateMetadataFn;
