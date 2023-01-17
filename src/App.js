import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import HomeWrapper from './pages/homeWrapper';



function App() {
    const [popularMovies, setPopularMovies] = useState([])

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
    
    }

    useEffect(() => {
      fetchMovies()
    },[])

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<HomeWrapper />}>
          <Route index element={< Home popularMovies={popularMovies}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
