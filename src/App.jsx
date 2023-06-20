import React, { useEffect, useState } from "react";
import MovieList from "./Components/MovieList";
import Heading from "./Components/Heading";
import Search from "./Components/Search";
import AddFav from "./Components/AddFav";
import RemoveFav from "./Components/RemoveFav";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [fav, setFav] = useState([]);
  const [search, setSearch] = useState('');

  const getMovieRequest = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=b3d5f52e`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(search);
  }, [search]);
  useEffect(()=>{
    const movieFav = JSON.parse(localStorage.getItem('movies'));
    setFav(movieFav || []);
  },[]);

  const addFavMovie = (movie) => {
    const newFavList = [...fav, movie];
    setFav(newFavList);
  };
  const removeFavMovie = (movie) => {
    const updatedFavList = fav.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
    setFav(updatedFavList);
    saveToLocalStorage(updatedFavList)
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movies', JSON.stringify(items));
  }
  return (
    <>
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mb-4 mt-4">
          <Heading heading="Movies" />
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            handleFavouriteClick={addFavMovie}
            favComp={AddFav}
          />
        </div>
        <div className="row d-flex align-items-center mb-4 mt-4">
          <Heading heading="Favourites" />
        </div>
        <div className="row">
          <MovieList
            movies={fav}
            handleFavouriteClick={removeFavMovie}
            favComp={RemoveFav}
          />
        </div>
      </div>
    </>
  );
}

export default App;
