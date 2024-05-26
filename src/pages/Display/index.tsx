import {  useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetInfo from '../../hooks/useGetInfo';
import { searchProps } from '../../types';
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
    const [anime, loading] = useGetInfo<searchProps>(`${state}&page=${page}`)





    return (
        <div className='detail-container'>
            {loading ? <Loader /> :
                <div>
                    <div style={{ padding: "auto" }}>

                        <DisplayAnime title={`${type} ${type === "Movies" ? "" : "Anime"}`} anime={anime?.anime} />

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
                       <Button
                            onClick={
                                () => {
                                    setPage(page + 1)
                                }
                            }
                            style={{
                                minWidth: "10rem"
                            }}
                        >{">"}</Button> 
                    </div>
                </div>

            }
        </div>
    );
}

export default Display;