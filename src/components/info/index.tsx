import './index.css';

function Info({ anime }) {
    return (
        <>
            <div className="info-container">
                <div className="info-sub-con">
                    <div className='info-img'>
                        <img src={anime?.image} alt={anime?.title} />
                    </div>
                    <div className='info-con'>
                        <h2> {anime?.title}</h2>
                        <p><span>Title:</span> {anime?.title}</p>
                        <p><span>Type:</span> {anime?.type}</p>
                        <p><span>Episodes:</span> {anime?.totalEpisodes}</p>
                        <p><span>Status:</span> {anime?.status}</p>
                        <p><span>Dubbing:</span> {anime?.subOrDub}</p>
                        <p><span>Realease:</span> {anime?.releaseDate}</p>
                        <div className="info-genre">
                            <span>Genre: </span>{anime?.genres.map((genre: any, index: number) => <p key={index}>{genre}</p>)}
                        </div>
                    </div>
                </div>

                <div>
                    <p className='info-dis'><span>Description:</span> {anime?.description}</p>

                </div>

            </div>

        </>
    );
}

export default Info;