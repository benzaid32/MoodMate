// Mock data for recommendations
const mockMovies = [
  {
    id: 'm1',
    title: 'The Midnight Sky',
    director: 'George Clooney',
    year: 2020,
    duration: '118 min',
    genre: 'Sci-Fi, Drama',
    rating: '5.0',
    description: 'A lone scientist in the Arctic races to contact a crew of astronauts returning home to a mysterious global catastrophe.',
    imageUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
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
  },
  {
    id: 'm3',
    title: 'Sunset Boulevard',
    director: 'Billy Wilder',
    year: 1950,
    duration: '110 min',
    genre: 'Drama, Film-Noir',
    rating: '4.8',
    description: 'A screenwriter is hired to rework a faded silent film star\'s script, only to find himself developing a dangerous relationship.',
    imageUrl: 'https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'm4',
    title: 'Neon Nights',
    director: 'Anna Rodriguez',
    year: 2022,
    duration: '125 min',
    genre: 'Thriller, Action',
    rating: '4.6',
    description: 'A detective investigates a series of murders in a city where it never stops raining, and the neon lights never go out.',
    imageUrl: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'm5',
    title: 'Morning Joy',
    director: 'Michael Chen',
    year: 2021,
    duration: '105 min',
    genre: 'Drama, Family',
    rating: '4.3',
    description: 'A family rediscovers what truly matters while spending a summer in a small coastal town.',
    imageUrl: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const mockMusic = [
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
  },
  {
    id: 's2',
    title: 'Rainy Reflections',
    artist: 'Echo Chamber',
    duration: '4:15',
    genre: 'Lo-fi, Ambient',
    album: 'Weather Patterns',
    rating: '4.5',
    description: 'A soothing melody perfect for rainy days, studying, or quiet contemplation.',
    imageUrl: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 's3',
    title: 'Midnight Drive',
    artist: 'Neon Pulse',
    duration: '3:55',
    genre: 'Synthwave, Electronic',
    album: 'After Hours',
    rating: '4.8',
    description: 'An energetic electronic track that captures the essence of driving through a city at night.',
    imageUrl: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 's4',
    title: 'Morning Serenity',
    artist: 'Daybreak Collective',
    duration: '4:30',
    genre: 'Classical, New Age',
    album: 'First Light',
    rating: '4.6',
    description: 'A peaceful piano composition designed to bring calm and clarity to your morning routine.',
    imageUrl: 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 's5',
    title: 'Electric Storm',
    artist: 'Thunder & Lightning',
    duration: '5:10',
    genre: 'Rock, Alternative',
    album: 'Weather Systems',
    rating: '4.4',
    description: 'A powerful rock anthem with driving guitars and thunderous drums, perfect for workouts or when you need motivation.',
    imageUrl: 'https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Function to simulate getting recommendations from GPT-4
export const generateMovieRecommendations = async (mood: any, weather: any, filters: any) => {
  // In a real app, we would call the OpenAI API here
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return random selection of mock movies
  const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

export const generateMusicRecommendations = async (mood: any, weather: any, filters: any) => {
  // In a real app, we would call the OpenAI API here
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return random selection of mock music
  const shuffled = [...mockMusic].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

export const fetchRecentRecommendations = async (userId: string) => {
  // In a real app, we would fetch this from the database
  
  // Return a mix of movie and music recommendations
  const movieRecs = mockMovies.slice(0, 2).map(item => ({ ...item, type: 'movie' }));
  const musicRecs = mockMusic.slice(0, 2).map(item => ({ ...item, type: 'music' }));
  
  // Combine and shuffle
  return [...movieRecs, ...musicRecs].sort(() => 0.5 - Math.random());
};