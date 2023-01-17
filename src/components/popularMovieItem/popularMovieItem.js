import './popularMovieItem.css'

function PopularMovieItem({id, backDrop, poster, original_title, title, data_release, about, rating}) {
    return (
        <div className='movieItem'>
            <div className='item-container'>
                 <div className='item-container-img'>
                        <img src={`https://image.tmdb.org/t/p/w200/${poster}`} alt="" />
                        <div 
                         className='item-rating'>
                            {rating}
                        </div>  
                 </div>
                 <div className='item-title'>
                      <h4>{title}</h4>  
                 </div>
                 <div className='item-about'>
                      <p>{about}</p>  
                 </div>
                 <div className='item-date'>
                      <h5>{data_release}</h5>  
                 </div> 
            </div>
        </div>
    )
} 

export default PopularMovieItem