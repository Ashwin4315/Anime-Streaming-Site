import { useEffect, useState } from "react";
import { genre } from "../../constants/filter";
import Button from "../UI/Button";
import "./index.css"

type genreProps = {
    onget: (param: number[]) => void
}

function Genre({ onget }: genreProps) {

    const [includeGenre, setIncludeGenre] = useState<number[]>([]);

    const genreSelector = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault()

        if (!(includeGenre?.includes(id))) {
            setIncludeGenre([...includeGenre, id])

        }
        else {
            setIncludeGenre(includeGenre.filter((g) => g !== id))

        }
    }
    useEffect(() => {
        onget(includeGenre)

    }, [includeGenre,onget])

    return (

        <div className="genre-container">
            <h2>Genre</h2>
            <div>
                {genre.map((gen, index) => <Button
                    onClick={(e) => { genreSelector(e, gen?.mal_id) }}
                    ishover={{ backgroundColor: "rgba(99, 97, 98, 0.2)", color: "rgb(3, 173, 99)" }}
                    style={includeGenre?.includes(gen.mal_id) ? { backgroundColor: "transparent", border: "1px solid rgb(3, 173, 99)", color: "rgb(3, 173, 99) ", minWidth: "6rem", fontWeight: "bold" } : {
                        backgroundColor: "#191919    ",
                        color: "#979896   ", minWidth: "6rem", fontWeight: "bold"
                    }}
                    key={index}>{gen.name}</Button>)}
            </div>

        </div>
    );

}
export default Genre;