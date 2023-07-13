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
                        navigate("/about")
                        show()
                       }}
                    >About</li>
                    <li
                      onClick={()=>{
                        navigate("/about")
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