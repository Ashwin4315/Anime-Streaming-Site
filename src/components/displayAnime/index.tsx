import { useNavigate } from "react-router-dom"
import { displayAnimeProps } from "../../types";
import { StringConvertFunction, converter } from "../../utils/helper"
import "./index.css"




function DisplayAnime({ anime, title }: any) {

    const navigate = useNavigate()


    return (
        <div className={"display-container"}>

            {title === "" ? "" : <h2>{title}</h2>}
            <div className={"display-anime-container"} >
                {anime?.map((animeShow: displayAnimeProps, index: number) => {
                    return (
                        <div key={index}
                            className="display-anime-card"
                            onClick={() => { navigate(`/detail/${converter(animeShow?.url)}`, { state: animeShow }) }}
                        >
                            <div className="display-anime-img">
                                <img src={animeShow?.images?.jpg?.image_url === undefined ? animeShow?.image : (animeShow?.images.jpg.image_url)} alt={animeShow?.title} />
                            </div>
                            <div className="display-anime-content">
                                <h3>{animeShow.title===""?StringConvertFunction(animeShow?.id, 30):StringConvertFunction(animeShow?.title, 30)}</h3>
                                <div>{animeShow.episodes === undefined
                                    ?
                                    <section>{animeShow.episodeNumber === undefined ? "" :
                                        <div
                                        style={{display:"flex"  ,alignItems:"center"}}
                                        >
                                            <span
                                                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
                                                className="material-symbols-outlined">
                                                playlist_play
                                            </span>
                                            <p>{animeShow.episodeNumber}</p>
                                        </div>}
                                    </section>

                                    :
                                    <div className="display-search-con">
                                        <p>{animeShow.type}</p>
                                        <div style={{display:"flex" ,padding:" 0 0.5rem",alignItems:"center"}}><span
                                            style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
                                            className="material-symbols-outlined">
                                            playlist_play
                                        </span><p>{animeShow.episodes}</p>
                                        </div>
                                    </div>

                                }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DisplayAnime;