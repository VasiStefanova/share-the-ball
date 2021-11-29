import { useEffect, useState } from 'react';
import nbaNewsRequest from '../../services/nba-data/nba-news-request';
import Figure from 'react-bootstrap/Figure';
import './NBANews.css';

const NBANews = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    nbaNewsRequest()
      .then(response => setArticles(response.posts))
      .catch(err => console.error(err));
  }, []);

  // to be completed//

  return articles.length ?
    <>
      <div className='article-container theme-border-style'>
        <div className="single-article-header-bar">
          <Figure.Image
            className='figure-img-article'
            width={171}
            height={180}
            alt="171x180"
            src="https://stats-prod.nba.com/wp-content/uploads/sites/65/2021/10/chris-paul-860-211022.jpg"
          />
          <div className="single-article-headar-bar-text">
            <h6 className='author-username author-username-single-article'>'Title'</h6>
            <p className="additional-author-info">'date published'</p>
            <div className="article-content theme-text-style">
              <p className='article-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quidem neque officia quos ut, earum explicabo velit soluta
                perspiciatis iste quisquam iusto ab tempora praesentium nulla
                voluptate reiciendis dolores unde provident?
              </p>
            </div>
          </div>
        </div>
      </div>
    </> :
    null;
};

export default NBANews;
