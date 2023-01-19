import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UniqMoviePersonSwipe from '../uniqMoviesActorsSwipe/uniqMoviesActorsSwipe'
import UniqMovieTrailers from '../uniqMovietrailers/uniqMovieTrailers'
import './personeMovies.css'

function PersoneMovies() {
    const {id} = useParams()
    const [personeMovies, setPersoneMovies] = useState()

    const fetchPersoneMovies = async() => {
        const responseMovies = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f9fd8699f04bbaf7bf3c77275c0981c9&language=en-US`)
        const personeMovies = responseMovies.data
        const personeMoviesData = {
            id: personeMovies.id,
              title: personeMovies.title,
              dataYear: personeMovies.release_date.slice(0, 4),
              dataRelease: personeMovies.release_date,
              genres: personeMovies.genres, // array
              overview: personeMovies.overview,
              status: personeMovies.status,
              originalLanguage: personeMovies.original_language,
              budget: personeMovies.budget,
              revenue: personeMovies.revenue,
              backgruondImg: personeMovies.backdrop_path,
              poster: personeMovies.poster_path 

        }
        setPersoneMovies(personeMoviesData)
    }

    useEffect(() => {
        if (id) {
            fetchPersoneMovies()
        }
    }, [])
    
    return (
        <div className='uniq-movies'>
            <div
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(1, 25, 45, 0.6), rgba(1, 25, 45, 0.6)), url(https://image.tmdb.org/t/p/w200/${personeMovies?.backgruondImg})`
                }}
                className='header'>    
                <div className='container'>
                    <div className='container-header'>
                        <div className='uniq-movies-header-left'>
                            <img className='header-img' src={`https://image.tmdb.org/t/p/w200/${personeMovies?.poster}`} alt="" />
                        </div>
                        <div className='uniq-movies-header-right'>
                            <div className='header-title'>
                                <h1>{personeMovies?.title}</h1> 
                                <span className='year'>({personeMovies?.dataYear})</span>
                            </div>
                            <div className='header-data'>
                                <span className='data'>{personeMovies?.dataRelease}</span> |
                                {personeMovies?.genres.map(el => <span key={el?.id}>{el?.name}</span>)}

                            </div>
                            <h3>Overview</h3>
                            <div className='header-overview'>
                                <p>{personeMovies?.overview}</p>
                            </div>
                            <div className='header-status'>
                                <div className='status header-status-flex'>
                                    <h3>Status</h3>
                                    <h4>{personeMovies?.status}</h4>
                                </div>
                                <div className='language'>
                                    <h3>Original Language</h3>
                                    <h4>{personeMovies?.originalLanguage}</h4>
                                </div>
                                <div className='Budget'>
                                    <h3>Budget</h3>
                                    <h4>{personeMovies?.budget}</h4>
                                </div>
                                <div className='Revenue'>
                                    <h3>Revenue</h3>
                                    <h4>{personeMovies?.revenue}</h4>
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
                    <div className='sectiov-movies'>
                        <div className='section-actors-title'>
                            <h2>Movie video</h2>
                        </div>
                    <div className='section-videos-content'>
                            <UniqMovieTrailers id={id} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PersoneMovies