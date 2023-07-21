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
                                <img src={shows?.image === undefined ? shows?.images?.jpg?.image_url : shows?.image} alt={shows.title} />
                            </div>
                            <div className="popular-anime-card-content">
                                <div className="popular-anime-card-card-title">
                                    <h2
                                        onClick={() => { navigate(`/detail/${converter(shows?.url)}`, { state: shows }) }}

                                    >{shows.title}</h2>
                                </div>
                               { shows.episodes===undefined?"": <div className="popular-anime-card-info">
                                    <span>{shows.type}</span>
                                    <p><span>episode: </span>{shows.episodes}</p>
                                </div>}
                            </div>

                        </div>
                    )

                })}
            </div>
        </div>

    );
}

export default DisplayTop;