import { useNavigate } from 'react-router-dom'
import './error.css'

function Error() {
    const navigate = useNavigate()
    return (
        <div className='error'>
            <div className='container'>
                <div className='buttons'>
                    <button onClick={() => navigate('/')}>Home</button>
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Error