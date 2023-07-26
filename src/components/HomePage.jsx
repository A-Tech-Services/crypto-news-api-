import React, {useEffect, useState} from 'react'
import axios from "axios";
import "./HomePageStyles.css"


const HomePage = () => {
    const [coinNewsDatas, setCoinNews] = useState([]);
    
    
    const options = {
        method: 'GET',
        url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news',
        params: {
          pair_ID: '1057391',
          page: '1',
          time_utc_offset: '28800',
          lang_ID: '1'
        },
        headers: {
          'X-RapidAPI-Key': 'c543991eccmsha9d03b5659fa628p18c9ffjsn98994b37dc17',
          'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com'
        }
    };

    // handling our response.
    useEffect(() => {
        axios.request(options)
        .then((response) => {
            console.log(response.data);
            setCoinNews(response.data.data[0].screen_data.news);
        })
        .catch((err) => console.log(err.message));
    }, [])


    const tagRegExp =  new RegExp('<\s*[^>]*>', 'g');

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
            <button >Previous Page</button>
            <button >Next Page</button>
        </div>
        </div>
    </div>
  )
}

export default HomePage