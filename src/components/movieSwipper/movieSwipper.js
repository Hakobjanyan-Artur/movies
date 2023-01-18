import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import './movieSwipper.css'
import "swiper/css";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";


function MovieSwipper({popularMovies, setMoviesId}) {
    const navigate = useNavigate()

    return (
        <div className='movieSwipper'>
        <Swiper
            slidesPerView={7}
            spaceBetween={20}
            scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
            className="mySwiper"
            >
                {popularMovies.map(movies => (
                    <SwiperSlide key={movies.id}>
                        <div className="movieItem">
                            <div onClick={() => navigate(`/movies/${movies.id}`)} className="item-container">
                                <div className="item-container-img">
                                    <img src={`https://image.tmdb.org/t/p/w200/${movies.poster}`} alt="" />
                                    <div
                                        style={{
                                            border: movies.rating < 5 ? '5px solid red' : movies.rating > 5 && movies.rating < 7.5 ? '5px solid yellow' : '5px solid green'
                                        }} 
                                        className='item-rating'>
                                        {movies.rating}
                                    </div> 
                                </div>
                                <div className="item-title">
                                    <h4>{movies.title}</h4>
                                </div>
                                <div className='item-about'>
                                    <p>{movies.about}</p>  
                                </div>
                                <div className='item-date'>
                                    <h5>{movies.data_release}</h5>  
                                </div> 
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
        </div>
    )
}

export default MovieSwipper