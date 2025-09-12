import 'server-only';
import { dictionaryService } from '@/modules/dictionary';

export const getDictionary = dictionaryService.getDictionary.bind(dictionaryService);


