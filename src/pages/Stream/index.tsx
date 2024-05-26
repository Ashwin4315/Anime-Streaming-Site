import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { SeverProps, animeInfoProps, jikenProps, searchProps } from "../../types";
import { generateNumbersInRange, splitEpisodes } from "../../utils/helper";
import useGetInfo from "../../hooks/useGetInfo";
import Loader from "../../components/loader";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import DisplayTop from "../../components/displayTop";
import DisplayAnime from "../../components/displayAnime";
import Info from "../../components/info";
import "./index.css"
import useGetAnime from "../../hooks/useGetInfo";
import DisplayRecommended from "../../components/displayRecommended";


function Stream() {

    const { streamId } = useParams()
    const location = useLocation();
    
    const [episode, setEpisode] = useState<number>(1)
    const [play, setplay] = useState<number>(0)
    const [show, setshow] = useState<boolean>(false)
    const [buttonRange, setbuttonRange] = useState<string[]>([])
    const [buttons, setbuttons] = useState<number[]>([])

    const [server, loading] = useGetInfo<SeverProps>(`http://localhost:3000/api/v1/getStreamLinks/${streamId}-episode-${episode}`)
    const [genre,gloading]=useGetAnime<searchProps>(`http://localhost:3000/api/v1/getGenre?genre=${location?.state?.anime?.animeInfo['Genre:'] !== undefined ? location?.state?.anime?.animeInfo['Genre:']?.toString():""}`)


    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }, [])


    useEffect(() => {
        setbuttonRange(splitEpisodes(location?.state?.anime?.episodeCount))
    }, [location?.state?.anime?.episodeCount])



    useEffect(() => {
        if (buttonRange?.[0] !== undefined) {
            setbuttons(generateNumbersInRange(buttonRange?.[0]))
        }
    }, [buttonRange])


    return (
        <>
            {loading ? <Loader /> :
                <div className="stream-container">
                    <div className="watch">
                        <div className="video_wrapper">
                            <div className="web-player">
                                <div className="cover">
                                    <iframe
                                        allow="autoplay " allowFullScreen={true}
                                        style={{ width: "100% ", height: "100%", display: "block" }} src={server?.streamlinks?.[play].link}
                                        title="player"
                                    ></iframe>

                                </div>
                            </div>
                        </div>
                        <Card
                            style={{ background: "black", justifyContent: "flex-end", alignItems: "center", marginBottom: "1.5rem" }}
                        >

                            <Button
                                style={{
                                    marginRight: "1rem",
                                    marginLeft: "1rem",
                                    backgroundColor: "#222222"
                                }}
                                onClick={() => { episode === 1 ? setEpisode(1) : setEpisode(episode - 1) }}
                            >{"< Prev"}</Button>
                            <Button
                                style={{
                                    backgroundColor: "#222222"

                                }}
                                onClick={() => { episode === location?.state?.anime?.episodeCount ? setEpisode(location?.state?.anime?.episodeCount) : setEpisode(episode + 1) }}

                            >{"Next >"}</Button>

                        </Card>

                    </div>
                    <div className="stream-content">
                        <div className="stream-server-container">
                            <Card
                                style={{
                                    padding: "1rem",
                                    marginBottom: "4rem",
                                    backgroundColor: "rgba(3, 173, 99,0.8)"
                                }
                                }
                            >
                                <p>You're watching <span style={{ color: "black", fontWeight: "bolder" }}>Episode {episode} </span> .If current servers doesn't work, please try other servers beside</p>
                            </Card>
                            <h2>Available Servers</h2>
                            <Card
                                style={{
                                    gap: "1rem",
                                    flexDirection: "column",
                                    flexWrap: "wrap",
                                    marginTop: "1rem"
                                }
                                }
                            >
                                <h3>Current Server<span>&nbsp;&nbsp;{server?.streamlinks[play]?.provider}</span></h3>
                                <div className="btn-container">
                                    {server?.streamlinks?.map((servers, index) => <Button
                                        style={play === index ? { minWidth: "8rem", backgroundColor: "white", color: "black" } : { minWidth: "8rem" }}
                                        key={index}
                                        onClick={() => {
                                            setplay(index)
                                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                        }} >
                                        {servers?.provider}</Button>)}
                                </div>
                            </Card>
                        </div>

                        <Card
                            style={{
                                padding: "1rem",
                                backgroundColor: "rgba(3, 173, 99,0.8)"
                            }
                            }
                        >
                            <p> Enable <span style={{ color: "black", fontWeight: "bolder" }}>Add blocker</span> in your browser setting or use <span style={{ color: "black", fontWeight: "bolder" }}>Brave browser</span> to avoid add popup or redirects </p>
                        </Card>
                        <div className="stream-content-container">
                            <h2>Episodes</h2>
                            <Card
                                style={{
                                    gap: "0rem",
                                    flexDirection: "column",
                                    padding: "0"
                                }
                                }
                            >
                                <div style={{ display: "flex" }}>
                                    <div className="subordub">
                                        <section
                                            onClick={() => { setshow(!show) }}
                                        >{buttons[0] + "-" + buttons[buttons.length - 1]}<span className="material-symbols-outlined">
                                                expand_more
                                            </span></section>
                                        <div className={show ? "subordub-changer" : "displaynone"}>

                                            {buttonRange.map((btn, i) => {
                                                return <Button
                                                    key={i}
                                                    style={{ padding: "0.5rem 0rem" }}
                                                    onClick={() => {
                                                        setbuttons(generateNumbersInRange(btn))
                                                        setshow(!show)

                                                    }}
                                                >{btn}</Button>
                                            })
                                            }

                                        </div>
                                    </div>

                                </div>
                                <Card
                                    style={{
                                        gap: "1rem",
                                        alignItems: "center",
                                        maxHeight: "40vh",
                                        overflowY: "scroll"
                                    }
                                    }
                                >
                                    {buttons?.map(btn => <Button key={btn}
                                        onClick={() => {
                                            setEpisode(btn)
                                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

                                        }}
                                        style={episode === btn ? { minWidth: "5rem", backgroundColor: "white", color: "black" } : { minWidth: "5rem" }}>{btn}</Button>)}

                                </Card>
                            </Card>
                            <div>
                                <Info anime={location?.state?.anime} />
                            </div>

                            <div className="Recommended-card">
                                <DisplayRecommended data={genre?.anime} type="Recommended Anime" />
                            </div>
                            <div className="Recommended-display">
                                <DisplayAnime anime={genre?.anime} title="Recommended Anime" />
                            </div> 
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Stream;
