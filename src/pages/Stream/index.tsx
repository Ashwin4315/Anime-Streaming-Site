import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { SeverProps } from "../../types";
import { isStreamsb } from "../../utils/helper";
import useGetInfo from "../../hooks/useGetInfo";
import Loader from "../../components/loader";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import "./index.css"


function Stream() {

    const { streamId } = useParams()
    const location = useLocation();

    const [episode, setEpisode] = useState<number>(1)
    const [play, setplay] = useState<number>(0)
    const [buttons, setbuttons] = useState<number[] | null>(null)
    const [server, loading] = useGetInfo<SeverProps[]>(`https://api.consumet.org/anime/gogoanime/servers/${streamId}-episode-${episode}`)

    useEffect(() => {
        let button: number[] = [];
        for (let i: number = 1; i <= location.state.totalEpisodes; i++) {
            button[i] = i;
        }
        setbuttons(button)
    }, [location.state.totalEpisodes])



    useEffect(() => {
        const filtered = server?.findIndex(isStreamsb)
        setplay(filtered === undefined ? 0 : filtered)
    }, [server])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }, [])



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
                                        style={{ width: "100% ", height: "100%", display: "block" }} src={`${server?.[play]?.url}`}
                                        title="player"
                                    ></iframe>

                                </div>
                            </div>
                        </div>
                        <Card
                            style={{ background: "black",marginBottom:"2rem" }}
                        >
                            <h3>Currently Playing: {episode}</h3>
                            <Button
                                style={{
                                    marginRight: "2rem",
                                    marginLeft: "1rem",
                                    backgroundColor:"#222222"
                                }}
                                onClick={() => { episode === 1 ? setEpisode(1) : setEpisode(episode - 1) }}
                            >{"<"}</Button>
                            <Button
                            style={{
                                backgroundColor:"#222222"

                            }}
                                onClick={() => { episode === location?.state?.totalEpisodes ? setEpisode(location?.state?.totalEpisodes) : setEpisode(episode + 1) }}

                            >{">"}</Button>
                        </Card>
                    </div>
                    <div className="stream-content">
                        <div className="stream-server-container">
                            <h2>Available Servers</h2>
                            <Card
                                style={{
                                    gap: "1rem",
                                    flexDirection: "column",
                                    flexWrap: "wrap",
                                    marginTop:"1rem"
                                }
                                }
                            >
                                <h3>Current Server<span>&nbsp;&nbsp;{server?.[play]?.name}</span></h3>
                                <div className="btn-container">
                                    {server?.map((servers, index) => <Button 
                                    style={{ minWidth: "8rem" }}
                                    key={index} onClick={() => {
                                        setplay(index)
                                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                    }} >
                                        {servers?.name}</Button>)}
                                </div>
                            </Card>
                        </div>
                        <div className="stream-content-container">
                            <h2>Episodes</h2>
                            <Card
                                style={{
                                    gap: "1rem",
                                    alignItems: "center"
                                }
                                }
                            >

                                {buttons?.map(btn => <Button key={btn} onClick={() => {
                                    setEpisode(btn)
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }} style={{ minWidth: "5rem" }}>{btn}</Button>)}
                            </Card>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Stream;
