import './teaterPersoneSwiper.css'
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { useNavigate } from 'react-router-dom';

function TeaterPersoneSwiper({teaterPersone}) {
    const navigate = useNavigate()

    return (
        <div className='teater-persone-swiper'>
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
            className="teater-p-Sw"
            >
                {teaterPersone?.map(persone => (
                    <SwiperSlide key={persone?.id}>
                        <div onClick={() => navigate(`/persone/${persone?.id}`)} className='teater-p-i-container'>
                            <div className='teater-p-i'>
                                <div className='teater-persone-item-img'>
                                    <img src={`https://image.tmdb.org/t/p/w200/${persone?.img}`} alt="" />
                                    <div 
                                        style={{
                                            border: persone?.popularity <= 20 ? '5px solid red' : persone?.popularity > 20 && persone?.popularity < 50 ? '5px solid yellow' : '5px solid green'
                                        }} 
                                        className='teater-p-i-rating'>
                                        {persone?.popularity}
                                    </div>
                                </div>
                                <div className='teater-p-i-name'>
                                    <h5>{persone?.name}</h5>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
        </div>
    )
}

export default TeaterPersoneSwiper