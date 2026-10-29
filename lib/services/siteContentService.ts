import { API_BASE_URL } from '@/config/enpoints';

export type PublicSiteContentKey = 'about_hero' | 'events_page' | 'blogs_page' | 'team_hero';

export interface PublicSiteContent {
  value: Record<string, unknown>;
}

export async function getPublicSiteContent(
  key: PublicSiteContentKey,
): Promise<PublicSiteContent> {
  const response = await fetch(`${API_BASE_URL}/site-content/${key}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load site content: ${key}`);
  }

  return response.json() as Promise<PublicSiteContent>;
}
