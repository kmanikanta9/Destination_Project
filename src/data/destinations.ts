export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  category: string[];
  budget: 'low' | 'medium' | 'high';
  bestTimeToVisit: string;
  activities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  averageRating: number;
  reviewCount: number;
  highlights: string[];
  estimatedDays: number;
  travelStyle: string[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    description: 'A stunning Greek island known for its white-washed buildings, blue domes, and breathtaking sunsets over the Aegean Sea.',
    image: 'https://images.pexels.com/photos/161901/santorini-oia-greece-island-161901.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['romantic', 'culture', 'relaxation'],
    budget: 'high',
    bestTimeToVisit: 'April - October',
    activities: ['sunset viewing', 'wine tasting', 'beach relaxation', 'photography'],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    averageRating: 4.8,
    reviewCount: 1250,
    highlights: ['Oia Sunset', 'Red Beach', 'Ancient Akrotiri'],
    estimatedDays: 4,
    travelStyle: ['romantic', 'luxury', 'couples']
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Ancient capital of Japan featuring thousands of temples, traditional wooden houses, and beautiful gardens.',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['culture', 'history', 'spiritual'],
    budget: 'medium',
    bestTimeToVisit: 'March - May, September - November',
    activities: ['temple visits', 'tea ceremonies', 'garden walks', 'traditional dining'],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    averageRating: 4.7,
    reviewCount: 980,
    highlights: ['Fushimi Inari Shrine', 'Bamboo Grove', 'Golden Pavilion'],
    estimatedDays: 5,
    travelStyle: ['cultural', 'solo', 'spiritual']
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, ancient temples, lush rice terraces, and vibrant culture.',
    image: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['adventure', 'relaxation', 'culture'],
    budget: 'low',
    bestTimeToVisit: 'April - September',
    activities: ['surfing', 'temple visits', 'yoga retreats', 'volcano hiking'],
    coordinates: { lat: -8.3405, lng: 115.0920 },
    averageRating: 4.6,
    reviewCount: 1500,
    highlights: ['Uluwatu Temple', 'Rice Terraces', 'Mount Batur'],
    estimatedDays: 7,
    travelStyle: ['adventure', 'budget', 'spiritual']
  },
  {
    id: '4',
    name: 'New York City',
    country: 'USA',
    description: 'The city that never sleeps, offering world-class museums, Broadway shows, iconic landmarks, and diverse cuisine.',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['urban', 'culture', 'entertainment'],
    budget: 'high',
    bestTimeToVisit: 'April - June, September - November',
    activities: ['museum visits', 'Broadway shows', 'shopping', 'dining'],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    averageRating: 4.5,
    reviewCount: 2100,
    highlights: ['Central Park', 'Statue of Liberty', 'Times Square'],
    estimatedDays: 6,
    travelStyle: ['urban', 'luxury', 'cultural']
  },
  {
    id: '5',
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'Ancient Incan citadel set high in the Andes Mountains, offering breathtaking views and rich history.',
    image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['adventure', 'history', 'hiking'],
    budget: 'medium',
    bestTimeToVisit: 'May - September',
    activities: ['hiking', 'archaeology tours', 'photography', 'cultural experiences'],
    coordinates: { lat: -13.1631, lng: -72.5450 },
    averageRating: 4.9,
    reviewCount: 850,
    highlights: ['Inca Trail', 'Huayna Picchu', 'Sacred Valley'],
    estimatedDays: 4,
    travelStyle: ['adventure', 'cultural', 'hiking']
  },
  {
    id: '6',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, renowned for its art, fashion, gastronomy, and iconic landmarks like the Eiffel Tower.',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['romantic', 'culture', 'art'],
    budget: 'high',
    bestTimeToVisit: 'April - June, September - October',
    activities: ['museum visits', 'café culture', 'shopping', 'architecture tours'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    averageRating: 4.7,
    reviewCount: 1800,
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
    estimatedDays: 5,
    travelStyle: ['romantic', 'luxury', 'cultural']
  },
  {
    id: '7',
    name: 'Dubai',
    country: 'UAE',
    description: 'Modern metropolis known for luxury shopping, ultramodern architecture, and vibrant nightlife scene.',
    image: 'https://images.pexels.com/photos/1707310/pexels-photo-1707310.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['luxury', 'urban', 'shopping'],
    budget: 'high',
    bestTimeToVisit: 'November - March',
    activities: ['shopping', 'desert safari', 'luxury dining', 'architecture tours'],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    averageRating: 4.4,
    reviewCount: 1200,
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah'],
    estimatedDays: 4,
    travelStyle: ['luxury', 'urban', 'shopping']
  },
  {
    id: '8',
    name: 'Iceland',
    country: 'Iceland',
    description: 'Land of fire and ice, featuring dramatic landscapes, geysers, waterfalls, and the Northern Lights.',
    image: 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: ['adventure', 'nature', 'photography'],
    budget: 'high',
    bestTimeToVisit: 'June - August, September - March (Northern Lights)',
    activities: ['northern lights viewing', 'glacier hiking', 'hot springs', 'photography'],
    coordinates: { lat: 64.9631, lng: -19.0208 },
    averageRating: 4.8,
    reviewCount: 750,
    highlights: ['Blue Lagoon', 'Golden Circle', 'Northern Lights'],
    estimatedDays: 6,
    travelStyle: ['adventure', 'nature', 'photography']
  }
];

export const trendingDestinations = destinations.slice(0, 4);