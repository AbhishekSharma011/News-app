import React from 'react';
import {Header, FilterNews, NewsFeed} from './components'; 
import './App.css';
import axios from 'axios';

class App extends React.Component {
    

    constructor() {
        super();
        this.state = {
            language: "",
            country: "",
            startDate: "",
            endDate: "",
            fetchNews: []
        }
        this.loading = true             
        this.getLatestPressed = false   
        this.urlToken = "c8yIkB0OIX63tq8LKVpnmul0QhAKsxkwJLzKOYbe5GukV6W9"  
        this.url = ``                    
    }

    
    getNewsOnLoad = ()=>{
        this.url = `https://api.currentsapi.services/v1/latest-news?apiKey=${this.urlToken}`;
        axios.get(this.url).then(response => {
            this.loading = false;
            this.setState(prevState => {
                return {
                    language: "",
                    country: "",
                    startDate: "",
                    endDate: "",
                    fetchedNews: response.data.news         
                }
            })
        })
    }

   
    getLatest = () => {
        
         this.setState(prevState => {
                return {
                    language: "",
                    country: "",
                    startDate: "",
                    endDate: "",
                    fetchedNews: ""         
                }
            })
        this.loading = true;
        this.getLatestPressed = true;
        this.url = `https://api.currentsapi.services/v1/latest-news?apiKey=${this.urlToken}`;
        axios.get(this.url).then(response => {
            this.loading = false;
            this.setState(prevState => {
                return {
                    language: "",
                    country: "",
                    startDate: "",
                    endDate: "",
                    fetchedNews: response.data.news         
                }
            })
        })
    }

    
    removeNewsFeed = (index) => {
        if (this.state.fetchedNews) { 
            this.setState(prevState => {
                prevState.fetchedNews.splice(index, 1);
                var fetchedNewsUpdated = prevState.fetchedNews;  
                return {
                    language: prevState.language,
                    country: prevState.country,
                    startDate: prevState.startDate,
                    endDate: prevState.endDate,
                    fetchedNews: fetchedNewsUpdated
                }
            })
        }
    }

    
    getOptions = (language, country, startDate, endDate) => {
        this.setState({
            language: language,
            country: country,
            startDate: startDate,
            endDate: endDate,
            fetchNews: []
        })
    }

     
    getNews = (country, language, startDate, endDate) => {
        this.loading = true;
        if (startDate) 
            startDate = startDate + "T00:00:00+00:00";  // change the date to required format 
        
        if (endDate) 
            endDate = endDate +  "T00:00:00+00:00";

        this.getLatestPressed = false;
        this.url = `https://api.currentsapi.services/v1/search?country=${country}&language=${language}&start_date=${startDate}&end_date=${endDate}&apiKey=${this.urlToken}`;
        axios.get(this.url).then(response => {
                    this.loading = false;
            this.setState(prevState => {
                return {
                    language: prevState.language,
                    country: prevState.country,
                    startDate: prevState.startDate,
                    endDate: prevState.endDate,
                    fetchedNews: response.data.news
                }
            })
        })
    }
    
     
    componentDidMount() {
        this.getNewsOnLoad();
        this.loading = false;
    }

    render() {
        return (
        <div className="container-fluid app">    {/*  creating a layout of ui */}
            <div className="row header">
                <div className="offset-md-2">
                    <Header latestNews={this.getLatest} buttonStatus={this.getLatestPressed}/>
                </div>
            </div>
            <div>                           {/* aligning filter news and Newsfeed component side by side */} 
                <div className="row">
                    <div className="filterNews offset-md-2">
                        <FilterNews 
                            setAppState={this.getOptions}
                            reRender={this.getNews}
                            buttonStatus={this.getLatestPressed}/> 
                    </div>
                    <div className="newsCard ml-sm-5 ">
                     {
                        this.loading
                        ?         

                         <div className="loader mt-4">
                            <img src={require("./components/loading.svg").default} alt=""/>
                        </div>
                        :         
                            <NewsFeed 
                            removeNews={this.removeNewsFeed} 
                            newsData={this.state.fetchedNews ? this.state.fetchedNews : ""}/> 
                             
                     }
                     </div>
                </div>
            </div>
        </div>
        );
    }
        
}

export default App;
