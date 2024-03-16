import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount() {
        this.updateNews();
    }

    updateNews = async () => {
        this.setState({ loading: true });
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let response = await fetch(url);
        let data = await response.json();
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            loading: false,
        });
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News App`;
    }

    fetchData = async () => {
        this.setState({ page: this.state.page + 1 });
        const nextPage = this.state.page + 1;
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
        let response = await fetch(url);
        let data = await response.json();
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults,
            loading: false,
            page: nextPage,
        });
    }

    render() {
        return (
            <>
                <h1 className='text-center'>News app - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length} 
                    next={this.fetchData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} 
                                              author={element.author ? element.author : "unknown"} 
                                              date={element.publishedAt ? element.publishedAt : ""} 
                                              description={element.description ? element.description.slice(0, 88) : ""} 
                                              imageUrl={element.urlToImage ? element.urlToImage : "https://static.toiimg.com/thumb/msid-108210713,width-1070,height-580,imgsize-668426,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} 
                                              newsUrl={element.url} />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;
