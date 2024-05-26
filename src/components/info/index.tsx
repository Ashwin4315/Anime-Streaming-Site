import './index.css';

function Info({anime}) {
    return (
        <>
            <div className="info-container">
                <div className="info-sub-con">
                    <div className='info-img'>
                        <img src={anime?.animeImage?.image} alt={anime?.animeImage?.title} />
                    </div>
                    <div className='info-con'>
                        <h2> {anime?.animeImage?.title}</h2>
                        <p><span>Title:</span> {anime?.animeImage?.title}</p>
                        <p><span>Type:</span> {anime?.animeInfo?.['Type:']}</p>
                        <p><span>Episodes:</span> {anime?.episodeCount}</p>
                        <p><span>Status:</span> {anime?.animeInfo?.['Status:']}</p>
                        <p><span>Realease:</span> {anime?.animeInfo?.['Released:']}</p>
                        <div className="info-genre">
                            <span>Genre: </span>{anime?.animeInfo?.['Genre:'].map((genre: any, index: number) => <p key={index}>{genre}</p>)}
                        </div>
                    </div>
                </div>

                <div>
                    <p className='info-dis'><span>Description:</span> {anime?.animeInfo?.['Plot Summary:']}</p>

                </div>

            </div>

        </>
    );
}

export default Info;