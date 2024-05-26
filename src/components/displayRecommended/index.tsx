import { useNavigate } from "react-router-dom";
import { StringConvertFunction, converter } from "../../utils/helper";
import "./index.css"

function DisplayRecommended({ data, type }: { data: any, type: string }) {
    const navigate = useNavigate();

    return (
        <div className="popular-anime-card-container">
            <div className="popular-anime-card-title">
                <h2>{type}</h2>
            </div>
            <div className="popular-anime-card-content-container">
                {data?.map((shows, index) => {
                    return (
                        <div className="popular-anime-card-card" 
                        onClick={() => { navigate(`/detail/${converter(shows?.id)}`, { state: shows }) }}

                        key={index}>
                            <div className="popular-anime-card-img">
                            <img src={shows?.image} alt={shows?.anime} />
                            </div>
                            <div className="popular-anime-card-content">
                                <div className="popular-anime-card-card-title">
                                <h3>{StringConvertFunction(shows?.anime, 30)}</h3>

                                </div>
                                <div className="popular-anime-card-info">
                                    <p><span>released: </span>{shows?.released}</p>
                                </div>
            
                            </div>

                        </div>
                    )

                })}
            </div>
        </div>

    );
}

export default DisplayRecommended;