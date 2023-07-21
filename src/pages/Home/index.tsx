import useGetInfo from '../../hooks/useGetInfo';
import { jikenProps, searchProps } from '../../types';
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


function Home() {

    const [url, seturl] = useState("https://api.consumet.org/anime/gogoanime/recent-episodes?type=1&")
    const [selbtn, setselbtn] = useState(0)
    const [page, setPage] = useState<number>(1)
    const [airing, aloading] = useGetInfo<jikenProps>("https://api.jikan.moe/v4/seasons/now")
    const [anime, alloading] = useGetInfo<searchProps>(`${url}page=${page}`)
    const [top] = useGetInfo<searchProps>(`https://api.consumet.org/anime/gogoanime/top-airing`)
    const display = useRef<null | HTMLDivElement>(null);


  const handleClick = () => {
    display.current?.scrollIntoView({ behavior: 'smooth' }) as any;
};
    

    return (
        <div className='home-container'>

            {aloading || alloading ? <Loader /> :
                <div>

                    <Carousel data={airing?.data} />
                    <div ref={display}>
                        <div className='home-sub-container'>
                            <div>
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
                                    <DisplayAnime title="" anime={anime?.results} />

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
                                        {page !== airing?.pagination?.last_visible_page ? <Button
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
                                <DisplayTop data={top?.results} type="Treading Anime" />
                            </div>
                        </div>

                    </div>


                </div>
            }
            <Footer />
        </div>
    );
}

export default Home;