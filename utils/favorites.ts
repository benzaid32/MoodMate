// Mock data for favorites
let mockFavorites = [
  {
    id: 'm2',
    title: 'Rainy Day in New York',
    director: 'Woody Allen',
    year: 2019,
    duration: '92 min',
    genre: 'Comedy, Romance',
    rating: '4.2',
    description: 'A young couple arrives in New York for a weekend where they are met with bad weather and a series of adventures.',
    imageUrl: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'movie',
  },
  {
    id: 's1',
    title: 'Summer Breeze',
    artist: 'The Ocean Waves',
    duration: '3:42',
    genre: 'Indie Pop',
    album: 'Coastal Memories',
    rating: '4.7',
    description: 'An upbeat summer anthem that captures the feeling of a perfect day at the beach with friends.',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    type: 'music',
  },
];

export const getFavorites = async (userId: string) => {
  // In a real app, we would fetch this from the database
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockFavorites;
};

export const saveToFavorites = async (userId: string, item: any, type: 'movie' | 'music') => {
  // In a real app, we would save this to the database
  
  // Make sure item has a type
  const itemWithType = { ...item, type };
  
  // Check if item already exists in favorites
  const exists = mockFavorites.some(fav => fav.id === item.id);
  
  if (!exists) {
    mockFavorites = [...mockFavorites, itemWithType];
  }
  
  return { success: true };
};

export const removeFromFavorites = async (userId: string, itemId: string) => {
  // In a real app, we would remove this from the database
  
  // Filter out the item to remove
  mockFavorites = mockFavorites.filter(item => item.id !== itemId);
  
  return { success: true };
};