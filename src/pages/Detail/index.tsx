import {useRef} from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { animeInfoProps, searchProps } from "../../types";
import { searchConverter } from "../../utils/helper";
import useGetInfo from "../../hooks/useGetInfo";
import DisplayGogo from "../../components/displayGogo";
import Loader from "../../components/loader";
import Button from "../../components/UI/Button";
import "./index.css"

function Details() {

    const btnref = useRef<null|HTMLDivElement>( null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [anime, loading] = useGetInfo<animeInfoProps>(`https://api.consumet.org/anime/gogoanime/info/${id}`)
    const [sanime, sloading] = useGetInfo<searchProps>(`https://api.consumet.org/anime/gogoanime/${searchConverter(id as string)}`)
    // const [sanime, sloading, serror] = useGetInfo<searchProps>(`https://api.consumet.org/anime/gogoanime/recent-episodes?page=2`)

    const handleClick = () => {
        btnref.current?.scrollIntoView({behavior: 'smooth'}) as any;
      };

    return (
        <div className="detail-container">
            {loading || sloading ?
                <Loader /> :
                <>
                    <div className="detail-info-container">

                        <div className="detail-image">
                            <div className="detail-img">
                                <img src={anime?.image === undefined ? state?.images?.jpg.image_url : anime?.image} alt={anime?.title} />
                            </div>
                        </div>

                        <div className="detail-content">
                            <div className="detail-title">
                                <h2>{state.title === undefined ? anime?.title : state?.title}</h2>
                                <div className="detail-type">
                                    <div>

                                        {anime?.status === "Not yet aired" ? <Button
                                            style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}

                                        ><h3>Not Yet Aired</h3></Button> 
                                        : <Button
                                        style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}

                                            onClick={anime?.title === undefined ? () => {handleClick() } : () => navigate(`/stream/${anime?.id}`, { state: anime })}
                                        ><h3>{anime?.title === undefined ? "Choose below" : "Watch Now"}</h3>
                                        </Button>}

                                        <Button
                                            style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}
                                        // onClick={() => navigate(`/stream/${anime?.id}`, { state: anime })}
                                        ><h3>Add to Favorite</h3></Button>
                                    </div>
                                    {state.type === undefined ? (<p><span>Title:</span> {anime?.title}</p>) : (<div className="detail-description">
                                        <p><span>Type:</span> {state.type}</p>
                                        <p><span>Duration:</span> {state.duration}</p>
                                        <p><span>Episodes:</span> {state.episodes}</p>
                                        <p><span>Scores:</span> {state.score}</p>
                                        <p><span>Status:</span> {state.status}</p>
                                    </div>)
                                    }
                                    <p><span>Dubbing:</span> {anime?.subOrDub}</p>
                                    <p><span>Realease:</span> {anime?.releaseDate}</p>

                                    {state.genres === undefined ? "" :
                                        <div className="detail-genre">
                                            <span>Genre: </span>{state?.genres.map((genre: any,index:number) => <p key={index}>{genre.name}</p>)}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="detail-description" >
                                <h3>Description</h3>
                                <p>{state.synopsis === undefined ? anime?.description : state?.synopsis}</p>
                            </div>
                        </div>
                    </div>

                    <div className="detail-similar" ref={btnref} >
                        <DisplayGogo title="Similar anime" anime={sanime?.results} t />
                    </div>

                </>
            }
        </div>
    );
}

export default Details;


