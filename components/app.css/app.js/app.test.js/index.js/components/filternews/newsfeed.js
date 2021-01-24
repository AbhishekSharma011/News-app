import './NewsFeed.css';

function NewsFeed(props) {               

    function onClickHandler(index) {     
        props.removeNews(index);         
    }

    if (props.newsData.length) {          

        var newsData = props.newsData;
        var newsCard = newsData.map((newsCard , index) => {
            return (
                <div key={newsCard.id} className="news-card-element mt-4">         
                    <div className="news-title">                                     
                        <p> {newsCard.title} </p>                                   
                        <p className="cross" onClick={()=>onClickHandler(index)}>&times;</p>      
                    </div>

                    <div className="text-muted mb-2">           
                        <span className="author-name"> {newsCard.author} </span>
                        <span>&nbsp;|&nbsp;</span>
                        <span className="publish-date">{newsCard.published.slice(0 , 19)}</span>
                    </div>

                    <div className="image">                             
                    {
                        
                        newsCard.image ?                         <div className="left-image">
                            <img src={newsCard.image}  alt="news-logo"></img>
                        </div> : <div className="d-none"> </div>
                    }
                        <div className="pl-3 right">
                            <p className="news-description">{newsCard.description} </p>     
                            <p className="links">
                                <span className="reference">Referrence</span>
                                <br/>
                                <a href={newsCard.url}>{newsCard.url} </a>
                            </p>
                        </div>
                    </div>
                </div>
            )
        })
    }
    else       
    {
        newsCard = <div key={"no-news"}
            var className="news-card-element mt-4">              
            <div className="news-title">
                <p>
                    no news found for this selected combination  , Try other combination or press Get Latest Button for Latest News
                </p>
            </div>
        </div>
    }
    return (
        <div className="news-card-all">
            {newsCard}
         </div>
    )
}
export default NewsFeed;
