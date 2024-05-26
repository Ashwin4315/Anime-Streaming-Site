import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import { animeInfoProps, searchProps } from "../../types";
import { ToastContainer, toast } from 'react-toastify';
import { converter } from "../../utils/helper";
import { RootState } from '../../store/store';
import { add } from '../../store/FavoriteReducer/index';
import useGetInfo from "../../hooks/useGetInfo";
import DisplayGogo from "../../components/displayGogo";
import Loader from "../../components/loader";
import Button from "../../components/UI/Button";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import useGetAnime from '../../hooks/useGetInfo';


function Details() {

    const btnref = useRef<null | HTMLDivElement>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { state } = location;
    console.log(state)

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
    const [anime, loading] = useGetInfo<animeInfoProps>(`http://localhost:3000/api/v1/getAnimeInfo/${id}`)
    const [genre,gloading]=useGetAnime<searchProps>(`http://localhost:3000/api/v1/getGenre?page=${page}&genre=${anime?.animeInfo['Genre:'] !== undefined ? anime?.animeInfo['Genre:']?.toString():""}`)

    console.log("Genre",genre)

    const handleClick = () => {
        btnref.current?.scrollIntoView({ behavior: 'smooth' }) as any;
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])






    const showToastMessage = (state: any) => {
        if (favorites?.data.find(anime =>  anime?.id === state?.id)) {
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
                                <img src={anime?.animeImage?.image} alt={anime?.animeImage?.title} />
                            </div>
                        </div>

                        <div className="detail-content">
                            <div className="detail-title">
                                <h2>{anime?.animeImage?.title}</h2>
                                <div className="detail-type">
                                    <div>
                                        {anime?.animeInfo?.['Status:'] === "Upcoming Anime"
                                            ?
                                            <Button style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}><h3>Not Yet Aired</h3></Button>

                                            :
                                            <Button
                                                style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem" }}

                                            onClick={ () => navigate(`/stream/${converter(state?.id)}`, { state: { anime: anime} })}

                                            ><h3>
                                                    <section
                                                        style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
                                                    >
                                                        <span
                                                            style={{ fontSize: "1.5rem", color: "white", }}
                                                            className="material-symbols-outlined">
                                                            play_circle
                                                        </span>
                                                        <p >Watch now</p> </section>
                                                </h3>
                                            </Button>}
                                    </div>

                                    {/* should work */}




                                    <div>
                                        <Button
                                            style={{ minWidth: "13rem", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center" }}
                                            onClick={() => {
                                                dispatch(add(state))
                                                showToastMessage(state)
                                            }}
                                        > {favorites?.data.find(anime =>  anime?.id === state?.id) ?
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
                                        <p><span>Title:</span> {anime?.animeImage.title}</p>
                                        <p><span>Type:</span> {anime?.animeInfo['Type:']}</p>
                                        <p><span>Episode:</span> {anime?.episodeCount}</p>

                                        
                                        <div><span>Genre:</span>{anime?.animeInfo['Genre:']?.map((genre, index) => {
                                            return <p key={index}>{genre}</p>
                                        })}</div>
                                        <p><span>Status:</span> {anime?.animeInfo['Status:']}</p>
                                    </div>

                                    <p><span>Realease:</span> {anime?.animeInfo['Released:']}</p>
                                    <p><span>Other Names:</span> {anime?.animeInfo['Other name:']}</p>


                                    <div className="detail-genre">

                                    </div>

                                </div>
                            </div>
                            <div className="detail-description" >
                                <h3>Description</h3>
                                <p>{anime?.animeInfo['Plot Summary:']}</p>
                            </div>
                        </div>
                    </div>

                    {gloading ? <Loader /> : <div className="detail-similar" ref={btnref} >
                        {genre?.anime === undefined ?
                            <p style={{ textAlign: "center", fontSize: "2rem", marginBottom: "5rem", width: "100%", marginTop: "3rem" }}>No result found</p> :
                            <DisplayGogo title="Similar anime" anime={genre?.anime} />
                        }
                    </div>}

                </>
            }

        </div>
    );
}

export default Details;


