export interface BirthDetails {
  dateOfBirth: string; // e.g., "November 11, 1974"
  placeOfBirth: string; // e.g., "Los Angeles, California, USA"
  age: number;
  zodiacSign?: string;
  nationality: string;
}

export interface FamilyDetails {
  parents: string[];
  spouseOrPartner?: string;
  children?: string[];
  siblings?: string[];
  notableRelatives?: string[];
}

export interface CareerWork {
  id: string;
  title: string; // Movie name, Album name, Championship name, etc.
  year?: number;
  releaseDate?: string;
  roleOrDiscipline?: string; // e.g. "Lead Actor (Dom Cobb)", "Forward / Striker", "Studio Album"
  directorOrTeam?: string; // Director, Producer, Club/Team, Record Label
  category?: string; // Film, Series, Album, Single, Tournament
  genre?: string[];
  boxOfficeOrSales?: string;
  ratingOrScore?: string;
  posterUrl?: string;
  synopsis?: string;
}

export interface Film {
  id: string;
  movieName: string;
  releaseDate: string; // e.g., "July 16, 2010"
  year: number;
  role: string;
  director: string;
  genre: string[];
  boxOffice?: string;
  rating?: string; // IMDb rating e.g., "8.8"
  posterUrl: string;
  synopsis: string;
}

export interface Award {
  id: string;
  awardName: string; // e.g. "Academy Award (Oscar)", "Padma Shri", "Ballon d'Or"
  year: number;
  category: string; // e.g. "Best Actor in a Leading Role"
  project?: string; // e.g. "The Revenant"
  status: 'Won' | 'Nominated';
  iconType?: 'oscar' | 'golden-globe' | 'bafta' | 'grammy' | 'emmy' | 'trophy' | 'padma' | 'medal';
}

export interface CelebrityTitle {
  id: string;
  titleName: string; // e.g. "Padma Vibhushan", "Knight Bachelor", "Hollywood Walk of Fame Star"
  yearWon: number;
  conferredBy: string; // e.g. "Government of India", "British Monarchy"
  description: string;
}

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'X' | 'TikTok' | 'YouTube' | 'Facebook';
  handle: string;
  postDate: string;
  content: string;
  imageUrl?: string;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  isVerified?: boolean;
  postUrl?: string;
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
  category: 'Red Carpet' | 'Photoshoot' | 'Behind the Scenes' | 'Events' | 'Career Moments';
  source?: string;
}

export interface BookingCategory {
  id: 'brand' | 'event' | 'party' | 'speaking' | 'film';
  label: string;
  description: string;
}

export interface CelebritySource {
  title: string;
  url?: string;
  type?: 'wikipedia' | 'wikidata' | 'official' | 'imdb' | 'verified_archive';
}

// Lightweight directory record for search, filtering, and pagination
export interface CelebrityDirectoryItem {
  id: string;
  fullName: string;
  knownAs: string;
  aliases: string[]; // e.g. ["SRK", "King Khan"], ["CR7", "Ronaldo"], ["Virat", "King Kohli"]
  primaryProfession: string;
  occupations: string[];
  category: 'Actors' | 'Musicians' | 'Athletes' | 'Directors' | 'TV & Media' | 'Public Figures' | string;
  industry: 'Bollywood' | 'Hollywood' | 'Indian Cinema' | 'Indian Sports' | 'Global Sports' | 'Music' | 'K-Pop & Asian Pop' | 'Global Cinema' | 'European Cinema' | 'Latin Music' | string;
  country: string; // e.g. "India", "United States", "Portugal", "United Kingdom"
  nationality: string;
  avatarPhoto: string;
  bestViewPhoto: string;
  coverBannerUrl?: string;
  shortTagline: string;
  birthYear?: number;
  isVerified: boolean;
  trendingScore?: number;
  sourceProvenance?: 'Curated Directory' | 'Wikipedia & Wikidata' | 'Verified Knowledge Base' | 'AI Enriched' | string;
}

// Detailed full profile loaded when a celebrity is opened
export interface Celebrity {
  id: string; // e.g. "leonardo-dicaprio"
  fullName: string;
  knownAs: string;
  aliases?: string[];
  occupation: string[]; // e.g. ["Actor", "Producer", "Environmentalist"]
  primaryProfession?: string;
  category?: 'Actors' | 'Musicians' | 'Athletes' | 'Directors' | 'TV & Media' | 'Public Figures' | string;
  industry: 'Bollywood' | 'Hollywood' | 'Indian Cinema' | 'Indian Sports' | 'Global Sports' | 'Music' | 'European Cinema' | 'K-Pop & Asian Pop' | 'Latin Music' | 'Global Cinema' | string;
  country?: string;
  careerType?: 'actor' | 'musician' | 'athlete' | 'director' | 'public_figure' | string;
  
  bestViewPhoto: string; // High-res main portrait
  avatarPhoto: string;
  coverBannerUrl: string;
  shortTagline: string;
  isAvailableForHiring: boolean;
  activeYears: string;
  netWorth: string;
  height: string;
  
  birthDetails: BirthDetails;
  familyDetails: FamilyDetails;
  
  biography: {
    summary: string;
    earlyLife: string;
    careerHighlights: string;
    philanthropicWork: string;
    famousQuote?: string;
  };

  films: Film[];
  majorWorks?: CareerWork[];
  awards: Award[];
  titles: CelebrityTitle[];
  socialPosts: SocialPost[];
  gallery: PhotoGalleryItem[];
  sources?: CelebritySource[];

  socialLinks: {
    instagram?: string;
    x?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    spotify?: string;
    website?: string;
  };

  agencyDetails: {
    agentName: string;
    agencyName: string;
    bookingFeeRange?: string;
    preferredEvents: string[];
    representationNote?: string;
  };

  sourceProvenance?: 'Curated Directory' | 'Wikipedia & Wikidata' | 'Verified Knowledge Base' | 'AI Enriched' | string;
  isAiEnriched?: boolean;
}

export interface DirectoryResponse {
  items: CelebrityDirectoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
  industries: string[];
  countries: string[];
}

export interface InquiryFormData {
  id: string;
  celebrityId: string;
  celebrityName: string;
  inquiryType: 'brand' | 'event' | 'party' | 'speaking' | 'film';
  senderName: string;
  senderOrganization: string;
  senderEmail: string;
  senderPhone: string;
  eventDate: string;
  eventLocation: string;
  proposedBudget: string;
  projectDescription: string;
  submittedAt: string;
  status: 'Pending Review' | 'In Discussion' | 'Approved';
  referenceCode: string;
}

