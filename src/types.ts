export interface Episode {
  id: number;
  isWatched: boolean;
}

export interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  watched: boolean;
  type: 'movie' | 'series';
  seasons?: Season[];
}

export interface Square {
  id: number;
  isWatched: boolean;
}

export interface Season {
  id: number;
  seriesCount: number;
  episodes: Square[];
}
