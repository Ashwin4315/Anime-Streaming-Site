import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetInfo from '../../hooks/useGetInfo';
import { jikenProps } from '../../types';
import DisplayAnime from '../../components/displayAnime';
import Loader from '../../components/loader';
import Button from '../../components/UI/Button';
import './index.css';


function Display() {

    const { type } = useParams();
    const location = useLocation();
    const { state } = location;
    const [url, seturl] = useState("")
    const [load, setload] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [anime, loading] = useGetInfo<jikenProps>(`${url}page=${page}`)


    useEffect(() => {
        seturl(state)
    }, [state])
    useEffect(() => {
        setload(true)
        setTimeout(() => {
            setload(false)
        }, 1000)
    }, [])


    return (
        <div className='detail-container'>
            {load ? <Loader /> : loading ? <Loader /> :
                <div>
                    <div style={{ padding: "auto" }}>

                        <DisplayAnime title={`${type} ${type === "Movies" ? "" : "Anime"}`} anime={anime?.data} />

                    </div>
                    <div className='search-btn-container'>
                        {page === 0 ? "" : <Button
                            onClick={page === 1 ? () => { } : () => {
                                setPage(page - 1)
                            }}
                            style={{
                                minWidth: "10rem",
                                marginRight: "1rem"
                            }}
                        >{"<"}</Button>}
                        {page !== anime?.pagination?.last_visible_page ? <Button
                            onClick={
                                () => {
                                    setPage(page + 1)
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

export default Display;