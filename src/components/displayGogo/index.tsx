import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { displaygogoProps } from "../../types";
import { converter } from "../../utils/helper";
import "./index.css"



function DisplayGogo({ anime, title }: any) {

    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    },[])
    
    return (
        <div className={"display-gogo-container"} >
            <h2>{title}</h2>
            <div className={"display-gogo"} >
                {anime?.map((animeShow: displaygogoProps, index: number) => {
                    return (
                        <div 
                            key={index}
                            className="display-gogo-anime-card"
                            onClick={() => {
                                 navigate(`/detail/${converter(animeShow.url)}`, { state: animeShow })
                                 window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

                                 }}

                        >
                            <div className="display-gogo-anime-img">
                                <img src={animeShow?.image}  alt={animeShow?.title}/>
                            </div>
                            <div className="display-gogo-anime-content">
                                <h3>{animeShow?.title}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DisplayGogo;