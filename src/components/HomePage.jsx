import React, {useEffect, useState} from 'react'
import axios from "axios";
import "./HomePageStyles.css"


const HomePage = () => {
    const [coinNewsDatas, setCoinNews] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(false);
    
    

    // handling our response.
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news',
            params: {
              pair_ID: '1057391',
              page: page,
              time_utc_offset: '28800',
              lang_ID: '1'
            },
            headers: {
              'X-RapidAPI-Key': 'c543991eccmsha9d03b5659fa628p18c9ffjsn98994b37dc17',
              'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com'
            }
        };

        
        axios.request(options)
        .then((response) => {
            // console.log(response.data);
            setLoad(!load);
            setCoinNews(response.data.data[0].screen_data.news);
        })
        .catch((err) => {
            setLoad(!load);
            setError(err.message);
        });
    }, [page])


    const tagRegExp =  new RegExp('<\s*[^>]*>', 'g');

    // nextpage button
    const nextPage = () => {
            let newValue = page + 1;
            setPage(newValue);
        }

    
    // previous page button
    const previousPage = () => {
        let newValue = page - 1;
        setPage(newValue);
    }

    // handling error state.
    if(error){
        return (
            <div className='error'>
                <p>An Error Occured: {error}</p>;
            </div>
        )
    } else if (!load){
        return(
            <div className="loading">
                <img 
                    src='https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif?20140201131911'
                    alt='loading GIF'
                />
            </div>
        )
    } else {
        return (

            <div>
                <h1>Daily Crypto News</h1>
                <div className='news-container'>
        
                {
                    coinNewsDatas.map((coinNewsData) => {
                        return(
                            <div className='news-card' key={coinNewsData.news_ID}>
                                <div className="card-image">
                                    <img src={coinNewsData.related_image_big}/>
                                </div>
                                <h2>{coinNewsData.HEADLINE}</h2>
                                <p>{coinNewsData.BODY.replace(tagRegExp, '')}</p>
                            </div>
                        );
                    })
                }
        
                <div className="btns">
                    <button onClick={previousPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div>
                </div>
            </div>
          )
    }
}

export default HomePage
