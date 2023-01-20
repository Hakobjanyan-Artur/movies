import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import './movieSwipper.css'
import "swiper/css";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


function MovieSwipper({popularMovies, setMoviesId}) {
    const navigate = useNavigate()

    return (
        <div className='movieSwipper'>
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
                    slidesPerView: 6,
                    spaceBetween: 30,
                }
            }}
            scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
            className="movie-mySwiper"
            >
                {popularMovies?.map(movies => (
                    <SwiperSlide key={movies?.id}>
                        <div className="movieItem">
                            <div onClick={() => navigate(`/movies/${movies?.id}`)} className="movie-item-container">
                                <div className="movie-item-container-img">
                                    <img src={`https://image.tmdb.org/t/p/w200/${movies?.poster}`} alt="" />
                                    <div
                                        style={{
                                            border: movies?.rating < 5 ? '5px solid red' : movies?.rating > 5 && movies?.rating < 7.5 ? '5px solid yellow' : '5px solid green'
                                        }} 
                                        className='movie-item-rating'>
                                        {movies?.rating}
                                    </div> 
                                </div>
                                <div className="movie-item-title">
                                    <h4>{movies?.title.slice(0, movies.title.indexOf(':'))}</h4>
                                </div>
                                <div className='movie-item-about'>
                                    <p>{movies?.about}</p>  
                                </div>
                                <div className='movie-item-date'>
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

export default MovieSwipper