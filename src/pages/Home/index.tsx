import useGetInfo from '../../hooks/useGetInfo';
import { jikenProps } from '../../types';
import Carousel from '../../components/carousel';
import DisplayAnime from '../../components/displayAnime';
import Loader from '../../components/loader';
import './index.css';
import { useState } from 'react';
import Button from '../../components/UI/Button';


function Home() {

    const [page, setPage] = useState<number>(1)
    const [airing, aloading] = useGetInfo<jikenProps>(`https://api.jikan.moe/v4/top/anime?limit=25&filter=airing&page=${page}`)

  

    return (
        <div className='home-container'>

            {aloading ? <Loader /> :
                <div>
                    <Carousel data={airing?.data} />
                    <div style={{padding:"auto"}}>
                        <DisplayAnime title='Airing Anime' anime={airing?.data} />
                    </div>
                    <div className='search-btn-container'>
                    {page === 0 ? "" : <Button
                        onClick={page === 1 ? () => { } : () => { 
                        setPage(page - 1)                                        
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}
                        style={{
                            minWidth: "10rem",
                            marginRight: "1rem"
                        }}
                    >{"<"}</Button>}
                    {page !== airing?.pagination?.last_visible_page  ? <Button
                        onClick={
                            ()=>{setPage(page + 1) 
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }
                        }
                        style={{
                            minWidth: "10rem"
                        }}
                    >{">"}</Button> : ""}
                </div>


                </div>

            }
        </div>
    );
}

export default Home;