import { useNavigate } from "react-router-dom"
import { displayAnimeProps } from "../../types";
import { StringConvertFunction, converter } from "../../utils/helper"
import "./index.css"




function DisplayAnime({ anime, title }: any) {

    const navigate = useNavigate()


    return (
        <div className={"display-container"}>

            <h2>{title}</h2>
            <div className={"display-anime-container"} >
                {anime?.map((animeShow: displayAnimeProps, index: number) => {
                    return (
                        <div key={index}
                            className="display-anime-card"
                            onClick={() => { navigate(`/detail/${converter(animeShow?.url)}`, { state: animeShow }) }}
                        >
                            <div className="display-anime-img">
                                <img src={(animeShow?.images.jpg.image_url)} alt={animeShow?.title}/>
                            </div>
                            <div className="display-anime-content">
                                <h3>{StringConvertFunction(animeShow?.title, 30)}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DisplayAnime;