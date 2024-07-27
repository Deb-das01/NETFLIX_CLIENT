import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Watch from "./pages/watch/Watch";
import Setting from "./pages/settingspage/settingspage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import { useContext } from "react";
import Popularmovie from "./pages/popularmovie/PopularMovie";


const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        {/* below it checks weather the user is logged in or not if logged in then it
        can access the desired page otherwise the page would redirect the user either to
        loginpage or the register page and if logged in it would direct to home page */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register/> : <Navigate to="/" />} />

        {/* the below section is written so that I can access the logout button from any of my pages */}
        <Route path="/movies" element={!user ? <Register/> : <Home type="movie" />} />
        <Route path="/series" element={!user ? <Register/> : <Home type="series"/>} />
        <Route path="/popular" element={!user ? <Register/> : <Popularmovie/>} />
        {/* up to this is for the working of the logout button*/}


        {/* below condition checks that the below mentioned pages are only accessible if 
        the user is logged in otherwise they are not accessible */}
        {user&&(
        <>
        <Route path="/movies" element={<Home type="movie" />} />
        <Route path="/series" element={<Home type="series"  />} />
        <Route path="/popular" element={<Popularmovie/>} />
        <Route path="/watch" element={<Watch/>} />
        <Route path="/settingspage" element={<Setting/>} />
        </>
        )
        }
      </Routes>
    </Router>
  );
};

export default App;
