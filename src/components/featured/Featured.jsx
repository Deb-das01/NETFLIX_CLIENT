import InfoOutlined from '@mui/icons-material/InfoOutlined';
import PlayArrow from '@mui/icons-material/PlayArrow';
import "./featured.scss";
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Featured({ type,setGenre }) {
  const [content, setContent] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`https://netflix-mern-backend.onrender.com/api/movies/random?type=${type}`, {
          headers: {
            token:
             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
          },
        });
        //res.data[0] is used because inside the response it contains the array
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);
  const handlePlayClick = () => {
    navigate("/watch", { state: { movie: content } });
  };

  const handleInfoClick = () => {
    setShowInfo(prev => !prev);
  };
  return (
    <div className="featured">
        {/* checking if any valid proptypes is passed or not if yes requireds are displayed */}
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={content.img}
        alt=""
      />
      <div className="info">
        <img
          src={content.imgTitle}
          alt=""
        />
        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
          <button className="play" onClick={handlePlayClick}>
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more" onClick={handleInfoClick}>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
        {showInfo && (
          <div className="infoBox">
            <h2>{content.title}</h2>
            <p>{content.year}</p>
            <p>{content.genre}</p>
          </div>
        )}
      </div>
    </div>
  );
}
