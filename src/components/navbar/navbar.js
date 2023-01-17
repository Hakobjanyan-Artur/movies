import './navbar.css'
import logo from '../../logo/Vectorhome.png'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()

    return (
        <div className='navbar'>
            <div className='container'>
                <div 
                    className='logo'
                    onClick={() => navigate('/')}>
                    <div className='logo-img'>
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar