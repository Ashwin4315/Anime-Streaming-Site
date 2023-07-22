import { useNavigate } from "react-router-dom";
import "./index.css"
import { converter } from "../../utils/helper";

function DisplayTop({ data, type }: { data: any, type: string }) {

    const navigate = useNavigate()
    return (
        <div className="popular-anime-card-container">
            <div className="popular-anime-card-title">
                <h2>{type}</h2>
            </div>
            <div className="popular-anime-card-content-container">
                {data?.map((shows, index) => {
                    return (
                        <div className="popular-anime-card-card" key={index}>
                            <div className="popular-anime-card-img">
                                <img src={shows?.attributes?.posterImage.original === undefined ? shows?.images?.jpg?.image_url : shows?.attributes?.posterImage.original} alt={shows.title} />
                            </div>
                            <div className="popular-anime-card-content">
                                <div className="popular-anime-card-card-title">
                                    <h2
                                        onClick={() => { navigate(`/detail/${shows?.attributes?.slug === undefined ? converter(shows?.url) : shows?.attributes?.slug}`, { state: shows }) }}

                                    >{shows?.attributes?.canonicalTitle === undefined ? shows.title : shows?.attributes?.canonicalTitle}</h2>
                                </div>
                                <div className="popular-anime-card-info">
                                    <span>{shows?.attributes?.subtype === undefined ? shows.type : shows?.attributes?.subtype}</span>
                                    <p><span>Episode: </span>{shows?.attributes?.episodeCount === undefined ? shows.episodes || "?" : shows?.attributes?.episodeCount || "?"}</p>
                                </div>
                                <div >
                                    <p
                                       className="popular-anime-card-info-t"
                                    ><span 
                                    style={{fontSize:"0.8rem"}}
                                    className="material-symbols-outlined">
                                        star_rate_half
                                    </span>{shows?.attributes?.averageRating === undefined ? shows.score || "?" : shows?.attributes?.averageRating || "?"}</p>

                                </div>
                            </div>

                        </div>
                    )

                })}
            </div>
        </div>

    );
}

export default DisplayTop;