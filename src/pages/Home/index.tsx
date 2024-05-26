import useGetInfo from '../../hooks/useGetInfo';
import { jikenProps, kitsu, searchProps } from '../../types';
import Carousel from '../../components/carousel';
import DisplayAnime from '../../components/displayAnime';
import Loader from '../../components/loader';
import './index.css';
import { useState, useRef } from 'react';
import Button from '../../components/UI/Button';
import { show } from '../../constants/filter';
import DisplayTop from '../../components/displayTop';
import GenreDisplay from '../../components/genreDisplay';
import Footer from '../../components/footer';
import Card from '../../components/UI/Card';


function Home() {

    const [url, seturl] = useState("http://localhost:3000/api/v1/getFilterAnime?language=sub")
    const [page, setPage] = useState<number>(1);

    const [selbtn, setselbtn] = useState(0);
    
    const [airing, aloading] = useGetInfo<jikenProps>("https://api.jikan.moe/v4/seasons/now")
    const [trending] = useGetInfo<kitsu>("https://kitsu.io/api/edge/trending/anime?filter[status]=current&sort=popularityRank")

    const [anime, alloading] = useGetInfo<searchProps>(`${url}&page=${page}`)
 
    console.log(anime)

    const display = useRef<null | HTMLDivElement>(null);


    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    };


    return (
        <div className='home-container'>

            {aloading || alloading ? <Loader /> :
                <div>

                    <Carousel data={airing?.data} />
                    <div ref={display}>

                        <div className='home-sub-container'>
                            <div>

                                <Card
                                    style={{
                                        padding: "1rem",
                                        backgroundColor: "rgba(3, 173, 99,0.8)",
                                        margin: "3rem 1rem"
                                    }
                                    }
                                >
                                    <p> Enable <span style={{ color: "black", fontWeight: "bolder" }}>Add blocker</span> in your browser setting or use <span style={{ color: "black", fontWeight: "bolder" }}>Brave browser</span> to avoid add popup or redirects </p>
                                </Card>
                                <div className='home-btn-container'>
                                    <h2>Recently Updated</h2>
                                    <div>
                                        {show.map((type, index) => {
                                            return <div key={index}>
                                                <Button
                                                    onClick={() => {
                                                        setselbtn(index);
                                                        seturl(`${type.url}`)
                                                        setPage(1)

                                                    }}
                                                    style={selbtn === index ? { color: "white" } : { color: "grey" }}

                                                >{type.name}</Button>
                                            </div>
                                        })}

                                    </div>
                                </div>
                                <div >
                                    
                                    <DisplayAnime title="" anime={anime?.anime} />

                                    <div className='search-btn-container'>
                                        {page === 0 ? "" : <Button
                                            onClick={page === 1 ? () => { } : () => {
                                                setPage(page - 1)
                                                handleClick()

                                            }}
                                            style={{
                                                minWidth: "10rem",
                                                marginRight: "1rem"
                                            }}
                                        >{"<"}</Button>}
                                        {anime? <Button
                                            onClick={
                                                () => {
                                                    setPage(page + 1)
                                                    handleClick()

                                                }
                                            }
                                            style={{
                                                minWidth: "10rem"
                                            }}
                                        >{">"}</Button> : ""}
                                    </div>
                                </div>
                            </div>
                            <div className='treading-con'>
                                <GenreDisplay />
                                <DisplayTop data={trending?.data} type="Top 10 Anime" />
                            </div>
                        </div>

                    </div>

                    <Footer />

                </div>
            }
        </div>
    );
}

export default Home;