import type { StaticImageData } from 'next/image';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TermsSection {
  title: string;
  items: string[];
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  date: string;
  time?: string;
  venue: string;
  description: string;
  image: string | StaticImageData;
  ticketStatus: string;
  ticketPrice?: string;
  ticketUrl?: string;
  highlights?: string[];
  faqs?: FaqItem[];
  terms?: TermsSection[];
}

export interface ExperienceItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
  stats: string;
}

export interface GalleryMoment {
  id: string;
  title: string;
  event: string;
  location: string;
  image: string | StaticImageData;
  caption: string;
  span?: 'tall' | 'wide' | 'normal';
}
