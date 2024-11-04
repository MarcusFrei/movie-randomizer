// import { useState } from 'react';
// import { Movie, Season } from '../../types';

// export const useSeasonManager = () => {
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

//   const handleImageClick = (movie: Movie) => {
//     setCurrentMovie(movie);
//     setIsImageModalOpen(true);
//   };

//   const handleImageModalClose = () => {
//     setIsImageModalOpen(false);
//   };

//   const handleSeasonUpdate = (
//     updatedSeasons: Season[],
//     movies: Movie[],
//     setMovies: (movies: Movie[]) => void
//   ) => {
//     if (currentMovie) {
//       const updatedMovie = {
//         ...currentMovie,
//         seasons: updatedSeasons,
//       };

//       const updatedMovies = movies.map((movie) =>
//         movie.id === currentMovie.id ? updatedMovie : movie
//       );

//       setMovies(updatedMovies);
//       setIsImageModalOpen(false);
//     }
//   };

//   return {
//     isImageModalOpen,
//     currentMovie,
//     handleImageClick,
//     handleImageModalClose,
//     handleSeasonUpdate,
//   };
// };
