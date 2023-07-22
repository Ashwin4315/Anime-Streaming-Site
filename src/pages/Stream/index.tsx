import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { SeverProps, animeInfoProps, jikenProps } from "../../types";
import { isStreamsb, subOrDub } from "../../utils/helper";
import useGetInfo from "../../hooks/useGetInfo";
import Loader from "../../components/loader";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import DisplayTop from "../../components/displayTop";
import DisplayAnime from "../../components/displayAnime";
import Info from "../../components/info";
import "./index.css"


function Stream() {

    const { streamId } = useParams()
    const location = useLocation();
    const [episode, setEpisode] = useState<{ epi: string, number: number }>({ epi: `${streamId}-episode-1`, number: 1 })
    const [play, setplay] = useState<number>(0)
    const [lang, setlang] = useState<string>(location.state.anime.subOrDub)
    const [show, setshow] = useState<boolean>(false)
    const [toggle, settoggle] = useState<boolean>(false)
    const [buttonset, setbuttonset] = useState<{ id: string; number: number; url: string; }[][]>([])
    const [cubuttons, setcubuttons] = useState<{ id: string; number: number; url: string; }[]>([])
    const [buttons, setbuttons] = useState<{ id: string; number: number; url: string; }[]>(location?.state?.anime?.episodes)
    const [server, loading] = useGetInfo<SeverProps[]>(`https://api.consumet.org/anime/gogoanime/servers/${episode.epi}`)
    const [recommended] = useGetInfo<jikenProps>(`https://api.jikan.moe/v4/anime?genres=${location?.state?.genres}&order_by=popularity`)
    const [language] = useGetInfo<animeInfoProps>(`https://api.consumet.org/anime/gogoanime/info/${location.state.anime.subOrDub === "sub" ? location.state.anime.id + "-dub" : subOrDub(location.state.anime.id)}`)


    useEffect(() => {
        const filtered = server?.findIndex(isStreamsb)
        setplay(filtered === undefined ? 0 : filtered)
    }, [server])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }, [])

    useEffect(() => {

        function slipt(items, size) {
            const sArr: any[] = []
            items = [].concat(...items)

            while (items.length) {
                sArr.push(
                    items.splice(0, size)
                )
            }

            return sArr
        }
        setbuttonset(slipt(buttons, 100))

    }, [buttons])

    useEffect(() => {
        setcubuttons(buttonset[0])
    }, [buttonset])

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
                            style={{ background: "black", justifyContent: "flex-end", alignItems: "center", marginBottom: "1.5rem" }}
                        >
                            <div
                            >{lang === "sub" ? <div
                                style={{ display: "flex", alignItems: "center" }}
                            ><span
                                style={{ color: "grey" }}

                                className="material-symbols-outlined">
                                    closed_caption
                                </span> sub</div> : <div
                                    style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}

                                ><span
                                    style={{ color: "grey", fontSize: "1rem" }}
                                    className="material-symbols-outlined">
                                    mic
                                </span>dub</div>}</div>
                            <Button
                                style={{
                                    marginRight: "1rem",
                                    marginLeft: "1rem",
                                    backgroundColor: "#222222"
                                }}
                                onClick={() => { episode.number === 1 ? setEpisode({ epi: `${streamId}-episode-1`, number: 1 }) : setEpisode({ epi: `${streamId}-episode-${episode.number - 1}`, number: episode.number - 1 }) }}
                            >{"< Prev"}</Button>
                            <Button
                                style={{
                                    backgroundColor: "#222222"

                                }}
                                onClick={() => { episode.number === buttons.length ? setEpisode({ epi: `${streamId}-episode-${buttons.length}`, number: buttons.length }) : setEpisode({ epi: `${streamId}-episode-${episode.number + 1}`, number: episode.number + 1 }) }}

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
                                <p>You're watching <span style={{ color: "black", fontWeight: "bolder" }}>Episode {episode.number} </span> .If current servers doesn't work, please try other servers beside</p>
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
                                <h3>Current Server<span>&nbsp;&nbsp;{server?.[play]?.name}</span></h3>
                                <div className="btn-container">
                                    {server?.map((servers, index) => <Button
                                        style={play === index ? { minWidth: "8rem", backgroundColor: "white", color: "black" } : { minWidth: "8rem" }}
                                        key={index} onClick={() => {
                                            setplay(index)
                                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                        }} >
                                        {servers?.name}</Button>)}
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
                                            onClick={() => { settoggle(!toggle) }}
                                        >{lang}<span className="material-symbols-outlined">
                                                expand_more
                                            </span></section>
                                        <div className={toggle ? "subordub-changer" : "displaynone"}>
                                            <Button
                                                onClick={() => {
                                                    setbuttons(location?.state?.anime?.episodes)
                                                    setlang(location.state.anime.subOrDub)
                                                    settoggle(!toggle)

                                                }}
                                            >{location?.state?.anime?.subOrDub}</Button>
                                            {language?.id === undefined ? "" : <Button
                                                onClick={() => {
                                                    setbuttons(language?.episodes)
                                                    setlang(location.state.anime.subOrDub === "sub" ? "dub" : "sub")
                                                    settoggle(!toggle)
                                                }}
                                            >{location.state.anime.subOrDub === "sub" ? "dub" : "sub"}</Button>}
                                        </div>
                                    </div>
                                    <div className="subordub">
                                        <section
                                            onClick={() => { setshow(!show) }}
                                        >{cubuttons?.[0]?.number + "-" + cubuttons?.[cubuttons.length - 1]?.number}<span className="material-symbols-outlined">
                                                expand_more
                                            </span></section>
                                        <div className={show ? "subordub-changer" : "displaynone"}>
                                            {buttonset.map((btn, i) => {
                                                return <Button
                                                    key={i}
                                                    style={{ padding: "0.5rem 0rem" }}
                                                    onClick={() => {
                                                        setcubuttons(btn)
                                                        setshow(!show)

                                                    }}
                                                >{btn[0].number + "-" + btn[btn.length - 1].number}</Button>
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

                                    {cubuttons?.map(btn => <Button key={btn.number} onClick={() => {
                                        setEpisode({ epi: btn.id, number: btn.number })
                                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                    }} style={episode.number === btn.number ? { minWidth: "5rem", backgroundColor: "white", color: "black" } : { minWidth: "5rem" }}>{btn.number}</Button>)}

                                </Card>
                            </Card>
                            <div>
                                <Info anime={location?.state?.anime} />
                            </div>

                            <div className="Recommended-card">
                                <DisplayTop data={recommended?.data} type="Recommended Anime" />
                            </div>
                            <div className="Recommended-display">
                                <DisplayAnime anime={recommended?.data} title="Recommended Anime" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Stream;
