export interface BirthDetails {
  dateOfBirth: string; // e.g., "November 11, 1974" or "Not available"
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

export interface ExternalIdentity {
  wikidataId?: string;
  wikipediaUrl?: string;
  wikipediaTitle?: string;
  imdbId?: string;
  tmdbId?: string;
  spotifyId?: string;
  instagramHandle?: string;
  xHandle?: string;
  youtubeChannel?: string;
  officialWebsite?: string;
}

export interface FactField {
  field: string;
  label: string;
  value: string;
  sourceName: string;
  sourceUrl?: string;
  lastChecked?: string;
  isVerified: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  retrievedAt: string;
  snippet?: string;
  imageUrl?: string;
  topic?: string;
}

export interface CareerWork {
  id: string;
  title: string;
  year?: number;
  releaseDate?: string;
  roleOrDiscipline?: string;
  directorOrTeam?: string;
  category?: string;
  genre?: string[];
  boxOfficeOrSales?: string;
  ratingOrScore?: string;
  posterUrl?: string;
  posterSource?: string;
  synopsis?: string;
}

export interface Film {
  id: string;
  movieName: string;
  releaseDate: string;
  year: number;
  role: string;
  director: string;
  genre: string[];
  boxOffice?: string;
  rating?: string;
  posterUrl: string;
  posterSource?: string;
  synopsis: string;
}

export interface Award {
  id: string;
  awardName: string;
  year: number;
  category: string;
  project?: string;
  status: 'Won' | 'Nominated';
  source?: string;
  iconType?: 'oscar' | 'golden-globe' | 'bafta' | 'grammy' | 'emmy' | 'trophy' | 'padma' | 'medal';
}

export interface CelebrityTitle {
  id: string;
  titleName: string;
  yearWon: number;
  conferredBy: string;
  description: string;
  source?: string;
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
  sourceId?: string;
  lastChecked?: string;
}

export interface BookingCategory {
  id: 'brand' | 'event' | 'party' | 'speaking' | 'film';
  label: string;
  description: string;
}

export interface CelebritySource {
  title: string;
  url?: string;
  type?: 'wikipedia' | 'wikidata' | 'official' | 'imdb' | 'news' | 'verified_archive';
  retrievedAt?: string;
  credibility?: string;
}

// Lightweight directory record for search, filtering, and pagination
export interface CelebrityDirectoryItem {
  id: string;
  fullName: string;
  knownAs: string;
  aliases: string[];
  primaryProfession: string;
  occupations: string[];
  category: 'Actors' | 'Musicians' | 'Athletes' | 'Directors' | 'TV & Media' | 'Public Figures' | string;
  industry: 'Bollywood' | 'Hollywood' | 'Indian Cinema' | 'Indian Sports' | 'Global Sports' | 'Music' | 'K-Pop & Asian Pop' | 'Global Cinema' | 'European Cinema' | 'Latin Music' | string;
  country: string;
  nationality: string;
  avatarPhoto: string;
  bestViewPhoto: string;
  coverBannerUrl?: string;
  shortTagline: string;
  birthYear?: number;
  isVerified: boolean;
  trendingScore?: number;
  sourceProvenance?: string;
  wikidataId?: string;
  lastRefreshedAt?: string;
}

// Detailed full profile loaded when a celebrity is opened
export interface Celebrity {
  id: string;
  fullName: string;
  knownAs: string;
  aliases?: string[];
  occupation: string[];
  primaryProfession?: string;
  category?: 'Actors' | 'Musicians' | 'Athletes' | 'Directors' | 'TV & Media' | 'Public Figures' | string;
  industry: 'Bollywood' | 'Hollywood' | 'Indian Cinema' | 'Indian Sports' | 'Global Sports' | 'Music' | 'European Cinema' | 'K-Pop & Asian Pop' | 'Latin Music' | 'Global Cinema' | string;
  country?: string;
  careerType?: 'actor' | 'musician' | 'athlete' | 'director' | 'public_figure' | string;
  
  bestViewPhoto: string;
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
  factsWithSources?: FactField[];
  latestNews?: NewsArticle[];
  externalIdentity?: ExternalIdentity;

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

  sourceProvenance?: string;
  isAiEnriched?: boolean;
  lastRefreshedAt?: string;
  updatedAt?: string;
  createdAt?: string;
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
