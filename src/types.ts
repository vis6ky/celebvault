export interface BirthDetails {
  dateOfBirth: string; // e.g., "November 11, 1974"
  placeOfBirth: string; // e.g., "Los Angeles, California, USA"
  age: number;
  zodiacSign: string;
  nationality: string;
}

export interface FamilyDetails {
  parents: string[];
  spouseOrPartner?: string;
  children?: string[];
  siblings?: string[];
  notableRelatives?: string[];
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
  awardName: string; // e.g. "Academy Award (Oscar)"
  year: number;
  category: string; // e.g. "Best Actor in a Leading Role"
  project: string; // e.g. "The Revenant"
  status: 'Won' | 'Nominated';
  iconType?: 'oscar' | 'golden-globe' | 'bafta' | 'grammy' | 'emmy' | 'trophy';
}

export interface CelebrityTitle {
  id: string;
  titleName: string; // e.g. "Hollywood Walk of Fame Star"
  yearWon: number;
  conferredBy: string; // e.g. "Hollywood Chamber of Commerce"
  description: string;
}

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'X' | 'TikTok' | 'YouTube' | 'Facebook';
  handle: string;
  postDate: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isVerified: boolean;
  postUrl?: string;
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
  category: 'Red Carpet' | 'Photoshoot' | 'Behind the Scenes' | 'Events';
}

export interface BookingCategory {
  id: 'brand' | 'event' | 'party' | 'speaking' | 'film';
  label: string;
  description: string;
}

export interface Celebrity {
  id: string; // e.g. "leonardo-dicaprio"
  fullName: string;
  knownAs: string;
  occupation: string[]; // e.g. ["Actor", "Producer", "Environmentalist"]
  industry: 'Hollywood' | 'Music' | 'Sports' | 'Global Cinema' | 'European Cinema' | 'K-Pop & Asian Pop' | 'Latin Music' | 'Fashion' | string;
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
    famousQuote: string;
  };

  films: Film[];
  awards: Award[];
  titles: CelebrityTitle[];
  socialPosts: SocialPost[];
  gallery: PhotoGalleryItem[];

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
    bookingFeeRange: string;
    preferredEvents: string[];
  };
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
