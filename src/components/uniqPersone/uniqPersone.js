import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UniqPersoneSwipe from '../uniqPersoneSwipe/uniqPersoneSwipe'
import './uniqPesone.css'

function UniqPersone() {
    const {id} = useParams()
    const [uniqPersone, setUniqPersone] = useState(null)

    const fetchPersone = async() => {
        const responseUniqPersone = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=f9fd8699f04bbaf7bf3c77275c0981c9&language=en-US`)
        const uniqPersone = responseUniqPersone.data
        const uniqPersoneData = {
            id: uniqPersone.id,
            name: uniqPersone.name,
            biography: uniqPersone.biography,
            knofFor: uniqPersone.known_for_department,
            popularity: Math.floor(uniqPersone.popularity),
            gender: uniqPersone.gender === 1 ? 'Female' : 'Male',
            birthday: uniqPersone.birthday,
            img: uniqPersone.profile_path
        }
        setUniqPersone(uniqPersoneData)
    }

    useEffect(() => {
        if (id) {
            fetchPersone()
        }
    },[])

    return(
        <div className='uniq-persone'>
            <div className='container'>
                <div className='uniq-p-container-left'>
                    <div className='uniq-p-persone-img'>
                        <img src={`https://image.tmdb.org/t/p/w200/${uniqPersone?.img}`} alt="" />
                    </div>
                    <div className='uniq-p-img-title'>
                        <h2>Personal Info</h2>
                    </div>
                    <div className='uniq-p-info'>
                        <h3>Known For</h3>
                        <h5>{uniqPersone?.knofFor}</h5>
                        <h3>Credits</h3>
                        <h5>{uniqPersone?.popularity}</h5>
                        <h3>Gender</h3>
                        <h5>{uniqPersone?.gender}</h5>
                        <h3>Birthday</h3>
                        <h5>{uniqPersone?.birthday}</h5>
                    </div>
                </div>
                <div className='uniq-p-container-right'>
                        <div className='uniq-p-persone-name'>
                            <h1>{uniqPersone?.name}</h1>
                        </div>
                        <div className='uniq-p-pesone-biography'>
                            <h2>Biography</h2>
                            <p>{uniqPersone?.biography}</p>
                        </div>
                        <div className='uniq-p-persone-swipe'>
                            <div className='uniq-p-persone-swipe-title'>
                                <h2>Known For</h2>
                            </div>
                            <UniqPersoneSwipe id={id} />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default UniqPersone