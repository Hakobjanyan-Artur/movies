import axios from 'axios'
import { useEffect, useState } from 'react'
import './uniqPersoneSwipe.css'
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { useNavigate } from 'react-router-dom';

function UniqPersoneSwipe({id}) {
    const [personeMovies, setPersoneMovies] = useState([])
    const navigate = useNavigate()

    const fetchPersoneMovies = async() => {
        const responseMovies = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=f9fd8699f04bbaf7bf3c77275c0981c9&language=en-US`)
        const personeMovies = responseMovies.data.cast
        personeMovies.length = 20
        const personeMoviesData = personeMovies.map((movies) => ({
            id: movies.id,
            title: movies.title,
            img: movies.poster_path
        }))
        setPersoneMovies([...personeMoviesData])
    }

    useEffect(() => {
        if (id) {
            fetchPersoneMovies()
        }
    }, [])

    return(
        <div className='uniq-p-swipe'>
            <Swiper
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    750: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    995: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    }
                }}
                scrollbar={{
                    hide: true,
                }}
                modules={[Scrollbar]}
                className="uniq-p-mySw"
                >
                {personeMovies?.map(movies => (
                    <SwiperSlide key={movies?.id}>
                        <div onClick={() => navigate(`/personeMovies/${movies?.id}`)} className="uniq-p-container-Sw">
                            <div className='uniq-p-i-Sw'>
                                <div className="item-p-img-Sw">
                                    <img src={`https://image.tmdb.org/t/p/w200/${movies?.img}`} alt="" /> 
                                </div>
                                <div className="item-title-Sw">
                                    <h4>{movies?.title}</h4>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default UniqPersoneSwipe