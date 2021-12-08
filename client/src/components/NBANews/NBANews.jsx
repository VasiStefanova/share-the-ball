import { useEffect, useState } from 'react';
import nbaNewsRequest from '../../services/nba-data/nba-news-request';
import Figure from 'react-bootstrap/Figure';
import './NBANews.css';

const NBANews = () => {
  const [articles, setArticles] = useState([]);
  const dateAsStringStartIndex = 0;
  const dateAsStringCutOffIndex = 10;

  // This function below takes out just the content of the article we need
  // as it comes as an HTML string from the endpoint

  const getContentString = (str) => {
    const startingSymbol = 43;
    const stringAsArray = str.split('');
    const result = [];
    for (let i = startingSymbol; i < stringAsArray.length; i++) {
      if (str[i] === '<') {
        break;
      }
      result.push(str[i]);
    }

    return result.join('').trim();
  };

  const handleScroll = (ev) => {
    const target = document.querySelector('div.nba-news-container');
    target.scrollLeft += ev.deltaY;
  };

  useEffect(() => {
    nbaNewsRequest()
      .then(response => setArticles(response.posts))
      .catch(err => console.error(err));
  }, []);

  return (articles.length ?
    <div
      className='nba-news-container'
      onWheel={handleScroll}
    >
      {articles.map(article => (
        <div
          key={article.id}
          className='article-container theme-border-style'
          onClick={() => window.open(article.meta['beyondthenumber-link'])}
        >
          <div className="single-article-header-bar">
            <Figure.Image
              className='figure-img-article'
              width={171}
              height={180}
              alt="171x180"
              src={article.image}
            />
            <div className="single-article-headar-bar-text">
              <h6 className='author-username author-username-single-article'>{article.title}</h6>
              <p className="additional-author-info">{article.date.substring(dateAsStringStartIndex, dateAsStringCutOffIndex)}</p>
              <div className="article-content theme-text-style">
                <p className='article-text'>
                  {getContentString(article.content)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>:
    null);
};

export default NBANews;
