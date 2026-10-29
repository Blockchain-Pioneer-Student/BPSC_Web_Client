import { useEffect, useState } from 'react';
import {
  getPublicSiteContent,
  type PublicSiteContentKey,
} from '@/lib/services/siteContentService';

export function useSiteContent(key: PublicSiteContentKey) {
  const [value, setValue] = useState<Record<string, unknown>>({});

  useEffect(() => {
    let isCurrent = true;

    getPublicSiteContent(key)
      .then((content) => {
        if (isCurrent) setValue(content.value ?? {});
      })
      .catch((error) => {
        console.error(`Could not load site content for ${key}`, error);
      });

    return () => {
      isCurrent = false;
    };
  }, [key]);

  return value;
}
