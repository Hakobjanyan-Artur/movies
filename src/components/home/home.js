import { memo, useRef, useState } from 'react'
import MovieSwipper from '../movieSwipper/movieSwipper'
import PersoneSwiper from '../personeSwiper/personeSwiper'
import TeaterMovieSwiper from '../teaterMovieSwiper/teaterMovieSwiper'
import TeaterPersoneSwiper from '../teaterPersoneSwiper/teaterPersoneSwiper'
import './home.css'

function Home({popularMovies, popularPersone, teaterMovies, teaterPersone, setMoviesId}) {
    const moviesRef = useRef(null)
    const teaterRef = useRef(null)
    const personeRef = useRef(null)
    const teaterPersoneRef = useRef(null)
    const inputTvRef = useRef(null)
    const [inputColor, setInputColor] = useState(false)

    const toggleTv = () => {
        inputTvRef.current.classList.toggle('input-left')
        inputTvRef.current.classList.toggle('input-container-dropBack')
        setInputColor(!inputColor)
        moviesRef.current.classList.toggle('none')
        teaterRef.current.classList.toggle('block')
        personeRef.current.classList.toggle('none')
        teaterPersoneRef.current.classList.toggle('block')
    }
    return (
        <div className='home'>
            <div className='container'>
                <div className='home-header'>
                    <div className='home-header-title'>
                        <h2>Popular Movies Today</h2>
                    </div>
                    <div
                        onClick={toggleTv} 
                        className='tv-teater-input'>
                        <div className='input-container'>
                            <div className='input-container-left'>
                                <h5
                                style={{
                                    color: !inputColor ? '#fff' : '#032541'
                                }}
                                >On TV</h5>
                            </div>
                            <div className='input-container-right'>
                                 <h5
                                 style={{
                                    color: inputColor ? '#fff' : '#032541'
                                }}   
                                 >In Theaters</h5>   
                            </div>
                            <div ref={inputTvRef} className='input-container-dropBack'></div>
                        </div>
                    </div>
                </div>
                <div className='movies'>
                    <div ref={moviesRef} className='movies-section'>
                        <MovieSwipper setMoviesId={setMoviesId} popularMovies={popularMovies} />              
                    </div>
                    <div ref={teaterRef} className='teater'>
                        <div className='teater-movie-section'>
                            <TeaterMovieSwiper teaterMovies={teaterMovies} />
                        </div>
                    </div>
                    <div className='home-section'>
                        <div className='home-section-title'>
                            <h2>Popular Persons Today</h2>
                        </div>
                    <div ref={personeRef} className='persone-section'>
                        <PersoneSwiper popularPersone={popularPersone} />
                    </div>
                    <div ref={teaterPersoneRef} className='teater'>
                         <div className='teater-persone-section'>
                              <TeaterPersoneSwiper teaterPersone={teaterPersone} />  
                         </div>       
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Home)