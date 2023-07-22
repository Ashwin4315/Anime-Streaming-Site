import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import { animeInfoProps, searchProps } from "../../types";
import { ToastContainer, toast } from 'react-toastify';
import { searchConverter } from "../../utils/helper";
import { RootState } from '../../store/store';
import { genre } from '../../constants/filter';
import { add } from '../../store/FavoriteReducer/index';
import useGetInfo from "../../hooks/useGetInfo";
import DisplayGogo from "../../components/displayGogo";
import Loader from "../../components/loader";
import Button from "../../components/UI/Button";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"


function Details() {

    const btnref = useRef<null | HTMLDivElement>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [g, setgenres] = useState<string>("")
    const [page, setpage] = useState<number>(1)
    const [search, setsearch] = useState<{
        genres: string[];
        id: string;
        image: string;
        title: string;
        url: string;
    }[]>([])
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state: RootState) => state.favorite)
    const [anime, loading] = useGetInfo<animeInfoProps>(`https://api.consumet.org/anime/gogoanime/info/${state?.episodeNumber === undefined ? id : state?.id}`)
    const [sanime,sloading] = useGetInfo<searchProps>(`https://api.consumet.org/anime/gogoanime/${searchConverter(id as string)}?page=${page}`)

    const handleClick = () => {
        btnref.current?.scrollIntoView({ behavior: 'smooth' }) as any;
    };
    useEffect(() => {
        let gen: number[] = [];
        if (anime?.genres !== undefined) {
            for (let i = 1; i <= anime?.genres?.length; i++) {
                for (let j = 0; j < genre.length; j++) {
                    if (genre[j].name === anime?.genres[i]) {
                        gen = [...gen, genre[j].mal_id]
                    }
                }
            }
        }
        setgenres(gen.toString())
    }, [anime])

    useLayoutEffect(() => {

        if (sanime?.hasNextPage === true) {
            setpage((prev) => {
                return prev + 1
            })
        }
        if (sanime?.results !== undefined) {

            setsearch(prev => {
                return prev.concat(sanime?.results)
            })
        }


    }, [sanime?.hasNextPage, sanime?.results])

    const showToastMessage = (state: any) => {
        if (favorites?.data.find(anime => anime?.mal_id === undefined ? anime?.id === state.id : anime?.mal_id === state.mal_id)) {
            toast.success('removed from favorites', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'toast-remove-message',

            });
        }

        else {
            toast.success('added to favorites', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'toast-message',

            });
        }

    };

    return (
        <div className="detail-container">
            {loading ?
                <Loader /> :
                <>
                    <div className="detail-info-container">

                        <div className="detail-image">
                            <div className="detail-img">
                                <img src={anime?.image === undefined ? state?.images?.jpg.image_url===undefined?state?.attributes?.posterImage.original :state?.images?.jpg.image_url: anime?.image} alt={anime?.title} />
                            </div>
                        </div>

                        <div className="detail-content">
                            <div className="detail-title">
                                <h2>{state.title === undefined ? anime?.title===undefined?state?.attributes?.canonicalTitle:anime?.title: state?.title}</h2>
                                <div className="detail-type">
                                    <div>

                                        {anime?.status === "Not yet aired" ? <Button
                                            style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}

                                        ><h3>Not Yet Aired</h3></Button>
                                            : state?.status === "Not yet aired" ?
                                                <Button
                                                    style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}

                                                ><h3>Not Yet Aired</h3></Button> :
                                                <Button
                                                    style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}

                                                    onClick={anime?.title === undefined ? () => { handleClick() } : () => navigate(`/stream/${anime?.id}`, { state: { anime: anime, genres: g } })}
                                                ><h3>{anime?.title === undefined ? <section
                                                    style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "1rem", border: "3px solid white", padding: "0.2rem",
                                                            color: "white",
                                                            borderRadius: "5rem"
                                                        }}
                                                        className="material-symbols-outlined">
                                                        arrow_downward
                                                    </span>
                                                    <p> Choose below</p> </section> :
                                                    <section
                                                        style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
                                                    >
                                                        <span
                                                            style={{ fontSize: "1.5rem", color: "white", }}
                                                            className="material-symbols-outlined">
                                                            play_circle
                                                        </span>
                                                        <p >Watch now</p> </section>
                                                }</h3>
                                                </Button>}

                                        <Button
                                            style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center" }}
                                            onClick={() => {
                                                dispatch(add(state))
                                                showToastMessage(state)
                                            }}
                                        > {favorites?.data.find(anime => anime?.mal_id === undefined ? anime?.id === state.id : anime?.mal_id === state.mal_id) ?
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACtklEQVR4nO1Zv4sTQRQeBUGwEBsVf6GCnVqYfW/jEYh5b2MjynWnqJ2IoHcnFlpqLTaW4o9OiwMbRbSx8x8QFA6uFMVGudybvShebmWSeHfebpLJZpPdg/3ga5blzfe9eTM781apHDly5Mg8Fr3CAWGYFMJ3mnFWCLUw1IXgqxC+1YS362X3oG28ehUPaYI7Jp4QfmvFQt2ObZ7dWDzt7B9YuF/GfULwVAiWNGPQjc13CJ93G9gkQjO8sI0nDE98Ku6NJ55wXDNIr4HChAVhZ2J9PKnghbjx/Ip7ri/xQu60EDb6H6ydPcZlIby5Eo/hlnkWOx5hQximrDM/iPj/TLAzIeSeH0S8XmOi50yYmo83zZ2nv8Xk4vne2J7OpcPwLLnBhkNhfNx5q7TYHdKmECyZSonK/lTa4rS1CbweNmA+SBkQp63KCN6EDGiGubSFaXvORhlIcPcZNkHCBghq6QtDOxLOR83A59SFsTU/RRjAmQwICyw5E7WNXsyAsMCGRmvIwE+vsH0jLGQh9OdLpR0hA61vAdxPW6DuzQeR4psGqid3Jnv4Sjz7Wpdht+oGn+BaZg0wTKpeCJTapBnepy1Wryfhh+Cu2tzTQGstuLuE4Uvqovkf4Xvfl3yfCmi6BWmLF8LfC55b6kv8qgnnrDD8SVF8w1xJ1SAQci4lcUfuWzzjss/u1YHEr84Ejo+ynKTZY4IrKkkIu6fMKXAEZaO1h2cSFb9iouocHeruRPCjVnHG1DBheqCa4eMQDMzWPPeIGgWCcnmrJnyYXObxpTlMqlFDV/Byu6sct95/mTamShPiFY+ZG1KcktFUPKGygKBQ2CIM96za5s3GLzwKqse3qazB97DYzGxHAzAX+1gw0tkgd3rt7c6cZ8yiz2TWu/1GEsZXQvi6zs7hji/myJEjh9rI+Av6K/Bt8zMD1QAAAABJRU5ErkJggg==" alt="heart" width="24px"></img> :
                                            <span
                                                style={{ color: "white" }}
                                                className="material-symbols-outlined">
                                                favorite
                                            </span>}&nbsp;&nbsp;<h3>Favorite</h3></Button>
                                    </div>
                                    <ToastContainer
                                        autoClose={1000}
                                        hideProgressBar={true}

                                        className={"toast"} />

                                    <div className="detail-description">
                                        <p><span>Title:</span> {state.title === undefined ? anime?.title===undefined?state?.attributes?.canonicalTitle:anime?.title: state?.title}</p>
                                        <p><span>Type:</span> {state.type === undefined ? anime?.type===undefined?state?.attributes?.subtype:anime?.type : state.type}</p>
                                        {state.duration === undefined ? "" : <p><span>Duration:</span> {state.duration}</p>}
                                        <p><span>Episodes:</span> {state.episodes === undefined ? anime?.totalEpisodes===undefined?state?.attributes?.episodeCount:anime?.totalEpisodes : state.episodes}</p>
                                        {state.score === undefined ? "" : <p><span>Score:</span> {state.score}</p>}
                                        <p><span>Status:</span> {state?.status === undefined ? anime?.status===undefined?state?.attributes?.status:anime?.status  : state?.status}</p>
                                    </div>

                                    {anime?.subOrDub === undefined ? "" : <p><span>Dubbing:</span> {anime?.subOrDub}</p>}
                                    <p><span>Realease:</span> {anime?.releaseDate === undefined ? state?.aired?.string===undefined?state?.attributes?.startDate:state?.aired?.string  : anime?.releaseDate}</p>


                                    <div className="detail-genre">

                                    </div>

                                </div>
                            </div>
                            <div className="detail-description" >
                                <h3>Description</h3>
                                <p>{state.synopsis === undefined ? anime?.description ===undefined?state?.attributes?.description:anime?.description : state?.synopsis}</p>
                            </div>
                        </div>
                    </div>

                   {sloading?<Loader/>: <div className="detail-similar" ref={btnref} >
                        {search?.[0] === undefined ?
                            <p style={{ textAlign: "center", fontSize: "2rem", marginBottom: "5rem", width: "100%", marginTop: "3rem" }}>No result found</p> :
                            <DisplayGogo title="Similar anime" anime={search} />
                        }
                    </div>}

                </>
            }

        </div>
    );
}

export default Details;


