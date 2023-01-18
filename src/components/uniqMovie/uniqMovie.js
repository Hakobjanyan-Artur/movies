import axios from 'axios'
import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UniqMoviePersonSwipe from '../uniqMoviesActorsSwipe/uniqMoviesActorsSwipe'
import './uniqMovie.css'

function UniqMovies() {
    const {id} = useParams()
    const [uniqMovie, setUniqMovie] = useState(null)
    
    const fetchUniqMovies = async() => {
            const responseUniqMovies = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f9fd8699f04bbaf7bf3c77275c0981c9&language=en-US`)
            const uniqMoviesData = responseUniqMovies.data
            const uniqMovies = {
              id: uniqMoviesData.id,
              title: uniqMoviesData.title,
              dataYear: uniqMoviesData.release_date.slice(0, 4),
              dataRelease: uniqMoviesData.release_date,
              genres: uniqMoviesData.genres, // array
              overview: uniqMoviesData.overview,
              status: uniqMoviesData.status,
              originalLanguage: uniqMoviesData.original_language,
              budget: uniqMoviesData.budget,
              revenue: uniqMoviesData.revenue,
              backgruondImg: uniqMoviesData.backdrop_path,
              poster: uniqMoviesData.poster_path 
              }
              setUniqMovie(uniqMovies)

            }
            useEffect(() => {
                if (id) {
                    fetchUniqMovies()
                }
            }, [])
            console.log(id);

    return(
        <div className='uniq-movies'>
            <div
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(1, 25, 45, 0.6), rgba(1, 25, 45, 0.6)), url(https://image.tmdb.org/t/p/w200/${uniqMovie?.backgruondImg})`
                }}
                className='header'>    
                <div className='container'>
                    <div className='container-header'>
                        <div className='uniq-movies-header-left'>
                            <img className='header-img' src={`https://image.tmdb.org/t/p/w200/${uniqMovie?.poster}`} alt="" />
                        </div>
                        <div className='uniq-movies-header-right'>
                            <div className='header-title'>
                                <h1>{uniqMovie?.title}</h1> 
                                <span className='year'>({uniqMovie?.dataYear})</span>
                            </div>
                            <div className='header-data'>
                                <span className='data'>{uniqMovie?.dataRelease}</span> |
                                {uniqMovie?.genres.map(el => <span key={el.id}>{el.name}</span>)}

                            </div>
                            <h3>Overview</h3>
                            <div className='header-overview'>
                                <p>{uniqMovie?.overview}</p>
                            </div>
                            <div className='header-status'>
                                <div className='status header-status-flex'>
                                    <h3>Status</h3>
                                    <h4>{uniqMovie?.status}</h4>
                                </div>
                                <div className='language'>
                                    <h3>Original Language</h3>
                                    <h4>{uniqMovie?.originalLanguage}</h4>
                                </div>
                                <div className='Budget'>
                                    <h3>Budget</h3>
                                    <h4>{uniqMovie?.budget}</h4>
                                </div>
                                <div className='Revenue'>
                                    <h3>Revenue</h3>
                                    <h4>{uniqMovie?.revenue}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className='container'>
                    <div className='section-actors'>
                        <div className='section-actors-title'>
                            <h2>Actors</h2>
                        </div>
                        <div className='section-actors-swipe'>
                            <UniqMoviePersonSwipe id={id} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default memo(UniqMovies)