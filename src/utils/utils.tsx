import { Square } from '../types';

const createSquares = (count: number): Square[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    isWatched: false,
  }));

export default createSquares;
