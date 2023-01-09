import React, { Component } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
  pageSize

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);

  }

  constructor(props) {
    super(props);
    this.pageSize = props.pageSize
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults : 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updatenews() {
    this.props.setProgress(1);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.pageSize}`
    
    this.setState({
      loading: true
    })
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })

  }
  async componentDidMount() {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.pageSize}`
    // this.setState({
    //   loading: true
    // })
    // let data = await fetch(url)
    // let parseData = await data.json()
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false
    // })
    this.updatenews()
  }

  handlePrevClick = async () => {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}& rops.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.pageSize}`
    // this.setState({
    //   loading: true
    // })
    // let data = await fetch(url)
    // let parseData = await data.json()
    // this.setState({
    //   articles: parseData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // })
    this.setState({
      page: this.state.page - 1
    })
    this.updatenews()
  }
  handleNexClick = async () => {

    // if (!(this.state.page === (Math.ceil(this.state.totalResults / this.pageSize)))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.pageSize}`
    //   this.setState({
    //     loading: true
    //   })
    //   let data = await fetch(url)
    //   let parseData = await data.json()
    //   this.setState({
    //     articles: parseData.articles,
    //     page: this.state.page + 1,
    //     loading: false
    //   })
    // }
    this.setState({
      page: this.state.page + 1
    })
    this.updatenews()
  }

  fetchMoreData = async() => {
    this.setState({
      page : this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.pageSize}`
   
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    })
  }

  render() {

    return (
      <div className='container my-5'>
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={ <Spinner />}
        >
        <div className='container'>
          <div className='row '>
            {this.state.articles.map((element) => {
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
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-primary"> &larr; Previous</button>
          <button disabled={this.state.page === Math.ceil(this.state.totalResults / this.pageSize)} type="button" onClick={this.handleNexClick} className="btn btn-primary">Next &rarr;</button>
        </div> */}
      </div>
    )
  }

}
export default News
