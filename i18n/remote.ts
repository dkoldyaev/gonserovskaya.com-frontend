import { i18nService } from '@/services';

export { type Locale } from '@/services';
export const getI18n = i18nService.getLocales.bind(i18nService);


