import React from 'react';

export default function MovieList(props) {
  const FavComponent = props.favComp; // Capitalize the variable name

  return (
    <div className="d-flex justify-content-start">
      {props.movies && props.movies.length > 0 ? (
        props.movies.map((movie, index) => (
          <div key={index} className='image-container'>
            <img src={movie.Poster} alt="movie" className='posters' />
            <div onClick={() => props.handleFavouriteClick(movie)} className="overlay d-flex align-items-center justify-content-center">
              <FavComponent /> 
            </div>
          </div>
        ))
      ) : (
        <div>No movies found</div>
      )}
    </div>
  );
}
