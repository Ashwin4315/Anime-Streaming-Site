import { useEffect, useState } from "react";
import { genreProp } from "../../types";
import useGetInfo from "../../hooks/useGetInfo";
import Button from "../UI/Button";
import "./index.css"

type genreProps = {
    onget: (param: string[]) => void
}



function Genre({ onget }: genreProps) {

    const [genre] = useGetInfo<genreProp>(`http://localhost:3000/api/v1/constant/getGenres`)

    const [includeGenre, setIncludeGenre] = useState<string[]>([]);

    const genreSelector = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
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

    }, [includeGenre, onget])

    return (

        <div className="genre-container">
            <h2>Genre</h2>
            <div>
                {genre?.data?.map((gen, index) => <Button
                    onClick={(e) => { genreSelector(e, gen?.id) }}

                    style={includeGenre?.includes(gen?.id) ? { backgroundColor: "transparent", border: "1px solid rgb(3, 173, 99)", color: "rgb(3, 173, 99) ", minWidth: "6rem", fontWeight: "bold" } : {
                        backgroundColor: "#191919    ",
                        color: "#979896   ", minWidth: "6rem", fontWeight: "bold"
                    }}
                    key={index}>{gen?.name}</Button>)}
            </div>


        </div>
    );

}
export default Genre;