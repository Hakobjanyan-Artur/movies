import axios from 'axios'
import { memo, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import UniqMoviePersonSwipe from '../uniqMoviesActorsSwipe/uniqMoviesActorsSwipe'
import './uniqMovie.css'
import UniqMovieTrailers from '../uniqMovietrailers/uniqMovieTrailers'

function UniqMovies() {
    const {id} = useParams()
    const [uniqMovie, setUniqMovie] = useState(null)
    
    const fetchUniqMovies = async() => {
        // uniqMovies
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
              originalLanguage: uniqMoviesData.original_language.toUpperCase(),
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

    return(
        <div className='uniq-movies'>
            <div
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(1, 25, 45, 0.6), rgba(1, 25, 45, 0.6)), url(https://image.tmdb.org/t/p/w200/${uniqMovie?.backgruondImg})`
                }}
                className='uniq-m-header'>    
                <div className='container'>
                    <div className='uniq-m-container-header'>
                        <div className='uniq-m-header-left'>
                            <img className='uniq-m-header-img' src={`https://image.tmdb.org/t/p/w200/${uniqMovie?.poster}`} alt="" />
                        </div>
                        <div className='uniq-m-header-right'>
                            <div className='uniq-m-header-title'>
                                <h2>{uniqMovie?.title}</h2> 
                                <span className='uniq-m-header-year'>({uniqMovie?.dataYear})</span>
                            </div>
                            <div className='uniq-m-header-data'>
                                <span className='data'>{uniqMovie?.dataRelease} |</span>
                                {uniqMovie?.genres.map(el => <span key={el?.id}>{el?.name}</span>)}

                            </div>
                            <h3>Overview</h3>
                            <div className='uniq-m-header-overview'>
                                <p>{uniqMovie?.overview}</p>
                            </div>
                            <div className='uniq-m-header-status'>
                                <div className='uniq-m-header-staus-status'>
                                    <h4>Status</h4>
                                    <h6>{uniqMovie?.status}</h6>
                                </div>
                                <div className='language'>
                                    <h4>Original Language</h4>
                                    <h6>{uniqMovie?.originalLanguage}</h6>
                                </div>
                                <div className='Budget'>
                                    <h4>Budget</h4>
                                    <h6>{uniqMovie?.budget}</h6>
                                </div>
                                <div className='Revenue'>
                                    <h4>Revenue</h4>
                                    <h6>{uniqMovie?.revenue}</h6>
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
                    <div className='section-videos'>
                        <div className='section-videos-tltle'>
                            <h2>Videos</h2>
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

export default memo(UniqMovies)