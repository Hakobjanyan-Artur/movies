import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import './uniqTeaterMovieTrailer.css'

function UniqTeaterMovieTrailers({id}) {
    const [trailers, setTrailers] = useState(null)
    const [key, setKey] = useState(null)
    const videoRef = useRef(null)
    const popupRef = useRef(null)

    const fetchTrailer = async() => {
        // uniqTeaterMovieTrailer
        const responseTrailer = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=f9fd8699f04bbaf7bf3c77275c0981c9&language=en-US`)
        const trailer = responseTrailer.data.results
        setTrailers(trailer)  
    }

    useEffect(() => {
        if (id) {
            fetchTrailer()
        }
    },[])

    const popupToggle = (key) => {
        setKey(key)
        popupRef.current.classList.toggle('popup-hiden')
        popupRef.current.classList.toggle('popup')
        setTimeout(() => {
            videoRef.current.classList.toggle('translate')
        }, 500)
    }

    return (
        <div className='trailers'>
            <div ref={popupRef} onClick={() => popupToggle()} className='popup'>
                <div ref={videoRef} className='popup-videos'>
                <ReactPlayer width={'1200px'} height={'720px'} url={`https://www.youtube.com/watch?v=${key}`} />
                </div>
            </div>
            <Swiper
                slidesPerView={2}
                scrollbar={{
                    hide: true,
                }}
                modules={[Scrollbar]}
                className="trailer-Sw"
                >
                {trailers?.map(movies => (
                    <SwiperSlide key={movies?.id}>
                        <div onClick={() => popupToggle(movies.key)} className="content-trailer">
                            <div className="trailer-title">
                                <h2>{movies?.name}</h2>
                            </div>
                            <div className="trailer-video">
                                <ReactPlayer width={'500px'} height={'350px'} url={`https://www.youtube.com/watch?v=${movies?.key}`} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default UniqTeaterMovieTrailers