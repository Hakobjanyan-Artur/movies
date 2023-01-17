import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import HomeWrapper from './pages/homeWrapper';



function App() {
    const [popularMovies, setPopularMovies] = useState([])
    const [popularPersone, setPopularPersone] = useState([])
    const [teaterMovies, setTeaterMovies] = useState([])

    const fetchMovies = async() => {
    // popularMovies  
    const responsemovies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f9fd8699f04bbaf7bf3c77275c0981c9&language=en-US&page=1')
    const popularMovies = responsemovies.data.results
    const popularMovData = popularMovies.map((movies) => ({
      id: movies.id,
      backDrop: movies.backdrop_path,
      poster: movies.poster_path,
      original_title: movies.original_title,
      title: movies.title,
      data_release: movies.release_date,
      about: movies.overview,
      rating: movies.vote_average
    })) 
    setPopularMovies([...popularMovData])
    //polpularPerson
    const responsePerson = await axios.get('https://api.themoviedb.org/3/trending/person/day?api_key=f9fd8699f04bbaf7bf3c77275c0981c9')
    const popularPersone = responsePerson.data.results
    popularPersone.length = 20
    const popularPersoneData = popularPersone.map((persone) => ({
      id: persone.id,
      name: persone.name,
      character: persone.known_for[0].title,
      popularity: Math.floor(persone.popularity),
      img: persone.profile_path
    }))
    setPopularPersone([...popularPersoneData])
    // teater movies
    const responseTeaterMovies = await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=f9fd8699f04bbaf7bf3c77275c0981c9')
    const teaterMovies = responseTeaterMovies.data.results
    const teaterMovieData = teaterMovies.map((movie) => ({
      id: movie.id,
      backDrop: movie.backdrop_path,
      poster: movie.poster_path,
      title: movie.name,
      data_release: movie.first_air_date,
      about: movie.overview,
      rating: movie.vote_average
    }))
    setTeaterMovies([...teaterMovieData])
    }

    useEffect(() => {
      fetchMovies()
    },[])

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<HomeWrapper />}>
          <Route index element={< Home teaterMovies={teaterMovies} popularPersone={popularPersone} popularMovies={popularMovies}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
