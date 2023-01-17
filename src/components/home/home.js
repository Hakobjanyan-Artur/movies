import { useRef, useState } from 'react'
import MovieSwipper from '../movieSwipper/movieSwipper'
import PersoneSwiper from '../personeSwiper/personeSwiper'
import './home.css'

function Home({popularMovies, popularPersone}) {
    const inputTvRef = useRef(null)
    const [inputColor, setInputColor] = useState(false)
    const toggleTv = () => {
        inputTvRef.current.classList.toggle('input-left')
        inputTvRef.current.classList.toggle('input-container-dropBack')
        setInputColor(!inputColor)
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
                <div className='movies-section'>
                  <MovieSwipper popularMovies={popularMovies} />              
                </div>
                <div className='home-section'>
                    <div className='home-section-title'>
                        <h2>Popular Persons Today</h2>
                    </div>
                    <div className='persone-section'>
                        <PersoneSwiper popularPersone={popularPersone} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home