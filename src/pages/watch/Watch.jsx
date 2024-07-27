import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined';

import {useNavigate, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  //The useLocation hook below provides access to the current location object, 
  //which represents where the app is currently navigated to in terms of the URL
  const location = useLocation();
  //In the below line the movie object that is being passed along with the URL in ListItem is 
  //retrived and used further to display the contents according to the movie
  const {movie} = location.state;
  const navigate = useNavigate();


    // Function to handle going back
  const handleGoBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="watch">
      {/* below link is used so that we can navigate to the home page as soon as we click the back button in the watch window */}
        <div className="back" onClick={handleGoBack}>
          <ArrowBackOutlined />
          Home
        </div>
      {/* The movie.video is used below to display the video contents which is the actual movie */}
      <video className="video" autoPlay controls src={movie.video} />
    </div>
  );
}
