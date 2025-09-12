import 'server-only';
import { apiClient } from './api-client';
import { TPageApiResponse, TPageData } from '@/types/api-response';

export class PageService {
  async getAllPages(): Promise<TPageApiResponse> {
    const params = {
      pagination: {
        page: 1,
        pageSize: 1000,
      },
    };

    return apiClient.get<TPageApiResponse>('/api/pages/', params);
  }

  async getPageBySlug(slug: string[], locale: string): Promise<TPageData | undefined> {
    const params = {
      locale,
      filters: {
        url: {
          $eq: `/${(slug || ['projects']).join('/')}`
        }
      },
      populate: [
        'cover',
        'seo.og_image',
        'seo.twitter_card',
        'seo.twitter_image',
        'content',
        'content.image',
        'content.file',
        'content.file.file',
        'content.images',
        'content.images.image',
        'content.pages',
        'content.pages.cover'
      ]
    };

    const response = await apiClient.get<TPageApiResponse>('/api/pages', params);
    return response.data[0];
  }
}

export const pageService = new PageService();
