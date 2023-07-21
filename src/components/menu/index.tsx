import { useNavigate } from 'react-router-dom';
import './index.css';

function Menu({ show }: { show: () => void }) {

 
    const navigate=useNavigate()
    return (
        <div className='menu-container'>
            <div className='menu-overlay'   onClick={show}></div>

            <div className='menu-sub-container'>
                <ul className='menu-list'>
                    <li
                    onClick={()=>{
                     navigate("/")
                     show()
                    }}
                    >Home</li>
                    <li
                      onClick={()=>{
                        navigate("/search")
                        show()
                       }}
                    >Genre</li>
                    <li
                      onClick={()=>{
                        navigate("/display/Movies",{state:"https://api.jikan.moe/v4/anime?type=movie&"})
                        show()
                       }}
                    >Movies</li>
                    <li
                      onClick={()=>{
                        navigate("/display/Upcoming",{state:"https://api.jikan.moe/v4/seasons/upcoming?"})
                        show()
                       }}
                    >Upcoming</li>
                    <li
                      onClick={()=>{
                        navigate("/display/Popular",{state:"https://api.jikan.moe/v4/top/anime?filter=bypopularity&"})
                        show()
                       }}
                    >Popular Anime</li>
                    <li
                      onClick={()=>{
                        navigate("/favorite")
                        show()
                       }}
                    >Favorates</li>
                  
                    <li><a href='https://mangafire.to/?9anime'>Read Manga</a></li>
                </ul>
            </div>

        </div>
    );
}

export default Menu;