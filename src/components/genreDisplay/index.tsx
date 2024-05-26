import { useNavigate } from "react-router-dom";
import "./index.css"
import useGetAnime from "../../hooks/useGetInfo";
import { genreProp } from "../../types";

function GenreDisplay() {

    const navigate=useNavigate();

    const [genre,setgenre]=useGetAnime<genreProp>(`http://localhost:3000/api/v1/constant/getGenres`)
    
    console.log(genre)

    return (
        <div className="genre-display-main-container">
            <h2>Genres</h2>
            <div className="genre-display-types">
            {genre?.data?.map((genres,index)=>{
                return(
                    <button 
                    key={index}
                    onClick={()=> navigate(`/display/${genres?.name}`,{state:`http://localhost:3000/api/v1/getFilterAnime?genre=${genres?.id}`})}
                    >
                        {genres.name}
                    </button >
                )
            })}
            </div>

        </div>
    );
}

export default GenreDisplay;