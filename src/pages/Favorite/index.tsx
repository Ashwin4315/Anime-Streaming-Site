import DisplayAnime from "../../components/displayAnime";
import { useAppSelector } from "../../hooks/app";
import { RootState } from "../../store/store";



function Favorite() {


    const favorites = useAppSelector((state: RootState) => state.favorite)

    return (
        <div className='Favorite-container'>


            {favorites.data[0] === undefined ? <div style={{
                width: "100vw",
                height: "90vh",
                display: "flex",
                padding: "2%",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center"
            }}><h2>No anime is added to favorites</h2></div>
                : <DisplayAnime title="Favorites" anime={favorites.data} />

            }


        </div>
    );
}

export default Favorite;

