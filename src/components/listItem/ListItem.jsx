import "./listItem.scss";
import PlayArrow from '@mui/icons-material/PlayArrow';
import Add from '@mui/icons-material/Add';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);

 //to understand the below hook refer to home.jsx file.
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  const handleThumbsUpClick = (e) => {
    e.stopPropagation();
    setThumbsUp(!thumbsUp);
    if (!thumbsUp) {
      setThumbsDown(false);
    }
  };

  const handleThumbsDownClick = (e) => {
    e.stopPropagation();
    setThumbsDown(!thumbsDown);
    if (!thumbsDown) {
      setThumbsUp(false);
    }
  };
  
  console.log("Image URL:", movie.img);

  return (
    <div
      className="listItem"
       // The below mathematical calculation is done to fix the hovered zoomed item at a specific portion
      // here,
      // index*225 is the total size of one item from the beginning 
      // -50 is done substract the extra space taken by the shift arrow at the beginning
      // and index*2.5 is for the space between two items that which is a total of 5 thus that is calculated 
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie.img} alt="" />
      {isHovered && (
        <>
        {/* // the below line is basically transferring the control to the watch page by passing a paricular
            // movie along with it */}
          <Link to="/watch" state={{ movie: movie }}>
          <video src={movie.trailer} autoPlay={true} loop muted />
          </Link>
          <div className="itemInfo">
            <div className="icons">
              <Link to="/watch" state={{ movie: movie }}>
                <PlayArrow className="icon" />
              </Link>
              <Add className="icon" />
              {thumbsUp ? (
                <ThumbUp className="icon" onClick={handleThumbsUpClick} />
              ) : (
                <ThumbUpAltOutlined
                  className="icon"
                  onClick={handleThumbsUpClick}
                />
              )}
              {thumbsDown ? (
                <ThumbDown className="icon" onClick={handleThumbsDownClick} />
              ) : (
                <ThumbDownOutlined
                  className="icon"
                  onClick={handleThumbsDownClick}
                />
              )}
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}
