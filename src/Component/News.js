import React, {useState,useEffect} from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
 
  const [pageSize, setpageSize] = useState(5)
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  


 const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
  const updatenews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${pageSize}`
    let data = await fetch(url)
    let parseData = await data.json()
    setarticles(parseData.articles)
    settotalResults(parseData.totalResults)
    setloading(false)
  }

  useEffect(() => {
    updatenews();
  }, [])
  

 const handlePrevClick = async () => {

    setpage(page - 1)
    updatenews()
  }

 const handleNexClick = async () => {
    setpage(page + 1)
    updatenews()
  }

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${pageSize}`
    setpage(page + 1)
    let data = await fetch(url)
    let parseData = await data.json()
    setarticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
  }


    return (
      <div className='container my-5'>
        <h1 className="text-center">NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={ <Spinner />}
        >
        <div className='container'>
          <div className='row '>
            {articles.map((element) => {
              return <div className="col md-4" key={element.name}>
                <NewItem
                  title={element.title}
                  description={element.description}
                  imageUrl={!element.urlToImage ? "https://i.guim.co.uk/img/media/c81ac974a97d0d3361d72d38b2f8062ad825d8ea/0_275_4288_2573/master/4288.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=0e822f8e112f76f166df6de71628834e" : element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  publishedAt={element.publishedAt}
                  source={element.source}
                />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container  d-flex justify-content-between'>
          <button disabled={page <= 1} type="button" onClick={handlePrevClick} className="btn btn-primary"> &larr; Previous</button>
          <button disabled={page === Math.ceil(totalResults / pageSize)} type="button" onClick={handleNexClick} className="btn btn-primary">Next &rarr;</button>
        </div> */}
      </div>
    )
  }

export default News
