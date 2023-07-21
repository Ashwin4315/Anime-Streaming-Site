import { useState, useEffect, useReducer, useRef } from 'react';
import DisplayAnime from '../../components/displayAnime';
import useGetAnime from '../../hooks/useGetInfo';
import { jikenProps } from '../../types';
import Button from '../../components/UI/Button';
import Loader from '../../components/loader';
import Genre from '../../components/genre';
import "./index.css"
import Card from '../../components/UI/Card';
import Select from '../../components/Select';
import { choose, rated, status, type, year } from '../../constants/filter';


interface filterAction {
    type: string;
    payload: string;
}

interface filterState {
    type: string,
    status: string,
    rated: string,
    year: string,
    choose: string,
}


function filterReducer(state: filterState, action: filterAction) {
    const { type, payload } = action;
    switch (type) {
        case "type":
            return {
                ...state,
                type: payload,
            };
        case "status":
            return {
                ...state,
                status: payload,
            };
        case "rated":
            return {
                ...state,
                rated: payload,
            };
        case "choose":
            return {
                ...state,
                choose: payload,
            };
        case "year":
            return {
                ...state,
                year: payload,
            };
        default:
            return state;
    }
}

function Search() {

    const [inputSearch, setinputSearch] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [genre, setgenre] = useState<number[]>([])
    const filterref = useRef<null|HTMLDivElement>( null);
    const [filter, setfilter] = useState<{ genres: number[], type: string, status: string, rating: string, order: string, year: string } | null>(null)
    const [page, setPage] = useState<number>(1)
    const [state, dispatch] = useReducer(filterReducer, {
        type: "",
        status: "",
        rated: "",
        year: "",
        choose: ""
    });

    const inputSearchAnime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputSearch(e.target.value)
    }
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setfilter({
            genres: [],
            type: "",           
            status: "",
            rating: "",
            order: "",
            year: "",      
         })
        setSearch(inputSearch)


    }
    const filterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setfilter({ genres: genre, type: state.type, status: state.status, rating: state.rated, order: state.choose, year: state.year })

    }
    const getGenre = (gen: number[]) => {
        setgenre(gen)

    }
    const getFilter = ({ types, payload }: { types: string, payload: string }) => {
        dispatch({ type: types, payload: payload })
    }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }, [])

    const handleClick = () => {
        filterref.current?.scrollIntoView({behavior: 'smooth'}) as any;
      };


    const [anime, loading] = useGetAnime<jikenProps>(` https://api.jikan.moe/v4/anime?q=${search}&page=${page}&genres=${filter?.genres !== undefined ? filter?.genres?.toString() : ""}${filter?.type === undefined ? "" : filter?.type === "" ? "" : `&type=${filter?.type}`}${filter?.status === undefined ? "" : filter?.status === "" ? "" : `&status=${filter?.status}`}${filter?.rating === undefined ? "" : filter?.rating === "" ? "" : `&rating=${filter?.rating}`}${filter?.order === undefined ? "" : filter?.order === "" ? "" : `&order_by=${filter?.order}`}${filter?.year === undefined ? "" : filter?.year === "" ? "" : `&start_date=${filter?.year}-01-01`}`)
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
                        onClick={handleClick}

                    >
                        <span
                            style={{ color: "white", fontWeight: "bolder" }}
                            className="material-symbols-outlined">
                            search
                        </span>
                    </Button>

                </form>
                <form onSubmit={filterSubmit}>
                    <Card
                        style={{ marginTop: "1.5rem",padding:"2rem 3%", flexDirection: "column", gap: "2rem" }}
                    >
                        <div className='search-filter-con'>
                            <section>
                                <Select onset={getFilter} to="type" options={type} />
                                <Select onset={getFilter} to="status" options={status} />
                            </section>
                            <section>
                                <Select onset={getFilter} to="rated" options={rated} />
                                <Select onset={getFilter} to="choose" options={choose} />

                            </section>
                            <section>
                                <Select onset={getFilter} to="year" options={year} />

                            </section>

                        </div>
                        <Genre onget={getGenre} />
                        <Button
                            style={{ maxWidth: "5rem" }}
                            onClick={handleClick}
                        >Filter</Button>
                    </Card>

                </form>

            </div>
            {loading ? <Loader /> :
                <div className='search-results-container'ref={filterref}  >
                    <DisplayAnime title={search === "" ? `Filter results ${anime?.pagination?.items?.total}` : `Results found ${anime?.pagination?.items?.total} for ${search}`} anime={anime?.data} />
                   {anime?.pagination?.items?.total===0 ?<p style={{textAlign:"center",fontSize:"2rem",marginBottom:"5rem"}}>No result found</p> : ""}
                    { anime?.pagination?.items?.total===0?"":<div className='search-btn-container'>
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
                        {page !== anime?.pagination?.last_visible_page ? <Button
                            onClick={
                                () => {
                                    setPage(page + 1)
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }
                            }
                            style={{
                                minWidth: "10rem"
                            }}
                        >{">"}</Button> : ""}
                    </div>}
                </div>
            }
        </div>
    );
}

export default Search;

