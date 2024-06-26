

export type animeInfoProps = {
    animeImage: {
        image: string,
        title: string
    },
    animeInfo: {
        "Type:": string,
        "Plot Summary:": string,
        "Genre:": [string],
        "Released:": string,
        "Status:": string,
        "Other name:": string
    },
    episodeCount: number
}


export type searchProps = {

    anime: [{
        image: string,
        id: string,
        anime: string,
        released: string,
    }]

}
export type favaprops = {

        image: string,
        id: string,
        anime: string,
        released: string,
    }



export type genreProp = {
    status: string,
    data: [{
        name: string,
        id: string
    }

    ]
}


export type filterdProps = {
    [key: string]: string

}



export type SeverProps = {

    episodeName: string,
    episodeCount: number,
    streamlinks: [
        {
            link: string,
            provider: string
        }

    ]
}


export type displayAnimeProps = {

    image: string,
    id: string,
    anime: string,
    released: string,

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

export type jikanInfoProps = {
    data:
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

}
export type jikanInfo = { //nch

    mal_id: number,
    url: string,
    id: string,
    image: string,
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

export type kitsu = {
    data: [
        {
            id: number,
            type: string,
            attributes: {
                slug: string,
                synopsis: string,
                description: string,
                titles: {
                    en: string,
                    en_jp: string,
                    ja_jp: string
                },
                canonicalTitle: string,
                averageRating: number,
                userCount: number,
                favoritesCount: number,
                subtype: string,
                status: string,
                posterImage: {
                    tiny: string,
                    large: string,
                    small: string,
                    medium: string,
                    original: string,
                }
                coverImage: {
                    tiny: string,
                    large: string,
                    small: string,
                    original: string,
                },
                episodeCount: null,
                episodeLength: number,
                totalLength: number,
                showType: string,
            },
        }

    ]
}


////////////////////////
