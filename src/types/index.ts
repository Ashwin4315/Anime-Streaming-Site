

export type animeInfoProps = {
    genres: string[],
    id: string,
    image: string,
    title: string,
    url: string,
    releaseDate: string,
    description: string,
    subOrDub: string,
    type: string,
    status: string,
    otherName: string,
    totalEpisodes: number,
}

export type searchProps = {
    currentPage: number,
    hasNextPage: boolean,
    results: [{
        genres: string[],
        id: string,
        image: string,
        title: string,
        url: string
    }]

}
export type filterdProps = {
        [key:string]:string
       
    }



export type SeverProps = {

    name: string,
    url: string

}

export type displayAnimeProps = {
    genres: string[],
    id: string,
    type: string,
    source: string,
    episodes: number,
    title: string,
    url: string,
    image: string,
    images: {
        jpg: {
            image_url: string,
            small_image_url: string,
            large_image_url: string
        },


    }
}


export type displaygogoProps = {
    genres: string[],
    id: string,
    type: string,
    source: string,
    episodes: number,
    title: string,
    url: string,
    image: string,

}



export type jikenProps = {

    
    data: [
        {
            mal_id: number,
            url: string,
            images: {
                jpg: {
                    image_url: string,
                    small_image_url: string,
                    large_image_url: string
                },

            },
            trailer: {
                youtube_id: string,
                url: string,
                embed_url: string
            },
            approved: boolean,
            titles: [
                {
                    type: string,
                    title: string
                }
            ],
            title: string,
            title_english: string,
            title_japanese: string,

            type: string,
            source: string,
            episodes: 0,
            status: "Finished" | "Airing",
            airing: true,
            aired: {
                from: string,
                to: string,
                prop: {
                    from: {
                        day: number,
                        month: number,
                        year: number
                    },
                    to: {
                        day: number,
                        month: number,
                        year: number
                    },
                    string: string
                }
            },
            duration: string,
            rating: string,
            score: number,
            scored_by: number,
            rank: number,
            popularity: number,
            members: number,
            favorites: number,
            synopsis: string,
            background: string,
            season: string,
            year: number,
            broadcast: {
                day: string,
                time: string,
                timezone: string,
                string: string
            },
            producers: [
                {
                    mal_id: number,
                    type: string,
                    name: string,
                    url: string
                }
            ],
            licensors: [
                {
                    mal_id: number,
                    type: string,
                    name: string,
                    url: string
                }
            ],
            studios: [
                {
                    mal_id: number,
                    type: string,
                    name: string,
                    url: string
                }
            ],
            genres: [
                {
                    mal_id: number,
                    type: string,
                    name: string,
                    url: string
                }
            ],
            explicit_genres: [
                {
                    mal_id: number,
                    type: string,
                    name: string,
                    url: string
                }
            ],
            themes: [
                {
                    mal_id: number,
                    type: string,
                    name: string,
                    url: string
                }
            ],
            demographics: [
                {
                    mal_id: number,
                    type: string,
                    name: string,
                    url: string
                }
            ]
        }
    ],
    
    pagination: {
        last_visible_page: number,
        has_next_page: true,
        items: {
            count: number,
            total: number,
            per_page: number
        }

    }

}