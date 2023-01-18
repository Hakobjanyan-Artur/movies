import './personeSwiper.css'
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { useNavigate } from 'react-router-dom';

function PersoneSwiper({popularPersone}) {
    const navigate = useNavigate()

    return (
        <div className='personeSwiper'>
            <Swiper
            slidesPerView={7}
            spaceBetween={20}
            scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
            className="mySwiper"
            >
                {popularPersone?.map(persone => (
                    <SwiperSlide key={persone.id}>
                        <div onClick={() => navigate(`/persone/${persone.id}`)} className='persone-item-container'>
                            <div className='persone-item-img'>
                                <img src={`https://image.tmdb.org/t/p/w200/${persone.img}`} alt="" />
                                <div 
                                     style={{
                                        border: persone.popularity <= 20 ? '5px solid red' : persone.popularity > 20 && persone.popularity < 50 ? '5px solid yellow' : '5px solid green'
                                    }} 
                                    className='persone-item-rating'>
                                    {persone.popularity}
                                </div>
                            </div>
                            <div className='persone-item-name'>
                                <h4>{persone.name}</h4>
                            </div>
                            <div className='persone-item-character'>
                                <h5>
                                    {persone.character}
                                </h5>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
      </Swiper>
        </div>
    )
}

export default PersoneSwiper