import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import './teaterMovieSwiper.css'
import { useNavigate } from "react-router-dom";

function TeaterMovieSwiper({teaterMovies}) {
    const navigate = useNavigate()

    return (
        <div className='teaterMovie'>
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
                    940: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                    1200: {
                        slidesPerView: 7,
                        spaceBetween: 30,
                    }
                }}
                scrollbar={{
                    hide: true,
                }}
                modules={[Scrollbar]}
                className="teater-mySwiper"
                >
                {teaterMovies?.map(movies => (
                    <SwiperSlide key={movies?.id}>
                        <div className="teater-movieItem">
                            <div onClick={() => navigate(`/moviesteater/${movies?.id}`)} className="teater-item-container">
                                <div className="teater-item-container-img">
                                    <img src={`https://image.tmdb.org/t/p/w200/${movies?.poster}`} alt="" />
                                    <div
                                        style={{
                                            border: movies?.rating < 5 ? '5px solid red' : movies?.rating > 5 && movies?.rating < 7.5 ? '5px solid yellow' : '5px solid green'
                                        }} 
                                        className='teater-item-rating'>
                                        {movies?.rating}
                                    </div> 
                                </div>
                                <div className="teater-item-title">
                                    <h4>{movies?.title}</h4>
                                </div>
                                <div className='teater-item-about'>
                                    <p>{movies?.about}</p>  
                                </div>
                                <div className='teater-item-date'>
                                    <h5>{movies?.data_release}</h5>  
                                </div> 
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TeaterMovieSwiper