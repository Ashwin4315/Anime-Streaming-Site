import { useState ,useEffect} from 'react';
import "./index.css"
import DisplayAnime from '../../components/displayAnime';
import useGetAnime from '../../hooks/useGetInfo';
import { jikenProps } from '../../types';
import Button from '../../components/UI/Button';
import Loader from '../../components/loader';

function Search() {

    const [inputSearch, setinputSearch] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)

    const inputSearchAnime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputSearch(e.target.value)
    }
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch(inputSearch)
        setinputSearch("")

    }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }, [])


    const [anime,loading] = useGetAnime<jikenProps>(` https://api.jikan.moe/v4/anime?q=${search}&page=${page}`)
    return (
        <div className='search-container'>
            <div className='search-form-container'>

                <form onSubmit={formSubmit}>
                    <input
                        type="text"
                        value={inputSearch}
                        onChange={(e) => { inputSearchAnime(e) }} />

                    <Button
                        style={{
                            borderRadius: "7rem",
                            padding: "0.5rem 0.7rem"

                        }}
                    >
                        <span
                            style={{ color: "white", fontWeight: "bolder" }}
                            className="material-symbols-outlined">
                            search
                        </span>
                    </Button>
                </form>

            </div>
            {loading ?<Loader/>:
            <div className='search-results-container'>
                <DisplayAnime title={search === "" ? "Type Anime to Search" : `Results found ${anime?.pagination?.items?.total} for ${search}`} anime={anime?.data} />
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
                    {page !== anime?.pagination?.last_visible_page  ? <Button
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

export default Search;

