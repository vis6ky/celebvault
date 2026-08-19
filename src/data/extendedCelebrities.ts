import { Celebrity } from '../types';

export const EXTENDED_CELEBRITIES: Celebrity[] = [
  {
    id: 'cristiano-ronaldo',
    fullName: 'Cristiano Ronaldo dos Santos Aveiro',
    knownAs: 'Cristiano Ronaldo (CR7)',
    occupation: ['Professional Footballer', 'Captain of Portugal National Team', 'Global Brand Icon'],
    industry: 'Sports',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80',
    shortTagline: '5-Time Ballon d\'Or Winner & All-Time Leading International Goalscorer',
    isAvailableForHiring: true,
    activeYears: '2002–Present',
    netWorth: '$600 Million',
    height: "6'2\" (187 cm)",
    birthDetails: {
      dateOfBirth: 'February 5, 1985',
      placeOfBirth: 'Funchal, Madeira, Portugal',
      age: 41,
      zodiacSign: 'Aquarius',
      nationality: 'Portuguese',
    },
    familyDetails: {
      parents: ['José Dinis Aveiro (Father - Municipal Gardener)', 'Maria Dolores dos Santos Viveiros da Aveiro (Mother - Cook)'],
      spouseOrPartner: 'Georgina Rodríguez (Partner)',
      children: ['Cristiano Ronaldo Jr.', 'Eva Maria', 'Mateo', 'Alana Martina', 'Bella Esmeralda'],
      siblings: ['Hugo Aveiro', 'Elma Aveiro', 'Kátia Aveiro'],
    },
    biography: {
      summary: 'Cristiano Ronaldo is widely considered one of the greatest football players in history. He holds the record for most goals in international football and UEFA Champions League history.',
      earlyLife: 'Raised in Madeira, Ronaldo began playing youth football at Andorinha before joining Sporting CP academy at age 12. At 18, he signed with Manchester United under Sir Alex Ferguson.',
      careerHighlights: 'Won 5 Ballon d\'Or awards, 5 UEFA Champions League titles, 3 Premier League titles, 2 La Liga trophies, and captained Portugal to victory at UEFA Euro 2016.',
      philanthropicWork: 'Regular donor to Save the Children, UNICEF, and World Vision. Auctioned his 2013 Ballon d\'Or trophy to raise $750,000 for the Make-A-Wish Foundation.',
      famousQuote: 'Your love makes me strong. Your hate makes me unstoppable.',
    },
    films: [
      {
        id: 'film-cr1',
        movieName: 'Ronaldo (Documentary)',
        releaseDate: 'November 9, 2015',
        year: 2015,
        role: 'Himself',
        director: 'Anthony Wonke',
        genre: ['Documentary', 'Sport'],
        boxOffice: '$4.2 Million',
        rating: '6.4',
        posterUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
        synopsis: 'A intimate portrait of one of the world\'s most famous athletes over the course of a year at the peak of his career.',
      }
    ],
    awards: [
      { id: 'aw-cr1', awardName: 'Ballon d\'Or (5-Time Winner)', year: 2017, category: 'Best Player in the World', project: 'Real Madrid / Portugal', status: 'Won', iconType: 'trophy' },
      { id: 'aw-cr2', awardName: 'UEFA Best Player in Europe (3-Time)', year: 2017, category: 'European Footballer of the Year', project: 'Real Madrid', status: 'Won', iconType: 'trophy' },
      { id: 'aw-cr3', awardName: 'European Golden Shoe (4-Time)', year: 2015, category: 'Top Scorer in Europe', project: 'Real Madrid', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-cr1', titleName: 'Grand Officer of the Order of Prince Henry', yearWon: 2014, conferredBy: 'President of Portugal', description: 'Awarded for exceptional service and international recognition of Portugal.' },
      { id: 'tt-cr2', titleName: 'All-Time Top Scorer in Men\'s International Football', yearWon: 2021, conferredBy: 'FIFA & Guinness World Records', description: 'Scored over 130 international goals for Portugal.' },
    ],
    socialPosts: [
      {
        id: 'sp-cr1',
        platform: 'Instagram',
        handle: '@cristiano',
        postDate: '2 hours ago',
        content: 'Ready for the upcoming match! Focused, determined, and proud to represent my team as always. SIUUU! ⚽🇵🇹',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        likesCount: 18500000,
        commentsCount: 340000,
        sharesCount: 1200000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gcr-1', title: 'Champions League Victory', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=85', caption: 'Cristiano Ronaldo lifting the trophy after scoring in the final.', category: 'Events' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/cristiano',
      x: 'https://x.com/cristiano',
      facebook: 'https://facebook.com/cristiano',
    },
    agencyDetails: {
      agentName: 'Gestifute International',
      agencyName: 'Polaris Sports / Gestifute',
      bookingFeeRange: '$1,500,000 - $3,500,000',
      preferredEvents: ['Global Sports Brand Keynotes', 'Luxury Watch & Apparel Campaigns', 'Charity Exhibitions'],
    }
  },
  {
    id: 'beyonce-knowles',
    fullName: 'Beyoncé Giselle Knowles-Carter',
    knownAs: 'Beyoncé',
    occupation: ['Singer', 'Songwriter', 'Record Producer', 'Businesswoman', 'Director'],
    industry: 'Music',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png',
    coverBannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    shortTagline: '32-Time Grammy Winner — The Most Awarded Artist in Grammy History',
    isAvailableForHiring: false,
    activeYears: '1997–Present',
    netWorth: '$800 Million',
    height: "5'7\" (169 cm)",
    birthDetails: {
      dateOfBirth: 'September 4, 1981',
      placeOfBirth: 'Houston, Texas, USA',
      age: 44,
      zodiacSign: 'Virgo',
      nationality: 'American',
    },
    familyDetails: {
      parents: ['Mathew Knowles (Father - Talent Manager)', 'Tina Knowles-Lawson (Mother - Fashion Designer/Stylist)'],
      spouseOrPartner: 'Jay-Z (Shawn Carter) (m. 2008)',
      children: ['Blue Ivy Carter (b. 2012)', 'Rumi Carter (b. 2017)', 'Sir Carter (b. 2017)'],
      siblings: ['Solange Knowles (Sister - Singer/Songwriter)'],
    },
    biography: {
      summary: 'Beyoncé is a world-renowned cultural icon, singer, songwriter, and performer. She rose to fame in the late 1990s as lead singer of Destiny\'s Child before embarking on a record-shattering solo career.',
      earlyLife: 'Born and raised in Houston, Texas, Beyoncé competed in singing and dancing performing arts competitions as a child.',
      careerHighlights: 'With 32 Grammy Awards, she is the most awarded artist in Grammy history. Released iconic visual albums "Lemonade" and "Renaissance", and starred as Nala in Disney\'s "The Lion King". Her Renaissance World Tour grossed over $579 million.',
      philanthropicWork: 'Founder of the BeyGOOD initiative, providing scholarships, disaster relief, housing support, and small business grants globally.',
      famousQuote: 'Power\'s not given to you. You have to take it.',
    },
    films: [
      {
        id: 'film-by1',
        movieName: 'Renaissance: A Film by Beyoncé',
        releaseDate: 'December 1, 2023',
        year: 2023,
        role: 'Director / Self',
        director: 'Beyoncé',
        genre: ['Documentary', 'Music'],
        boxOffice: '$44 Million',
        rating: '8.6',
        posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
        synopsis: 'Chronicles the intention, hard work, involvement, creative mind and legacy of Beyoncé\'s record-shattering tour.',
      }
    ],
    awards: [
      { id: 'aw-by1', awardName: 'Grammy Award (32-Time Winner)', year: 2023, category: 'Best Dance/Electronic Album', project: 'Renaissance', status: 'Won', iconType: 'grammy' },
      { id: 'aw-by2', awardName: 'MTV Video Vanguard Award', year: 2014, category: 'Lifetime Achievement in Music', project: 'Career', status: 'Won', iconType: 'grammy' },
    ],
    titles: [
      { id: 'tt-by1', titleName: 'Most Awarded Grammy Artist in History', yearWon: 2023, conferredBy: 'Recording Academy', description: 'Surpassed Georg Solti with 32 competitive Grammy wins.' },
    ],
    socialPosts: [
      {
        id: 'sp-by1',
        platform: 'Instagram',
        handle: '@beyonce',
        postDate: '1 day ago',
        content: 'RENAISSANCE WORLD TOUR. Thank you to everyone who made this journey unforgettable. 🐝✨',
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        likesCount: 6200000,
        commentsCount: 98000,
        sharesCount: 310000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gby-1', title: 'Renaissance World Tour Stage', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=85', caption: 'Beyoncé performing live during her stadium tour.', category: 'Events' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/beyonce',
      website: 'https://beyonce.com',
    },
    agencyDetails: {
      agentName: 'Parkwood Entertainment',
      agencyName: 'Parkwood Entertainment / CAA',
      bookingFeeRange: 'Private / By Invitation Only',
      preferredEvents: ['Global Stadium Tours', 'Super Bowl Halftime Shows', 'Private Headlining Performances'],
    }
  },
  {
    id: 'tom-cruise',
    fullName: 'Thomas Cruise Mapother IV',
    knownAs: 'Tom Cruise',
    occupation: ['Actor', 'Film Producer', 'Stunt Performer'],
    industry: 'Hollywood',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Global Action Cinema Legend & Creator of "Mission: Impossible"',
    isAvailableForHiring: true,
    activeYears: '1981–Present',
    netWorth: '$600 Million',
    height: "5'7\" (170 cm)",
    birthDetails: {
      dateOfBirth: 'July 3, 1962',
      placeOfBirth: 'Syracuse, New York, USA',
      age: 63,
      zodiacSign: 'Cancer',
      nationality: 'American',
    },
    familyDetails: {
      parents: ['Thomas Cruise Mapother III (Electrical Engineer)', 'Mary Lee Pfeiffer (Special Education Teacher)'],
      spouseOrPartner: 'Single (Prev: Mimi Rogers, Nicole Kidman, Katie Holmes)',
      children: ['Isabella Jane Cruise', 'Connor Cruise', 'Suri Cruise'],
      siblings: ['Lee Anne DeVette', 'Marian Mapother', 'Cass Mapother'],
    },
    biography: {
      summary: 'Tom Cruise is one of the highest-grossing box office actors in cinematic history. Renowned for performing his own high-risk practical stunts in films like Top Gun and Mission: Impossible.',
      earlyLife: 'Grew up in relative poverty and attended 15 schools in 12 years before discovering acting in high school production of Guys and Dolls.',
      careerHighlights: 'Starred in iconic films including Top Gun (1986), Jerry Maguire (1996), Minority Report (2002), and Top Gun: Maverick (2022), which grossed $1.49 billion worldwide.',
      philanthropicWork: 'Supports youth literacy programs and emergency response charities globally.',
      famousQuote: 'I don\'t do things by halves. If I\'m going to do something, I go all out.',
    },
    films: [
      {
        id: 'film-tc1',
        movieName: 'Top Gun: Maverick',
        releaseDate: 'May 27, 2022',
        year: 2022,
        role: 'Capt. Pete "Maverick" Mitchell',
        director: 'Joseph Kosinski',
        genre: ['Action', 'Drama'],
        boxOffice: '$1.495 Billion',
        rating: '8.3',
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        synopsis: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a detachment of Top Gun graduates for a specialized mission.',
      }
    ],
    awards: [
      { id: 'aw-tc1', awardName: 'Honorary Palme d\'Or', year: 2022, category: 'Lifetime Achievement in Cinema', project: 'Career / Cannes Film Festival', status: 'Won', iconType: 'bafta' },
      { id: 'aw-tc2', awardName: 'Golden Globe Award (3-Time Winner)', year: 2000, category: 'Best Actor', project: 'Magnolia / Jerry Maguire / Born on the 4th of July', status: 'Won', iconType: 'golden-globe' },
    ],
    titles: [
      { id: 'tt-tc1', titleName: 'Honorary Knight Commander / French Legion of Honor', yearWon: 2024, conferredBy: 'French Republic', description: 'Honored for contributions to global cinematic arts.' },
    ],
    socialPosts: [
      {
        id: 'sp-tc1',
        platform: 'X',
        handle: '@TomCruise',
        postDate: '3 days ago',
        content: 'See you at the movies! Thank you to all the fans around the world who support big-screen cinema.',
        likesCount: 890000,
        commentsCount: 23000,
        sharesCount: 75000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gtc-1', title: 'Mission Impossible Stunt', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85', caption: 'Tom Cruise performing practical aerial stunts.', category: 'Behind the Scenes' }
    ],
    socialLinks: {
      x: 'https://x.com/tomcruise',
      instagram: 'https://instagram.com/tomcruise',
    },
    agencyDetails: {
      agentName: 'Maha Dakhil / Bryan Lourd',
      agencyName: 'CAA (Creative Artists Agency)',
      bookingFeeRange: '$1,000,000 - $2,500,000',
      preferredEvents: ['Global Film Premieres', 'Aviation & Film Tech Conventions', 'Cinema Keynotes'],
    }
  },
  {
    id: 'priyanka-chopra',
    fullName: 'Priyanka Chopra Jonas',
    knownAs: 'Priyanka Chopra Jonas',
    occupation: ['Actress', 'Producer', 'Entrepreneur', 'UNICEF Goodwill Ambassador'],
    industry: 'Global Cinema',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Priyanka-Chopra-L%27Officiel-August-2016.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Priyanka-Chopra-L%27Officiel-August-2016.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Global Cinema Icon, Producer & Miss World 2000',
    isAvailableForHiring: true,
    activeYears: '2000–Present',
    netWorth: '$75 Million',
    height: "5'6\" (168 cm)",
    birthDetails: {
      dateOfBirth: 'July 18, 1982',
      placeOfBirth: 'Jamshedpur, Jharkhand, India',
      age: 43,
      zodiacSign: 'Cancer',
      nationality: 'Indian',
    },
    familyDetails: {
      parents: ['Dr. Ashok Chopra (Father - Army Physician)', 'Dr. Madhu Chopra (Mother - Army Physician)'],
      spouseOrPartner: 'Nick Jonas (m. 2018)',
      children: ['Malti Marie Chopra Jonas (b. 2022)'],
      siblings: ['Siddharth Chopra (Brother)'],
    },
    biography: {
      summary: 'Priyanka Chopra Jonas is one of India\'s most prominent and highest-paid actresses who successfully bridged Bollywood and Hollywood as an international leading star.',
      earlyLife: 'Crowned Miss World 2000 at age 18, she quickly established herself as a leading star in Hindi cinema with hits like Fashion, Barfi!, and Bajirao Mastani.',
      careerHighlights: 'Became the first South Asian woman to head a network drama series in the US with ABC\'s "Quantico". Starred in Amazon Prime\'s global spy franchise "Citadel" and films like "Baywatch" and "The White Tiger".',
      philanthropicWork: 'UNICEF Goodwill Ambassador since 2016, advocating for children\'s rights, education, and gender equality in developing nations.',
      famousQuote: 'Don\'t try to squeeze into a glass slipper. Instead, shatter the glass ceiling.',
    },
    films: [
      {
        id: 'film-pc1',
        movieName: 'Citadel',
        releaseDate: 'April 28, 2023',
        year: 2023,
        role: 'Nadia Sinh',
        director: 'Russo Brothers',
        genre: ['Action', 'Thriller', 'Drama'],
        boxOffice: 'Amazon Prime Original',
        rating: '6.2',
        posterUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        synopsis: 'Global spy agency Citadel has fallen, and its agents\' memories were wiped. Now the powerful syndicate Manticore is rising in its place.',
      }
    ],
    awards: [
      { id: 'aw-pc1', awardName: 'Padma Shri (4th Highest Civilian Honor)', year: 2016, category: 'Contribution to Arts', project: 'Government of India', status: 'Won', iconType: 'trophy' },
      { id: 'aw-pc2', awardName: 'National Film Award (India)', year: 2008, category: 'Best Actress', project: 'Fashion', status: 'Won', iconType: 'oscar' },
    ],
    titles: [
      { id: 'tt-pc1', titleName: 'Miss World 2000', yearWon: 2000, conferredBy: 'Miss World Organization', description: 'Crowned Miss World in London at age 18.' },
    ],
    socialPosts: [
      {
        id: 'sp-pc1',
        platform: 'Instagram',
        handle: '@priyankachopra',
        postDate: '5 hours ago',
        content: 'Grateful for every step of this journey. Celebrating female empowerment & global storytelling today! 💫',
        imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        likesCount: 1980000,
        commentsCount: 15400,
        sharesCount: 42000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gpc-1', title: 'Met Gala Red Carpet', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85', caption: 'Priyanka Chopra Jonas attending the Met Gala.', category: 'Red Carpet' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/priyankachopra',
      x: 'https://x.com/priyankachopra',
    },
    agencyDetails: {
      agentName: 'UTA (United Talent Agency) & Anjula Acharia',
      agencyName: 'UTA / Purple Pebble Pictures',
      bookingFeeRange: '$500,000 - $1,200,000',
      preferredEvents: ['Global Tech & Female Leadership Summits', 'Luxury Beauty Endorsements', 'Film Producer Roundtables'],
    }
  },
  {
    id: 'jungkook-bts',
    fullName: 'Jeon Jung-kook',
    knownAs: 'Jungkook (BTS)',
    occupation: ['Singer', 'Songwriter', 'Dancer', 'Global Brand Ambassador'],
    industry: 'K-Pop & Asian Pop',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Jeon_Jungkook_at_Incheon_Airport%2C_8_April_2023.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Jeon_Jungkook_at_Incheon_Airport%2C_8_April_2023.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Global K-Pop Pop Star & Main Vocalist of BTS',
    isAvailableForHiring: false,
    activeYears: '2013–Present',
    netWorth: '$35 Million',
    height: "5'10\" (179 cm)",
    birthDetails: {
      dateOfBirth: 'September 1, 1997',
      placeOfBirth: 'Busan, South Korea',
      age: 28,
      zodiacSign: 'Virgo',
      nationality: 'South Korean',
    },
    familyDetails: {
      parents: ['Jeon Yong-seo (Father)', 'Mother'],
      spouseOrPartner: 'Single',
      siblings: ['Jeon Jung-hyun (Older Brother)'],
    },
    biography: {
      summary: 'Jungkook is the youngest member and main vocalist of global sensation BTS. In 2023, he launched a wildly successful solo career breaking multiple Billboard chart records.',
      earlyLife: 'Auditioned for Superstar K in 3rd grade of middle school. Though not selected, he received offer letters from seven entertainment agencies before joining Big Hit Entertainment.',
      careerHighlights: 'Performed "Dreamers" at the 2022 FIFA World Cup Opening Ceremony in Qatar. His solo single "Seven" hit #1 on the Billboard Hot 100 and reached 1 billion streams on Spotify in record time.',
      philanthropicWork: 'Donated 1 billion KRW ($758,000) to Seoul National University Children\'s Hospital in 2023.',
      famousQuote: 'Effort makes you. You will regret someday if you don\'t do your best now.',
    },
    films: [
      {
        id: 'film-jk1',
        movieName: 'Jungkook: I Am Still',
        releaseDate: 'September 18, 2024',
        year: 2024,
        role: 'Himself',
        director: 'Park Jun-soo',
        genre: ['Documentary', 'Music'],
        boxOffice: '$15 Million',
        rating: '8.8',
        posterUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
        synopsis: 'Follows Jungkook over an eight-month period as he prepares his debut solo album GOLDEN and performs live worldwide.',
      }
    ],
    awards: [
      { id: 'aw-jk1', awardName: 'Billboard Music Award', year: 2023, category: 'Top Global K-Pop Song', project: 'Seven (feat. Latto)', status: 'Won', iconType: 'trophy' },
      { id: 'aw-jk2', awardName: 'MTV Europe Music Award', year: 2023, category: 'Best Song & Best K-Pop', project: 'Seven', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-jk1', titleName: 'Order of Cultural Merit (Hwagwan)', yearWon: 2018, conferredBy: 'President of South Korea', description: 'Youngest recipient of South Korean cultural honors.' },
    ],
    socialPosts: [
      {
        id: 'sp-jk1',
        platform: 'TikTok',
        handle: '@jungkook',
        postDate: '1 day ago',
        content: 'GOLDEN moments with ARMY. Thank you for making Seven and Standing Next To You unforgettable! 💜',
        likesCount: 12400000,
        commentsCount: 290000,
        sharesCount: 650000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gjk-1', title: 'FIFA World Cup Qatar Performance', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=85', caption: 'Jungkook performing Dreamers live on stage.', category: 'Events' }
    ],
    socialLinks: {
      tiktok: 'https://tiktok.com/@jungkook',
      youtube: 'https://youtube.com/BTS',
    },
    agencyDetails: {
      agentName: 'HYBE / BIGHIT MUSIC',
      agencyName: 'HYBE Corporation',
      bookingFeeRange: 'Official Agency Inquiries Only',
      preferredEvents: ['Global Music Festivals', 'Calvin Klein Global Campaigns', 'Stadium Tours'],
    }
  },
  {
    id: 'penelope-cruz',
    fullName: 'Penélope Cruz Sánchez',
    knownAs: 'Penélope Cruz',
    occupation: ['Actress', 'Model'],
    industry: 'European Cinema',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Pen%C3%A9lope_Cruz_at_the_32nd_Goya_Awards_Red_Carpet.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Pen%C3%A9lope_Cruz_at_the_32nd_Goya_Awards_Red_Carpet.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Academy Award Winner & Muse of Pedro Almodóvar',
    isAvailableForHiring: true,
    activeYears: '1989–Present',
    netWorth: '$85 Million',
    height: "5'6\" (168 cm)",
    birthDetails: {
      dateOfBirth: 'April 28, 1974',
      placeOfBirth: 'Alcobendas, Madrid, Spain',
      age: 51,
      zodiacSign: 'Taurus',
      nationality: 'Spanish',
    },
    familyDetails: {
      parents: ['Eduardo Cruz (Auto Mechanic)', 'Encarna Sánchez (Hairdresser)'],
      spouseOrPartner: 'Javier Bardem (m. 2010)',
      children: ['Leo Encinas Cruz (b. 2011)', 'Luna Encinas Cruz (b. 2013)'],
      siblings: ['Mónica Cruz (Sister)', 'Eduardo Cruz (Brother)'],
    },
    biography: {
      summary: 'Penélope Cruz is the first Spanish actress to win an Academy Award and to receive a star on the Hollywood Walk of Fame. Renowned for her work in both European arthouse and Hollywood cinema.',
      earlyLife: 'Studied classical ballet for nine years at Spain\'s National Conservatory before focusing on acting after seeing Pedro Almodóvar\'s Tie Me Up! Tie Me Down! as a teenager.',
      careerHighlights: 'Won the Academy Award for Best Supporting Actress for Woody Allen\'s "Vicky Cristina Barcelona" (2008). Starred in masterpieces "Volver", "Parallel Mothers", and "Nine".',
      philanthropicWork: 'Volunteered with Mother Teresa in Uganda and India, supporting clinics and tuberculosis programs.',
      famousQuote: 'The most difficult thing in the world is to start a career known only for your looks.',
    },
    films: [
      {
        id: 'film-px1',
        movieName: 'Parallel Mothers (Madres paralelas)',
        releaseDate: 'December 24, 2021',
        year: 2021,
        role: 'Janis Martínez',
        director: 'Pedro Almodóvar',
        genre: ['Drama'],
        boxOffice: '$22 Million',
        rating: '7.1',
        posterUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        synopsis: 'Two women, a single mother entering middle age and a pregnant teenager, bond in a maternity ward as they prepare to give birth.',
      }
    ],
    awards: [
      { id: 'aw-px1', awardName: 'Academy Award (Oscar Winner)', year: 2009, category: 'Best Supporting Actress', project: 'Vicky Cristina Barcelona', status: 'Won', iconType: 'oscar' },
      { id: 'aw-px2', awardName: 'Volpi Cup for Best Actress', year: 2021, category: 'Venice Film Festival Best Actress', project: 'Parallel Mothers', status: 'Won', iconType: 'bafta' },
    ],
    titles: [
      { id: 'tt-px1', titleName: 'Hollywood Walk of Fame Star', yearWon: 2011, conferredBy: 'Hollywood Chamber of Commerce', description: 'First Spanish actress awarded a star on Hollywood Boulevard.' },
    ],
    socialPosts: [
      {
        id: 'sp-px1',
        platform: 'Instagram',
        handle: '@penelopecruzoficial',
        postDate: '2 days ago',
        content: 'Muchas gracias por todo el cariño recibido en el Festival de Cine. Viva el cine español! ❤️🌹',
        likesCount: 840000,
        commentsCount: 9200,
        sharesCount: 18000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gpx-1', title: 'Cannes Film Festival Red Carpet', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85', caption: 'Penélope Cruz at the Palais des Festivals in Cannes.', category: 'Red Carpet' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/penelopecruzoficial',
    },
    agencyDetails: {
      agentName: 'Kuranda Management / CAA',
      agencyName: 'CAA & Katrina Bayonas',
      bookingFeeRange: '$400,000 - $1,000,000',
      preferredEvents: ['European Film Festival Galas', 'Haute Couture Fashion Shows', 'Cultural Film Panels'],
    }
  },
  {
    id: 'jackie-chan',
    fullName: 'Chan Kong-sang (Jackie Chan)',
    knownAs: 'Jackie Chan',
    occupation: ['Actor', 'Martial Artist', 'Director', 'Stunt Coordinator', 'Philanthropist'],
    industry: 'Global Cinema',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Jackie_Chan_July_2016.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Jackie_Chan_July_2016.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Honorary Oscar Winner & Global Pioneer of Slapstick Martial Arts Cinema',
    isAvailableForHiring: true,
    activeYears: '1962–Present',
    netWorth: '$400 Million',
    height: "5'8\" (174 cm)",
    birthDetails: {
      dateOfBirth: 'April 7, 1954',
      placeOfBirth: 'Victoria Peak, British Hong Kong',
      age: 71,
      zodiacSign: 'Aries',
      nationality: 'Hong Kong / Chinese',
    },
    familyDetails: {
      parents: ['Charles Chan (Father)', 'Lee-Lee Chan (Mother)'],
      spouseOrPartner: 'Joan Lin (m. 1982)',
      children: ['Jaycee Chan (Son - Actor/Singer)', 'Etta Ng Chok Lam (Daughter)'],
    },
    biography: {
      summary: 'Jackie Chan is one of the most recognizable cinematic icons in the world. Known for his acrobatic fighting style, comic timing, improvised weapons, and innovative stunt work.',
      earlyLife: 'Trained in martial arts, acrobatics, and opera at the China Drama Academy from age seven before working as a stuntman in Bruce Lee films Enter the Dragon and Fist of Fury.',
      careerHighlights: 'Starred in over 150 films including "Drunken Master", "Police Story", "Rush Hour" trilogy, "The Karate Kid", and voiced Master Monkey in "Kung Fu Panda". Received an Honorary Academy Award in 2016.',
      philanthropicWork: 'Founder of the Jackie Chan Charitable Foundation (1988) and the Dragon\'s Heart Foundation, building schools and supporting disaster relief across rural Asia.',
      famousQuote: 'Do not let circumstances control you. You change your circumstances.',
    },
    films: [
      {
        id: 'film-jc1',
        movieName: 'Rush Hour',
        releaseDate: 'September 18, 1998',
        year: 1998,
        role: 'Chief Inspector Lee',
        director: 'Brett Ratner',
        genre: ['Action', 'Comedy', 'Crime'],
        boxOffice: '$244.4 Million',
        rating: '7.0',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
        synopsis: 'A loyal Hong Kong inspector pairs up with an eccentric LAPD officer to rescue the kidnapped daughter of a Chinese diplomat.',
      }
    ],
    awards: [
      { id: 'aw-jc1', awardName: 'Academy Governors Award (Honorary Oscar)', year: 2016, category: 'Lifetime Achievement in Cinema', project: 'Over 50 Years in Film', status: 'Won', iconType: 'oscar' },
    ],
    titles: [
      { id: 'tt-jc1', titleName: 'Member of the Most Excellent Order of the British Empire (MBE)', yearWon: 1989, conferredBy: 'Queen Elizabeth II', description: 'Honored for services to entertainment.' },
    ],
    socialPosts: [
      {
        id: 'sp-jc1',
        platform: 'Facebook',
        handle: 'Jackie Chan',
        postDate: '4 days ago',
        content: 'Working on my next action comedy project! Thank you to my JC Stunt Team for keeping the martial arts tradition alive.',
        likesCount: 1450000,
        commentsCount: 38000,
        sharesCount: 92000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gjc-1', title: 'Honorary Oscar Ceremony', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1000&q=85', caption: 'Jackie Chan receiving his Academy Award.', category: 'Events' }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/jackie',
      website: 'https://jackiechan.com',
    },
    agencyDetails: {
      agentName: 'JC Group International',
      agencyName: 'Jackie Chan Group / CAA',
      bookingFeeRange: '$800,000 - $2,000,000',
      preferredEvents: ['Global Martial Arts Summits', 'Action Film Masterclasses', 'Charity Galas'],
    }
  },
  {
    id: 'cillian-murphy',
    fullName: 'Cillian Murphy',
    knownAs: 'Cillian Murphy',
    occupation: ['Actor', 'Producer'],
    industry: 'Hollywood',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Cillian_Murphy_2014.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Cillian_Murphy_2014.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Academy Award Winner for Best Actor ("Oppenheimer") & "Peaky Blinders" Star',
    isAvailableForHiring: true,
    activeYears: '1996–Present',
    netWorth: '$25 Million',
    height: "5'9\" (175 cm)",
    birthDetails: {
      dateOfBirth: 'May 25, 1976',
      placeOfBirth: 'Douglas, Cork, Ireland',
      age: 49,
      zodiacSign: 'Gemini',
      nationality: 'Irish',
    },
    familyDetails: {
      parents: ['Brendan Murphy (Department of Education)', 'French Teacher Mother'],
      spouseOrPartner: 'Yvonne McGuinness (m. 2004)',
      children: ['Malachy Murphy (b. 2005)', 'Aran Murphy (b. 2007)'],
      siblings: ['Páidi Murphy', 'Siobhán Murphy', 'Orla Murphy'],
    },
    biography: {
      summary: 'Cillian Murphy is an Irish actor celebrated for his captivating piercing blue eyes and intense dramatic performances across theatre, television, and film.',
      earlyLife: 'Raised in Cork, Murphy studied law at University College Cork before dropping out to pursue acting with the Corcadorca Theatre Company.',
      careerHighlights: 'Achieved worldwide fame as Thomas Shelby in the BBC series "Peaky Blinders". Formed a prominent partnership with Christopher Nolan in "28 Days Later", "Inception", "Dunkirk", and "Oppenheimer" (2023), for which he won the Oscar for Best Actor.',
      philanthropicWork: 'Patron of the UNESCO Child and Family Research Centre at University of Galway, promoting youth civic engagement.',
      famousQuote: 'I\'m interested in the truth. I\'m interested in honest work.',
    },
    films: [
      {
        id: 'film-cm1',
        movieName: 'Oppenheimer',
        releaseDate: 'July 21, 2023',
        year: 2023,
        role: 'J. Robert Oppenheimer',
        director: 'Christopher Nolan',
        genre: ['Biography', 'Drama', 'History'],
        boxOffice: '$957 Million',
        rating: '8.9',
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
        synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
      }
    ],
    awards: [
      { id: 'aw-cm1', awardName: 'Academy Award (Oscar Winner)', year: 2024, category: 'Best Actor in a Leading Role', project: 'Oppenheimer', status: 'Won', iconType: 'oscar' },
      { id: 'aw-cm2', awardName: 'BAFTA Award', year: 2024, category: 'Best Leading Actor', project: 'Oppenheimer', status: 'Won', iconType: 'bafta' },
    ],
    titles: [
      { id: 'tt-cm1', titleName: 'First Irish-Born Oscar Winner for Best Actor', yearWon: 2024, conferredBy: 'Academy of Motion Picture Arts and Sciences', description: 'Historic win for Irish cinema.' },
    ],
    socialPosts: [
      {
        id: 'sp-cm1',
        platform: 'X',
        handle: '@CillianMurphyNet',
        postDate: '3 days ago',
        content: 'Overwhelmed and deeply grateful to the Academy, Christopher Nolan, and our incredible Oppenheimer family.',
        likesCount: 920000,
        commentsCount: 21000,
        sharesCount: 88000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gcm-1', title: '96th Academy Awards Victory', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85', caption: 'Cillian Murphy holding his Best Actor Oscar.', category: 'Red Carpet' }
    ],
    socialLinks: {
      website: 'https://cillianmurphy.co.uk',
    },
    agencyDetails: {
      agentName: 'Lou Coulson Associates / WME',
      agencyName: 'WME Agency',
      bookingFeeRange: '$600,000 - $1,500,000',
      preferredEvents: ['Film Festival Panels', 'Dramatic Acting Masterclasses', 'Irish Cultural Galas'],
    }
  },
  {
    id: 'bad-bunny',
    fullName: 'Benito Antonio Martínez Ocasio',
    knownAs: 'Bad Bunny',
    occupation: ['Rapper', 'Singer', 'Songwriter', 'Actor', 'Professional Wrestler'],
    industry: 'Latin Music',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Bad_Bunny_2019_by_Glenn_Francis.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Bad_Bunny_2019_by_Glenn_Francis.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    shortTagline: '3-Time Grammy Winner & Most Streamed Artist on Spotify Worldwide',
    isAvailableForHiring: false,
    activeYears: '2016–Present',
    netWorth: '$50 Million',
    height: "5'11\" (180 cm)",
    birthDetails: {
      dateOfBirth: 'March 10, 1994',
      placeOfBirth: 'Almirante Sur, Vega Baja, Puerto Rico',
      age: 31,
      zodiacSign: 'Pisces',
      nationality: 'Puerto Rican',
    },
    familyDetails: {
      parents: ['Tito Martínez (Truck Driver)', 'Lysaurie Ocasio (Schoolteacher)'],
      spouseOrPartner: 'Kendall Jenner (On-and-off partner)',
      siblings: ['Bernie Martínez Ocasio', 'Bysael Martínez Ocasio'],
    },
    biography: {
      summary: 'Bad Bunny is the undisputed global king of Latin trap and reggaeton. He made history as the first non-English language artist to become Spotify\'s most-streamed artist of the year globally.',
      earlyLife: 'Worked as a bagger at a SuperMercados Econo in Vega Baja while studying audiovisual communication at University of Puerto Rico at Arecibo and posting songs on SoundCloud.',
      careerHighlights: 'His 2022 album "Un Verano Sin Ti" became the first Spanish-language album nominated for Album of the Year at the Grammys. Co-headlined the Super Bowl LIV Halftime Show and performed in WWE Backlash in Puerto Rico.',
      philanthropicWork: 'Founder of the Good Bunny Foundation, providing art and music equipment to youth in underprivileged communities across Puerto Rico.',
      famousQuote: 'I\'m just being myself. I don\'t try to fit into any box.',
    },
    films: [
      {
        id: 'film-bb1',
        movieName: 'Bullet Train',
        releaseDate: 'August 5, 2022',
        year: 2022,
        role: 'The Wolf',
        director: 'David Leitch',
        genre: ['Action', 'Comedy'],
        boxOffice: '$239 Million',
        rating: '7.3',
        posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
        synopsis: 'Five assassins aboard a swiftly moving bullet train find out their missions have something in common.',
      }
    ],
    awards: [
      { id: 'aw-bb1', awardName: 'Grammy Award (3-Time Winner)', year: 2023, category: 'Best Música Urbana Album', project: 'Un Verano Sin Ti', status: 'Won', iconType: 'grammy' },
      { id: 'aw-bb2', awardName: 'Latin Grammy Award (11-Time Winner)', year: 2022, category: 'Best Urban Music Album', project: 'Un Verano Sin Ti', status: 'Won', iconType: 'grammy' },
    ],
    titles: [
      { id: 'tt-bb1', titleName: 'Spotify Most Streamed Artist Worldwide (3 Consecutive Years)', yearWon: 2022, conferredBy: 'Spotify Technology S.A.', description: 'Logged over 18.5 billion annual streams.' },
    ],
    socialPosts: [
      {
        id: 'sp-bb1',
        platform: 'Instagram',
        handle: '@badbunnypr',
        postDate: '1 day ago',
        content: 'Puerto Rico en el mapa siempre. Gracias por todo el amor! 🇵🇷🌴🔥',
        likesCount: 5200000,
        commentsCount: 88000,
        sharesCount: 210000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gbb-1', title: 'World\'s Hottest Tour Stage', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=85', caption: 'Bad Bunny performing on a floating palm tree in stadium tour.', category: 'Events' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/badbunnypr',
      spotify: 'https://spotify.com/badbunny',
    },
    agencyDetails: {
      agentName: 'Rimas Entertainment / Noah Assad',
      agencyName: 'Rimas Entertainment',
      bookingFeeRange: '$1,000,000 - $2,500,000',
      preferredEvents: ['Latin Grammy Keynotes', 'Stadium Music Festivals', 'Global Fashion Campaigns'],
    }
  },
  {
    id: 'gal-gadot',
    fullName: 'Gal Gadot-Varsano',
    knownAs: 'Gal Gadot',
    occupation: ['Actress', 'Producer', 'Model'],
    industry: 'Hollywood',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Gal_Gadot_by_Gage_Skidmore_2.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Gal_Gadot_by_Gage_Skidmore_2.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Global Action Star, Miss Israel 2004 & "Wonder Woman"',
    isAvailableForHiring: true,
    activeYears: '2004–Present',
    netWorth: '$40 Million',
    height: "5'10\" (178 cm)",
    birthDetails: {
      dateOfBirth: 'April 30, 1985',
      placeOfBirth: 'Petah Tikva, Israel',
      age: 40,
      zodiacSign: 'Taurus',
      nationality: 'Israeli',
    },
    familyDetails: {
      parents: ['Michael Gadot (Engineer)', 'Irit Gadot (Physical Education Teacher)'],
      spouseOrPartner: 'Jaron Varsano (m. 2008)',
      children: ['Alma Varsano (b. 2011)', 'Maya Varsano (b. 2017)', 'Daniella Varsano (b. 2021)', 'Ori Varsano (b. 2024)'],
      siblings: ['Dana Gadot (Sister)'],
    },
    biography: {
      summary: 'Gal Gadot is an Israeli actress and international superstar who achieved worldwide icon status playing Diana Prince / Wonder Woman in the DC Extended Universe.',
      earlyLife: 'Crowned Miss Israel 2004 at age 18 before serving two mandatory years in the Israel Defense Forces as a combat fitness instructor.',
      careerHighlights: 'Made her film debut as Gisele Yashar in "Fast & Furious" (2009). Starred as "Wonder Woman" (2017), grossing $822 million, and starred in Netflix blockbuster "Red Notice".',
      philanthropicWork: 'Active supporter of Pencils of Promise, building schools for underprivileged children in Guatemala.',
      famousQuote: 'I want to show that women are empowered and strong, and don\'t have to be saved by a male hero.',
    },
    films: [
      {
        id: 'film-gg1',
        movieName: 'Wonder Woman',
        releaseDate: 'June 2, 2017',
        year: 2017,
        role: 'Diana Prince / Wonder Woman',
        director: 'Patty Jenkins',
        genre: ['Action', 'Adventure', 'Fantasy'],
        boxOffice: '$822.8 Million',
        rating: '7.4',
        posterUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        synopsis: 'When an Amazonian princess leaves her sheltered island home to fight in World War I, she discovers her full powers and true destiny.',
      }
    ],
    awards: [
      { id: 'aw-gg1', awardName: 'Critics Choice SeeHer Award', year: 2018, category: 'Female Empowerment in Cinema', project: 'Wonder Woman', status: 'Won', iconType: 'trophy' },
      { id: 'aw-gg2', awardName: 'MTV Movie & TV Award', year: 2018, category: 'Best Fight', project: 'Wonder Woman', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-gg1', titleName: 'Miss Israel 2004', yearWon: 2004, conferredBy: 'Miss Israel Pageant', description: 'Represented Israel at Miss Universe 2004 in Ecuador.' },
    ],
    socialPosts: [
      {
        id: 'sp-gg1',
        platform: 'Instagram',
        handle: '@gal_gadot',
        postDate: '1 day ago',
        content: 'Love and light to everyone today! So grateful for this journey and all of you. ✨💙',
        likesCount: 1650000,
        commentsCount: 14200,
        sharesCount: 31000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'ggg-1', title: 'Tiffany & Co. Global Event', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85', caption: 'Gal Gadot as house ambassador for Tiffany & Co.', category: 'Red Carpet' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/gal_gadot',
      x: 'https://x.com/galgadot',
    },
    agencyDetails: {
      agentName: 'WME Agency / Pilot Wave',
      agencyName: 'WME',
      bookingFeeRange: '$500,000 - $1,500,000',
      preferredEvents: ['Luxury Jewelry Endorsements', 'Female Empowerment Summits', 'Film Franchises'],
    }
  },
  {
    id: 'novak-djokovic',
    fullName: 'Novak Djokovic',
    knownAs: 'Novak Djokovic',
    occupation: ['Professional Tennis Player', 'Grand Slam Champion', 'Philanthropist'],
    industry: 'Sports',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Novak_Djokovic_Open_de_Australie_2020.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Novak_Djokovic_Open_de_Australie_2020.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80',
    shortTagline: '24-Time Grand Slam Champion — Most Grand Slam Titles in Tennis History',
    isAvailableForHiring: true,
    activeYears: '2003–Present',
    netWorth: '$240 Million',
    height: "6'2\" (188 cm)",
    birthDetails: {
      dateOfBirth: 'May 22, 1987',
      placeOfBirth: 'Belgrade, SR Serbia, SFR Yugoslavia',
      age: 38,
      zodiacSign: 'Gemini',
      nationality: 'Serbian',
    },
    familyDetails: {
      parents: ['Srđan Đoković (Father)', 'Dijana Đoković (Mother)'],
      spouseOrPartner: 'Jelena Ristić (m. 2014)',
      children: ['Stefan Djokovic (b. 2014)', 'Tara Djokovic (b. 2017)'],
      siblings: ['Marko Djokovic', 'Djordje Djokovic'],
    },
    biography: {
      summary: 'Novak Djokovic is a Serbian professional tennis player who is statistically the most successful male tennis player of all time, holding 24 Grand Slam singles titles.',
      earlyLife: 'Grew up in Belgrade during the Balkan conflicts, practicing tennis in abandoned swimming pools amidst sirens.',
      careerHighlights: 'Completed the Career Golden Slam by winning gold at the 2024 Paris Olympics. Held world No. 1 ranking for a record 428 total weeks.',
      philanthropicWork: 'Founder of the Novak Djokovic Foundation, funding early childhood education and preschool construction across Serbia.',
      famousQuote: 'Belief is the most important word in my vocabulary, even more than hope.',
    },
    films: [
      {
        id: 'film-nd1',
        movieName: 'Novak: The Untold Story',
        releaseDate: 'January 15, 2024',
        year: 2024,
        role: 'Himself',
        director: 'Marko Petrovic',
        genre: ['Documentary', 'Sport'],
        boxOffice: 'Sports TV Special',
        rating: '8.5',
        posterUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
        synopsis: 'A comprehensive chronicle of Djokovic\'s rise from wartime Belgrade to becoming the most decorated tennis champion in history.',
      }
    ],
    awards: [
      { id: 'aw-nd1', awardName: 'Laureus World Sportsman of the Year (5-Time)', year: 2024, category: 'World Sportsman of the Year', project: 'Tennis Excellence', status: 'Won', iconType: 'trophy' },
      { id: 'aw-nd2', awardName: 'Olympic Gold Medalist', year: 2024, category: 'Men\'s Singles Tennis', project: '2024 Paris Olympic Games', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-nd1', titleName: 'Most Grand Slam Men\'s Singles Titles in History (24)', yearWon: 2023, conferredBy: 'ITF & ATP', description: 'Surpassed Rafael Nadal and Roger Federer.' },
    ],
    socialPosts: [
      {
        id: 'sp-nd1',
        platform: 'X',
        handle: '@DjokerNole',
        postDate: '1 day ago',
        content: 'Gold for Serbia! 🥇🇷🇸 Thank you to my family, my team, and all the fans who never stopped believing.',
        likesCount: 1100000,
        commentsCount: 28000,
        sharesCount: 95000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gnd-1', title: 'Paris 2024 Olympic Gold Celebration', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=85', caption: 'Novak Djokovic celebrating Olympic Gold medal on Court Philippe-Chatrier.', category: 'Events' }
    ],
    socialLinks: {
      x: 'https://x.com/DjokerNole',
      instagram: 'https://instagram.com/djokernole',
    },
    agencyDetails: {
      agentName: 'Edoardo Artaldi / Mark Madden',
      agencyName: 'IMG Tennis',
      bookingFeeRange: '$600,000 - $1,500,000',
      preferredEvents: ['Sports Leadership Keynotes', 'Wellness & High Performance Summits', 'Charity Exhibitions'],
    }
  },
  {
    id: 'meryl-streep',
    fullName: 'Mary Louise Streep',
    knownAs: 'Meryl Streep',
    occupation: ['Actress', 'Singer', 'Film Producer'],
    industry: 'Hollywood',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Meryl_Streep_december_2011.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Meryl_Streep_december_2011.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    shortTagline: '3-Time Oscar Winner & 21-Time Academy Award Nominee — The Greatest Actress of Her Generation',
    isAvailableForHiring: true,
    activeYears: '1975–Present',
    netWorth: '$160 Million',
    height: "5'6\" (168 cm)",
    birthDetails: {
      dateOfBirth: 'June 22, 1949',
      placeOfBirth: 'Summit, New Jersey, USA',
      age: 76,
      zodiacSign: 'Cancer',
      nationality: 'American',
    },
    familyDetails: {
      parents: ['Harry William Streep Jr. (Pharmaceutical Executive)', 'Mary Wilkinson Streep (Commercial Artist)'],
      spouseOrPartner: 'Don Gummer (m. 1978 - Sep)',
      children: ['Henry Gummer', 'Mamie Gummer', 'Grace Gummer', 'Louisa Jacobson'],
      siblings: ['Harry Streep III', 'Dana Streep'],
    },
    biography: {
      summary: 'Meryl Streep is widely described as "the best actress of her generation". She holds the record for the most Academy Award nominations of any actor in history with 21 nominations.',
      earlyLife: 'Received her BA in drama from Vassar College and MFA from the Yale School of Drama before breaking onto Broadway in the mid-1970s.',
      careerHighlights: 'Won Academy Awards for "Kramer vs. Kramer" (1979), "Sophie\'s Choice" (1982), and "The Iron Lady" (2011). Beloved for iconic roles in "The Devil Wears Prada", "Mamma Mia!", and "Doubt".',
      philanthropicWork: 'Spokesperson for the National Women\'s History Museum and supporter of Artists for Peace and Justice.',
      famousQuote: 'Start by doing what\'s necessary; then do what\'s possible; and suddenly you are doing the impossible.',
    },
    films: [
      {
        id: 'film-ms1',
        movieName: 'The Devil Wears Prada',
        releaseDate: 'June 30, 2006',
        year: 2006,
        role: 'Miranda Priestly',
        director: 'David Frankel',
        genre: ['Comedy', 'Drama'],
        boxOffice: '$326.7 Million',
        rating: '6.9',
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
        synopsis: 'A smart but sensible new graduate lands a job as an assistant to Miranda Priestly, the demanding editor-in-chief of a high-fashion magazine.',
      }
    ],
    awards: [
      { id: 'aw-ms1', awardName: 'Academy Award (3-Time Winner)', year: 2012, category: 'Best Actress in a Leading Role', project: 'The Iron Lady / Sophie\'s Choice / Kramer vs. Kramer', status: 'Won', iconType: 'oscar' },
      { id: 'aw-ms2', awardName: 'Golden Globe Award (9-Time Winner)', year: 2017, category: 'Cecil B. DeMille Lifetime Achievement Award', project: 'Career', status: 'Won', iconType: 'golden-globe' },
    ],
    titles: [
      { id: 'tt-ms1', titleName: 'Presidential Medal of Freedom', yearWon: 2014, conferredBy: 'President Barack Obama', description: 'The highest civilian honor in the United States.' },
    ],
    socialPosts: [
      {
        id: 'sp-ms1',
        platform: 'X',
        handle: '@MerylStreepPage',
        postDate: '5 days ago',
        content: 'Honored to support female playwrights and theatrical storytellers at tonight\'s annual gala.',
        likesCount: 540000,
        commentsCount: 12000,
        sharesCount: 38000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gms-1', title: 'Presidential Medal of Freedom Ceremony', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85', caption: 'Meryl Streep receiving the Medal of Freedom at the White House.', category: 'Events' }
    ],
    socialLinks: {
      website: 'https://merylstreeponline.net',
    },
    agencyDetails: {
      agentName: 'Kevin Huvane / CAA',
      agencyName: 'CAA',
      bookingFeeRange: '$800,000 - $2,000,000',
      preferredEvents: ['Film Acting Masterclasses', 'Women in Arts & Leadership Galas', 'Honorary Cinema Tributes'],
    }
  },
  {
    id: 'shah-rukh-khan',
    fullName: 'Shah Rukh Khan',
    knownAs: 'SRK (King Khan / The Baadshah of Bollywood)',
    occupation: ['Actor', 'Film Producer', 'Co-Owner Kolkata Knight Riders', 'Global Icon'],
    industry: 'Indian Cinema',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_HNS_content_10.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_HNS_content_10.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Padma Shri Winner & Global Cinema Icon with over 3 Billion Fans Worldwide',
    isAvailableForHiring: true,
    activeYears: '1988–Present',
    netWorth: '$870 Million',
    height: "5'8\" (173 cm)",
    birthDetails: {
      dateOfBirth: 'November 2, 1965',
      placeOfBirth: 'New Delhi, India',
      age: 60,
      zodiacSign: 'Scorpio',
      nationality: 'Indian',
    },
    familyDetails: {
      parents: ['Meer Taj Mohammed Khan (Father - Freedom Fighter)', 'Lateef Fatima Khan (Mother)'],
      spouseOrPartner: 'Gauri Khan (m. 1991)',
      children: ['Aryan Khan (b. 1997)', 'Suhana Khan (b. 2000)', 'AbRam Khan (b. 2013)'],
      siblings: ['Shahnaz Lalarukh Khan (Sister)'],
    },
    biography: {
      summary: 'Shah Rukh Khan, often referred to as "SRK" or the "Baadshah of Bollywood", is one of the most successful and culturally influential film stars in global cinema history with over 90 feature films.',
      earlyLife: 'Born in New Delhi, SRK earned a bachelor\'s degree in Economics from Hansraj College and studied Mass Communication at Jamia Millia Islamia before moving to Mumbai to pursue acting.',
      careerHighlights: 'Star of record-breaking blockbusters Dilwale Dulhania Le Jayenge, Jawan, Pathaan, Kuch Kuch Hota Hai, and Swades. Recipient of 14 Filmfare Awards and France\'s highest civilian honor, Légion d\'Honneur.',
      philanthropicWork: 'Founder of MEER Foundation, supporting female acid attack survivors, pediatric healthcare, and COVID-19 relief initiatives.',
      famousQuote: 'There is only one religion in the world and that is hard work.',
    },
    films: [
      {
        id: 'film-srk1',
        movieName: 'Jawan',
        releaseDate: 'September 7, 2023',
        year: 2023,
        role: 'Vikram Rathore / Azad',
        director: 'Atlee',
        genre: ['Action', 'Thriller', 'Drama'],
        boxOffice: '₹1,150 Crore ($140 Million)',
        rating: '7.0',
        posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
        synopsis: 'A high-octane action thriller outlining the emotional journey of a man set out to rectify the wrongs in society.',
      },
      {
        id: 'film-srk2',
        movieName: 'Dilwale Dulhania Le Jayenge',
        releaseDate: 'October 20, 1995',
        year: 1995,
        role: 'Raj Malhotra',
        director: 'Aditya Chopra',
        genre: ['Romance', 'Drama'],
        boxOffice: '₹200 Crore (Historical Legend)',
        rating: '8.0',
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
        synopsis: 'The longest-running film in Indian cinema history following Raj and Simran falling in love across Europe and Punjab.',
      }
    ],
    awards: [
      { id: 'aw-srk1', awardName: 'Padma Shri', year: 2005, category: 'Fourth Highest Civilian Award in India', project: 'Government of India', status: 'Won', iconType: 'trophy' },
      { id: 'aw-srk2', awardName: 'Filmfare Best Actor Award (8-Time Winner)', year: 2011, category: 'Best Actor in a Leading Role', project: 'My Name Is Khan / Swades / Devdas / DDLJ', status: 'Won', iconType: 'trophy' },
      { id: 'aw-srk3', awardName: 'Légion d\'honneur', year: 2014, category: 'Officer of the Legion of Honour', project: 'Government of France', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-srk1', titleName: 'Global Diversity Award & UNESCO Pyramide con Marni', yearWon: 2011, conferredBy: 'UNESCO & British Parliament', description: 'Honored for philanthropic leadership and championing children\'s education.' },
      { id: 'tt-srk2', titleName: 'Dadasaheb Phalke International Film Festival Best Actor', yearWon: 2024, conferredBy: 'DPIFF India', description: 'Awarded Best Actor for Jawan.' },
    ],
    socialPosts: [
      {
        id: 'sp-srk1',
        platform: 'X',
        handle: '@iamsrk',
        postDate: '1 day ago',
        content: 'Love to everyone who showed up at Mannat today! Your warmth and love keep my heart beating strong. Big hug to all! ❤️✨',
        likesCount: 3200000,
        commentsCount: 85000,
        sharesCount: 190000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gsrk-1', title: 'Mannat Wave to Fans', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85', caption: 'Shah Rukh Khan greeting thousands of fans outside his Mumbai residence.', category: 'Events' }
    ],
    socialLinks: {
      x: 'https://x.com/iamsrk',
      instagram: 'https://instagram.com/iamsrk',
      facebook: 'https://facebook.com/IamSRK',
    },
    agencyDetails: {
      agentName: 'Red Chillies Entertainment & Talent Team',
      agencyName: 'Red Chillies Talent Management',
      bookingFeeRange: '$1,000,000 - $3,000,000',
      preferredEvents: ['Global Brand Keynotes', 'Stadium Keynote Appearances', 'International Film Festival Galas'],
    }
  },
  {
    id: 'virat-kohli',
    fullName: 'Virat Kohli',
    knownAs: 'Virat Kohli (King Kohli)',
    occupation: ['International Cricketer', 'Former India Captain', 'Youth Icon'],
    industry: 'Indian Sports',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_product_launch_2023.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_product_launch_2023.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'ICC T20 World Cup Champion & Record 80+ International Centuries Scorer',
    isAvailableForHiring: true,
    activeYears: '2008–Present',
    netWorth: '$125 Million',
    height: "5'9\" (175 cm)",
    birthDetails: {
      dateOfBirth: 'November 5, 1988',
      placeOfBirth: 'New Delhi, India',
      age: 37,
      zodiacSign: 'Scorpio',
      nationality: 'Indian',
    },
    familyDetails: {
      parents: ['Prem Kohli (Father - Criminal Lawyer)', 'Saroj Kohli (Mother - Homemaker)'],
      spouseOrPartner: 'Anushka Sharma (m. 2017)',
      children: ['Vamika Kohli (b. 2021)', 'Akaay Kohli (b. 2024)'],
      siblings: ['Vikas Kohli (Brother)', 'Bhawna Kohli Dhingra (Sister)'],
    },
    biography: {
      summary: 'Virat Kohli is one of the most dominant and respected batsmen in the history of cricket. He holds the record for the fastest player to reach 10,000, 11,000, 12,000, and 13,000 ODI runs.',
      earlyLife: 'Raised in Uttam Nagar, Delhi, Kohli trained at West Delhi Cricket Academy and captained India to victory at the 2008 Under-19 Cricket World Cup.',
      careerHighlights: 'Winner of the 2011 ICC Cricket World Cup, 2013 Champions Trophy, and 2024 T20 World Cup. Awarded ICC ODI Player of the Decade and ICC Player of the Year multiple times.',
      philanthropicWork: 'Founder of the Virat Kohli Foundation, supporting underprivileged youth sports scholarships, animal welfare shelters, and healthcare programs.',
      famousQuote: 'Self-belief and hard work will always earn you success.',
    },
    films: [
      {
        id: 'film-vk1',
        movieName: 'Mega Icon: Virat Kohli (National Geographic)',
        releaseDate: 'September 2018',
        year: 2018,
        role: 'Himself',
        director: 'National Geographic India',
        genre: ['Documentary', 'Sports'],
        boxOffice: 'Television Premiere Leader',
        rating: '8.4',
        posterUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
        synopsis: 'An inside look into the psychological grit, training, and journey of India\'s legendary cricket captain.',
      }
    ],
    awards: [
      { id: 'aw-vk1', awardName: 'Padma Shri', year: 2017, category: 'India Fourth Highest Civilian Honor', project: 'Government of India', status: 'Won', iconType: 'trophy' },
      { id: 'aw-vk2', awardName: 'Major Dhyan Chand Khel Ratna', year: 2018, category: 'India Highest Sports Honor', project: 'Ministry of Youth Affairs & Sports', status: 'Won', iconType: 'trophy' },
      { id: 'aw-vk3', awardName: 'Arjuna Award', year: 2013, category: 'Outstanding Sports Performance', project: 'BCCI / Govt of India', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-vk1', titleName: 'ICC Male Cricketer of the Decade (Sir Garfield Sobers Trophy)', yearWon: 2020, conferredBy: 'International Cricket Council', description: 'Recognized as the premier cricketer worldwide from 2011 to 2020.' },
    ],
    socialPosts: [
      {
        id: 'sp-vk1',
        platform: 'Instagram',
        handle: '@virat.kohli',
        postDate: '3 hours ago',
        content: 'Grateful for the grind, the journey, and the incredible support from fans across India and the globe! Stay focused, stay hungry. 🇮🇳🏏',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
        likesCount: 12400000,
        commentsCount: 190000,
        sharesCount: 450000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gvk-1', title: 'T20 World Cup 2024 Triumph', imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=85', caption: 'Virat Kohli celebrating with the Indian National Flag after winning the T20 World Cup final.', category: 'Events' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/virat.kohli',
      x: 'https://x.com/imVkohli',
      facebook: 'https://facebook.com/virat.kohli',
    },
    agencyDetails: {
      agentName: 'Cornerstone Sport & Entertainment',
      agencyName: 'Cornerstone Talent Management',
      bookingFeeRange: '$800,000 - $2,000,000',
      preferredEvents: ['Global Fitness & Sport Brand Partnerships', 'Leadership Summits', 'Youth Sports Initiatives'],
    }
  },
  {
    id: 'amitabh-bachchan',
    fullName: 'Amitabh Bachchan',
    knownAs: 'Big B (The Star of the Millennium)',
    occupation: ['Actor', 'Television Host', 'Producer', 'Poet'],
    industry: 'Indian Cinema',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/9/91/AMITABH_BACHCHAN.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/9/91/AMITABH_BACHCHAN.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Padma Vibhushan & Dadasaheb Phalke Awardee — The Living Legend of Indian Cinema',
    isAvailableForHiring: true,
    activeYears: '1969–Present',
    netWorth: '$400 Million',
    height: "6'2\" (188 cm)",
    birthDetails: {
      dateOfBirth: 'October 11, 1942',
      placeOfBirth: 'Allahabad, United Provinces, British India',
      age: 83,
      zodiacSign: 'Libra',
      nationality: 'Indian',
    },
    familyDetails: {
      parents: ['Harivansh Rai Bachchan (Father - Legendary Hindi Poet)', 'Teji Bachchan (Mother - Social Activist)'],
      spouseOrPartner: 'Jaya Bachchan (m. 1973)',
      children: ['Abhishek Bachchan (b. 1976)', 'Shweta Bachchan-Nanda (b. 1974)'],
      siblings: ['Ajitabh Bachchan (Brother)'],
    },
    biography: {
      summary: 'Amitabh Bachchan is widely regarded as one of the most influential actors in the history of Indian cinema, dubbed the "Angry Young Man" of 1970s Bollywood and host of Kaun Banega Crorepati.',
      earlyLife: 'Educated at Sherwood College, Nainital, and Kirori Mal College, Delhi University. Worked as a freight broker in Kolkata before moving to Mumbai to pursue acting.',
      careerHighlights: 'Star of over 200 films including Sholay, Deewaar, Zanjeer, Black, Piku, and Kalki 2898 AD. Recipient of 4 National Film Awards and BBC\'s "Star of the Millennium".',
      philanthropicWork: 'UNICEF Goodwill Ambassador for Polio Eradication, debt relief patron for thousands of Indian farmers, and active contributor to disaster relief funds.',
      famousQuote: 'Change is the nature of life, but challenge is the future of life.',
    },
    films: [
      {
        id: 'film-ab1',
        movieName: 'Kalki 2898 AD',
        releaseDate: 'June 27, 2024',
        year: 2024,
        role: 'Ashwatthama',
        director: 'Nag Ashwin',
        genre: ['Sci-Fi', 'Action', 'Mythology'],
        boxOffice: '₹1,050 Crore ($125 Million)',
        rating: '7.6',
        posterUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
        synopsis: 'An epic futuristic retelling of Indian mythology where Ashwatthama protects the unborn child Kalki.',
      }
    ],
    awards: [
      { id: 'aw-ab1', awardName: 'Dadasaheb Phalke Award', year: 2018, category: 'India Highest Award in Cinema', project: 'Government of India', status: 'Won', iconType: 'trophy' },
      { id: 'aw-ab2', awardName: 'Padma Vibhushan', year: 2015, category: 'Second-Highest Civilian Award in India', project: 'Government of India', status: 'Won', iconType: 'trophy' },
      { id: 'aw-ab3', awardName: 'National Film Award (4-Time Best Actor)', year: 2016, category: 'Best Actor', project: 'Agneepath / Black / Paa / Piku', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-ab1', titleName: 'Knight of the Legion of Honour (France)', yearWon: 2007, conferredBy: 'Government of France', description: 'Highest French civilian honor for exceptional contribution to cinema.' },
    ],
    socialPosts: [
      {
        id: 'sp-ab1',
        platform: 'X',
        handle: '@SrBachchan',
        postDate: '12 hours ago',
        content: 'T 4920 - Back on set with the magic of storytelling. Grateful for the love, health, and endless blessing of family and fans. Gratitude 🙏',
        likesCount: 180000,
        commentsCount: 14000,
        sharesCount: 22000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gab-1', title: 'Sunday Jalsa Greeting', imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=85', caption: 'Amitabh Bachchan greeting fans at his residence Jalsa in Mumbai.', category: 'Events' }
    ],
    socialLinks: {
      x: 'https://x.com/SrBachchan',
      instagram: 'https://instagram.com/amitabhbachchan',
    },
    agencyDetails: {
      agentName: 'AB Corp Talent Division',
      agencyName: 'AB Corp Ltd',
      bookingFeeRange: '$500,000 - $1,500,000',
      preferredEvents: ['Cultural & Literary Summits', 'National Cinema Galas', 'Public Health Campaign Ambassadorships'],
    }
  },
  {
    id: 'deepika-padukone',
    fullName: 'Deepika Padukone',
    knownAs: 'Deepika Padukone',
    occupation: ['Actress', 'Producer', 'Entrepreneur', 'Mental Health Advocate'],
    industry: 'Indian Cinema',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Deepika_Padukone_Cannes_2018.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Deepika_Padukone_Cannes_2018.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Cannes Film Festival Jury Member & TIME 100 Most Influential People in the World',
    isAvailableForHiring: true,
    activeYears: '2006–Present',
    netWorth: '$60 Million',
    height: "5'8\" (174 cm)",
    birthDetails: {
      dateOfBirth: 'January 5, 1986',
      placeOfBirth: 'Copenhagen, Denmark',
      age: 40,
      zodiacSign: 'Capricorn',
      nationality: 'Indian',
    },
    familyDetails: {
      parents: ['Prakash Padukone (Father - International Badminton Legend)', 'Ujjala Padukone (Mother - Travel Agent)'],
      spouseOrPartner: 'Ranveer Singh (m. 2018)',
      children: ['Dua Padukone Singh (b. 2024)'],
      siblings: ['Anisha Padukone (Sister - Professional Golfer)'],
    },
    biography: {
      summary: 'Deepika Padukone is one of India\'s highest-paid and most critically acclaimed actresses. She has starred in major hits across Bollywood and Hollywood, and is the founder of the Live Love Laugh Foundation for mental health.',
      earlyLife: 'Born in Copenhagen and raised in Bengaluru, she played competitive badminton at the national level before pursuing fashion modeling and acting.',
      careerHighlights: 'Star of Padmaavat, Bajirao Mastani, Chennai Express, Pathaan, Kalki 2898 AD, and Hollywood blockbuster XXX: Return of Xander Cage. Appointed Louis Vuitton\'s first Indian global ambassador.',
      philanthropicWork: 'Founder of Live Love Laugh Foundation, promoting mental health awareness, counseling, and rural psychiatric healthcare across India.',
      famousQuote: 'To feel comfortable in your own skin is the greatest beauty of all.',
    },
    films: [
      {
        id: 'film-dp1',
        movieName: 'Padmaavat',
        releaseDate: 'January 25, 2018',
        year: 2018,
        role: 'Rani Padmavati',
        director: 'Sanjay Leela Bhansali',
        genre: ['Historical', 'Drama', 'Romance'],
        boxOffice: '₹585 Crore ($80 Million)',
        rating: '7.1',
        posterUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
        synopsis: 'A grand period drama portraying the legendary bravery and devotion of Rajput Queen Padmavati.',
      }
    ],
    awards: [
      { id: 'aw-dp1', awardName: 'Filmfare Award (3-Time Best Actress)', year: 2016, category: 'Best Actress in a Leading Role', project: 'Goliyon Ki Raasleela Ram-Leela / Piku', status: 'Won', iconType: 'trophy' },
      { id: 'aw-dp2', awardName: 'TIME 100 Impact Award', year: 2022, category: 'Global Leadership & Mental Health Advocacy', project: 'Live Love Laugh Foundation', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-dp1', titleName: 'Cannes Film Festival Main Competition Jury Member', yearWon: 2022, conferredBy: 'Festival de Cannes', description: 'Selected for the prestigious 75th Cannes Film Festival official jury.' },
    ],
    socialPosts: [
      {
        id: 'sp-dp1',
        platform: 'Instagram',
        handle: '@deepikapadukone',
        postDate: '1 day ago',
        content: 'Gentle reminder that taking care of your mental wellbeing is as vital as physical health. You are not alone. ❤️ @livelovelaughfdn',
        likesCount: 2800000,
        commentsCount: 32000,
        sharesCount: 75000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gdp-1', title: 'Cannes Red Carpet', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85', caption: 'Deepika Padukone at the 75th Cannes Film Festival red carpet.', category: 'Red Carpet' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/deepikapadukone',
      facebook: 'https://facebook.com/DeepikaPadukone',
    },
    agencyDetails: {
      agentName: 'KWAN / Collective Artists Network',
      agencyName: 'Collective Artists Network',
      bookingFeeRange: '$500,000 - $1,200,000',
      preferredEvents: ['Global Luxury Brand Ambassadorships', 'Mental Health Summits', 'International Film Galas'],
    }
  },
  {
    id: 'prabhas',
    fullName: 'Uppalapati Venkata Suryanarayana Prabhas Raju',
    knownAs: 'Prabhas (Pan-India Rebel Star)',
    occupation: ['Actor', 'Global Cinema Icon'],
    industry: 'Indian Cinema',
    bestViewPhoto: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Prabhas_at_an_interview_for_Saaho.jpg',
    avatarPhoto: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Prabhas_at_an_interview_for_Saaho.jpg',
    coverBannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    shortTagline: 'Star of the $350M+ Baahubali Franchise & Pioneer of Modern Pan-Indian Cinema',
    isAvailableForHiring: true,
    activeYears: '2002–Present',
    netWorth: '$35 Million',
    height: "6'2\" (188 cm)",
    birthDetails: {
      dateOfBirth: 'October 23, 1979',
      placeOfBirth: 'Chennai, Tamil Nadu, India',
      age: 46,
      zodiacSign: 'Scorpio',
      nationality: 'Indian',
    },
    familyDetails: {
      parents: ['Uppalapati Surya Narayana Raju (Father - Film Producer)', 'Siva Kumari (Mother)'],
      notableRelatives: ['Krishnam Raju (Uncle - Legendary Telugu Actor)'],
      siblings: ['Pramod Uppalapati (Brother)', 'Pragathi (Sister)'],
    },
    biography: {
      summary: 'Prabhas is a titan of Indian cinema who redefined the global scale of Indian box office with SS Rajamouli\'s Baahubali series, making him the first true Pan-India superstar.',
      earlyLife: 'Educated at DNR School, Bhimavaram, and Sri Chaitanya College, Hyderabad. Pursued engineering before stepping into Telugu cinema.',
      careerHighlights: 'Lead star of Baahubali: The Beginning, Baahubali 2: The Conclusion (grossing over ₹1,800 crore), Salaar: Part 1 - Ceasefire, and Kalki 2898 AD. First South Indian actor to receive a wax statue at Madame Tussauds Bangkok.',
      philanthropicWork: 'Regular donor to disaster relief funds in Andhra Pradesh and Telangana, supporting flood relief and rural healthcare initiatives.',
      famousQuote: 'Work in silence, let your success make the noise.',
    },
    films: [
      {
        id: 'film-pr1',
        movieName: 'Baahubali 2: The Conclusion',
        releaseDate: 'April 28, 2017',
        year: 2017,
        role: 'Amarendra Baahubali / Mahendra Baahubali',
        director: 'S. S. Rajamouli',
        genre: ['Epic', 'Action', 'Drama'],
        boxOffice: '₹1,810 Crore ($280 Million)',
        rating: '8.2',
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        synopsis: 'The record-shattering epic saga revealing why Kattappa killed Baahubali and the liberation of Mahishmati.',
      }
    ],
    awards: [
      { id: 'aw-pr1', awardName: 'Nandi Award for Best Actor', year: 2013, category: 'Best Actor in Telugu Cinema', project: 'Mirchi', status: 'Won', iconType: 'trophy' },
      { id: 'aw-pr2', awardName: 'ETC Bollywood Business Award', year: 2017, category: 'Highest Grossing Actor', project: 'Baahubali 2', status: 'Won', iconType: 'trophy' },
    ],
    titles: [
      { id: 'tt-pr1', titleName: 'Pan-Indian Rebel Star Title', yearWon: 2017, conferredBy: 'Indian Film Industry & Fans', description: 'Recognized for pioneering the multi-language Pan-India blockbuster format.' },
    ],
    socialPosts: [
      {
        id: 'sp-pr1',
        platform: 'Instagram',
        handle: '@actorprabhas',
        postDate: '2 days ago',
        content: 'Thanking my darling fans for the unending love and energy! Exciting big updates coming soon for my upcoming films. Love you all! ❤️',
        likesCount: 3100000,
        commentsCount: 95000,
        sharesCount: 140000,
        isVerified: true,
      }
    ],
    gallery: [
      { id: 'gpr-1', title: 'Baahubali Premier Event', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85', caption: 'Prabhas addressing fans at the grand pre-release event.', category: 'Events' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/actorprabhas',
      facebook: 'https://facebook.com/ActorPrabhas',
    },
    agencyDetails: {
      agentName: 'UV Creations Management',
      agencyName: 'UV Talent Cell',
      bookingFeeRange: '$600,000 - $1,500,000',
      preferredEvents: ['Pan-India Film Launches', 'Global Action Cinema Keynotes', 'Brand Endorsement Summits'],
    }
  }
];
