import { API_BASE_URL } from '@/config/enpoints';

// Types
export interface ContactContent {
  hero: { title: string; description: string };
  info: {
    title: string;
    address: string;
    email: string;
    phone: string;
    connect_title: string;
  };
  location: {
    title: string;
    description: string;
    map_embed_url: string;
    directions_label: string;
    directions_url: string;
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  socials: {
    facebook: string;
    linkedin: string;
    telegram: string;
    x: string;
    youtube: string;
  };
}

interface SiteContentEntry {
  key: string;
  value: Record<string, unknown>;
}

// Fallbacks used when the API is unreachable or a field is left empty in admin
export const DEFAULT_CONTACT_CONTENT: ContactContent = {
  hero: {
    title: 'Contact',
    description:
      "Connect with Blockchain Pioneer Student Club — we're ready to listen and help",
  },
  info: {
    title: 'Contact information',
    address:
      'Blockchain Labs, University of Transport and Communications, 03 Cau Giay, Lang Ward, Hanoi, Vietnam',
    email: 'blockchainutc@gmail.com',
    phone: '+84 325045633',
    connect_title: 'Connect with us',
  },
  location: {
    title: 'Map',
    description: 'Find your way to Blockchain Pioneer Student',
    map_embed_url:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9265586961897!2d105.7999313!3d21.028513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab424a50fff9%3A0xbe3a7f3670c0a45f!2zVHLGsOG7nW5nIMSQYcyjaSBob8yjYyBHaWFvIHRob8yBbmcgVsOqzKNuIHRhzJlp!5e0!3m2!1svi!2s!4v1650123456789!5m2!1svi!2s',
    directions_label: 'Get directions',
    directions_url: 'https://goo.gl/maps/1234',
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Which days does the club usually operate?',
        answer:
          'We usually hold sessions on Wednesday evenings and Saturday mornings. Special events are announced on our media channels.',
      },
      {
        question: 'How can I join the club?',
        answer:
          'You can register via the online form on our website or contact the board directly via the provided email or phone number.',
      },
      {
        question: 'Do I need prior Blockchain knowledge?',
        answer:
          'No. We welcome all students passionate about Blockchain. We provide courses and workshops from beginner to advanced levels.',
      },
      {
        question: 'How to become a club partner?',
        answer:
          'Organizations interested in partnering can contact the board via email or fill out the contact form on our website.',
      },
    ],
  },
  socials: {
    facebook: 'https://www.facebook.com/bpsclub.utc',
    linkedin: 'https://www.linkedin.com/company/106421064/',
    telegram: '#',
    x: 'https://x.com/bps_club',
    youtube: 'https://www.youtube.com/@BlockchainPioneerStudent',
  },
};

// Overlay non-empty string fields from the API onto the defaults
function merge<T extends Record<string, string>>(
  defaults: T,
  value: Record<string, unknown> | undefined,
): T {
  const result = { ...defaults };
  if (!value) return result;

  for (const field of Object.keys(defaults) as (keyof T)[]) {
    const fieldValue = value[field as string];
    if (typeof fieldValue === 'string' && fieldValue.trim().length > 0) {
      result[field] = fieldValue as T[keyof T];
    }
  }
  return result;
}

export function buildContactContent(entries: SiteContentEntry[]): ContactContent {
  const byKey = new Map(entries.map((entry) => [entry.key, entry.value]));
  const defaults = DEFAULT_CONTACT_CONTENT;

  const faqValue = byKey.get('contact_faq');
  const faqItems = defaults.faq.items.map((item, index) =>
    merge({ question: item.question, answer: item.answer }, faqValue && {
      question: faqValue[`q${index + 1}`],
      answer: faqValue[`a${index + 1}`],
    }),
  );

  return {
    hero: merge(defaults.hero, byKey.get('contact_hero')),
    info: merge(defaults.info, byKey.get('contact_info')),
    location: merge(defaults.location, byKey.get('contact_location')),
    faq: {
      title: merge({ title: defaults.faq.title }, faqValue).title,
      items: faqItems,
    },
    socials: merge(defaults.socials, byKey.get('socials')),
  };
}

// API Service
export const siteContentService = {
  // Get contact page content (public endpoint), falling back to defaults on failure
  async getContactContent(init?: RequestInit): Promise<ContactContent> {
    try {
      const response = await fetch(`${API_BASE_URL}/site-content`, init);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const entries: SiteContentEntry[] = await response.json();
      return buildContactContent(Array.isArray(entries) ? entries : []);
    } catch (error) {
      console.error('Error fetching site content:', error);
      return DEFAULT_CONTACT_CONTENT;
    }
  },
};

export const siteContentUtils = {
  // "+84 325 045 633" -> "tel:+84325045633"
  toTelHref(phone: string): string {
    return `tel:${phone.replace(/[^\d+]/g, '')}`;
  },
};
