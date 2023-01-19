import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import PersoneMovies from './components/personeMovies/personeMovies';
import UniqMovies from './components/uniqMovie/uniqMovie';
import UniqMoviesTeater from './components/uniqMoviesTeater/uniqMoviesTeater';
import UniqPersone from './components/uniqPersone/uniqPersone';
import Error from './pages/error';
import HomeWrapper from './pages/homeWrapper';



function App() {
    const [popularMovies, setPopularMovies] = useState([])
    const [popularPersone, setPopularPersone] = useState([])
    const [teaterMovies, setTeaterMovies] = useState([])
    const [teaterPersone, setTeaterPersone] = useState([])

    const fetchMovies = async() => {
    // popular Movies  
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
    //polpular Person
    const responsePerson = await axios.get('https://api.themoviedb.org/3/trending/person/day?api_key=f9fd8699f04bbaf7bf3c77275c0981c9')
    const popularPersone = responsePerson.data.results
    popularPersone.length = 20
    const popularPersoneData = popularPersone.map((persone) => ({
      id: persone.id,
      name: persone.name,
      // character: persone.known_for[0].title,
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
      rating: Math.floor(movie.vote_average)
    }))
    setTeaterMovies([...teaterMovieData])
    // teater person
    const responseTeaterPersone = await axios.get('https://api.themoviedb.org/3/trending/person/week?api_key=f9fd8699f04bbaf7bf3c77275c0981c9')
    const teaterPersone = responseTeaterPersone.data.results
    const teaterPersoneData = teaterPersone.map((persone) => ({
      id: persone.id,
      name: persone.name,
      character: persone.known_for[0].title,
      popularity: Math.floor(persone.popularity),
      img: persone.profile_path
    }))

    setTeaterPersone([...teaterPersoneData])

    }

    useEffect(() => {
      fetchMovies()
    },[])

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<HomeWrapper />}>
          <Route index element={< Home teaterPersone={teaterPersone} teaterMovies={teaterMovies} popularPersone={popularPersone} popularMovies={popularMovies}/>}/>
          <Route path='movies'>
            <Route path=':id' element={<UniqMovies />} />
          </Route>
          <Route path='persone'>
            <Route path=':id' element={<UniqPersone />} />
          </Route>
          <Route path='moviesTeater'>
            <Route path=':id' element={<UniqMoviesTeater />} />
          </Route>
          <Route path='personeMovies'>
            <Route path=':id' element={<PersoneMovies />} />
          </Route>
        </Route>
        <Route path='*' element={< Error />} />
      </Routes>
    </div>
  );
}

export default App;
