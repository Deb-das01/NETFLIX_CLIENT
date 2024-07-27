import React, { useState, useEffect } from 'react';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import PlayArrow from '@mui/icons-material/PlayArrow';

import "./popularfeatured.scss";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function PopularFeatured({ type, setGenre, popularMoviesList, popularWebseriesList }) {
  const [content, setContent] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        let randomContent;
        if (type === "movie" && popularMoviesList.length > 0) {
          randomContent = popularMoviesList[Math.floor(Math.random() * popularMoviesList.length)];
        } else if (type === "webseries" && popularWebseriesList.length > 0) {
          randomContent = popularWebseriesList[Math.floor(Math.random() * popularWebseriesList.length)];
        }
        // Ensure randomContent is defined before setting it
        console.log("random:", randomContent);
        if (randomContent) {
          // Fetch details of the selected movie from the backend
          const idx=Math.floor(Math.random() * randomContent.content.length);
          const { data } = await axios.get(`movies/find/${randomContent.content[idx]}`,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
          setContent(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRandomContent();
  }, [type, popularMoviesList, popularWebseriesList]);

  const handlePlayClick = () => {
    navigate("/watch", { state: { movie: content } });
  };

  const handleInfoClick = () => {
    setShowInfo(prev => !prev);
  };
  return (
    <div className="featured">
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play"  onClick={handlePlayClick}>
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
