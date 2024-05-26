
export const type = [
  {
    name: "Movie",
    id: "3"
  },
  {
    name: "TV",
    id: "1"
  },
  {
    name: "OVA",
    id: "26"
  },
  {
    name: "ONA",
    id: "30"
  },
  {
    name: "Special",
    id: "2"
  },
  {
    name: "Music",
    id: "32"
  }
]

export const status = [
  {
    name: "Not Yet Aired",
    id: "Upcoming"
},
{
    name: "Ongoing",
    id: "Ongoing"
},
{
    name: "Completed",
    id: "Completed"
}
]



export const rated = [
  "ALL", "g", "pg", "pg13", "r17", "r", "rx"
]

export const choose = [
  {
    name: "Name A-Z",
    id: "title_az"
},
{
    name: "Recently updated",
    id: "recently_updated"
},
{
    name: "Recently added",
    id: "recently_added"
},
{
    name: "Release date",
    id: "release_date"
}
]

export const year = [
  "ALL",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",

]









export const show = [{
  name: "Sub",
  url: "http://localhost:3000/api/v1/getFilterAnime?language=sub&status=Ongoing"
},
{
  name: "Dub",
  url: "http://localhost:3000/api/v1/getFilterAnime?language=dub&status=Ongoing"
},
{
  name: "Trending",
  url: "http://localhost:3000/api/v1/getFilterAnime?language=sub&status=Ongoing",

},
{
  name: "Chinese",
  url: "http://localhost:3000/api/v1/getFilterAnime?country=5&status=Ongoing"

}
]