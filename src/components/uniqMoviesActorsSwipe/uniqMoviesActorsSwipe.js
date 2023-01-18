import axios from 'axios'
import './uniqMoviesActorsSwipe.css'
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { useEffect, useState } from 'react';

function UniqMoviePersonSwipe({id}) {
    const [uniqMoviePerson, setUniqMoviePerson] = useState(null)

    const fetchuniqpesone = async() => {
        const responseUniqMoviesPersone = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f9fd8699f04bbaf7bf3c77275c0981c9&language=en-US`)
            const uniqMoviesPersone = responseUniqMoviesPersone.data.cast
            uniqMoviesPersone.length = 20
            const uniqMoviesPersonData = uniqMoviesPersone.map((person) => ({
                id: person.id,
                character: person.character,
                name: person.name,
                popularity: Math.floor(person.popularity),
                poster: person.profile_path
            }))
            setUniqMoviePerson([...uniqMoviesPersonData])
    }
    useEffect(() => {
        if (id) {
            fetchuniqpesone()
        }
    }, [])
    
    return(
        <div className='uniq-person'>
            <Swiper
            slidesPerView={7}
            spaceBetween={20}
            scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
            className="mySwiper"
            >
                {uniqMoviePerson?.map(persone => (
                    <SwiperSlide key={persone.id}>
                        <div className='persone-item-container'>
                            <div className='persone-item-img'>
                                <img src={`https://image.tmdb.org/t/p/w200/${persone?.poster}`} alt="" />
                                <div 
                                     style={{
                                        border: persone?.popularity <= 20 ? '5px solid red' : persone?.popularity > 20 && persone?.popularity < 50 ? '5px solid yellow' : '5px solid green'
                                    }} 
                                    className='persone-item-rating'>
                                    {persone?.popularity}
                                </div>
                            </div>
                            <div className='persone-item-name'>
                                <h4>{persone?.name}</h4>
                            </div>
                            <div className='persone-item-character'>
                                <h5>
                                    {persone?.character}
                                </h5>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
        </div>
    )
}

export default UniqMoviePersonSwipe