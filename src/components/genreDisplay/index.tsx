import { useNavigate } from "react-router-dom";
import "./index.css"
import { genre } from "../../constants/filter";

function GenreDisplay() {

    const navigate=useNavigate()


    return (
        <div className="genre-display-main-container">
            <h2>Genres</h2>
            <div className="genre-display-types">
            {genre.map((genres,index)=>{
                return(
                    <button 
                    key={index}
                    onClick={()=> navigate(`/display/${genres?.name}`,{state:`https://api.jikan.moe/v4/anime?genres=${genres.mal_id}&order_by=popularity&`})}
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