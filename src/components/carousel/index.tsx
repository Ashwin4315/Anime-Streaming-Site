import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel as AnimeSlider } from 'react-responsive-carousel';
import { StringConvertFunction, converter } from '../../utils/helper';
import Button from '../UI/Button';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css'; 


const Carousel = ({ data }: any) => {

const navigate = useNavigate();

const componentRef = useRef<null | HTMLDivElement>(null)


  

   
    return (
        <div className='carousel-container'  ref={componentRef }>
            <AnimeSlider
                showArrows={true}
                className='carousel'
                showStatus={false}
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}	
                interval={4000}
                >


                {data?.slice(0,10)?.map((anime) => {
                    
                    return (
                        <div className='carousel-content-container'
                        key={anime.title}
                        >
                            <div className='carousel-content'>
                                <img src={anime?.images?.jpg?.large_image_url === undefined ? anime?.images?.jpg?.image_url : anime?.images?.jpg?.large_image_url} alt={anime?.title} />
                                <div className='content'>

                                    <div className='carousel-img-con'>
                                        <img src={anime?.images?.jpg?.large_image_url === undefined ? anime?.images?.jpg?.image_url : anime?.images?.jpg?.large_image_url} alt={anime?.title} />
                                    </div>
                                    <div className='carousel-con'>
                                        <h2 >{anime.title}</h2>
                                        <div className='carousel-type'>
                                            <p>Type: {anime?.type}</p>
                                            <p>Status: {anime?.status}</p>
                                            <p>Duration: {anime?.duration}</p>
                                        </div>
                                        <span >Description</span>
                                        {anime?.synopsis===null?<p>Watch The Latest Episode on Logo</p>:<p >{StringConvertFunction(anime?.synopsis,300)}</p>}
                                        <Button
                                            onClick={() => { navigate(`/detail/${converter(anime?.url)}`, { state: anime }) }}

                                            style={{ maxWidth: "9rem", padding: "0.5rem 0rem", marginTop: "1rem" }}
                                        >Watch Now</Button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}

            </AnimeSlider>
        </div>
    );
};

export default Carousel;