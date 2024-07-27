import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Notifications from '@mui/icons-material/Notifications';
import Search from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  // this is a state variable created to determined if the page  is scrolled or not
  const [isScrolled,setIsScrolled]=useState(false);

  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); 

  window.onscroll = () => {
    // at initial position the pageYOffset value remains at 0 but as the page scrolls up it increases thus to set the isScrolled variable the pageYOffset is checked for its value.
    setIsScrolled(window.pageYOffset !== 0);
    // the below is a cleanup function to unmount resources when not in use it saves resources
    return ()=>{window.onscroll=null}
  };
  
  const handleSettingsClick = () => {
    navigate("/settingspage"); // Redirect to settings page
  };

  const handleAdminPanelClick = () => {
    window.location.href = "https://netflix-admin-eight.vercel.app"; // Redirect to admin panel
  };
  
  return (
    <div className={isScrolled?"navbar scrolled":"navbar"}>
      <div className="container">
        <div className="left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
            alt="" 
            />
            <Link to="/" className='link'>
            <span>Homepage</span>
            </Link>
            <Link to="/series" className='link'>
            <span className="navbarmainLinks">Series</span>
            </Link>
            <Link to="/movies" className='link'>
            <span className="navbarmainLinks">Movies</span>
            </Link>
            <Link to="/popular" className='link'>
            <span>New and Popular</span>
            </Link>
        </div>
        <div className="right">
            <Search className='icon'/>
            <span>KID</span>
            {/* below tag is of a icon used from materialUI */}
            <Notifications className='icon'/>
            <img
            src={user?.profilePic ||"https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
            alt="Profile"
          />
          <div className="profile">
            {/* below tag is of a icon used from materialUI */}
          <ArrowDropDown className='icon'/>
          <div className="options">
          <span onClick={handleSettingsClick}>Settings</span>
          {user?.isAdmin && (
                <span onClick={handleAdminPanelClick}>Admin Panel</span>
              )}
            <span onClick={() => dispatch(logout())}>Logout</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
