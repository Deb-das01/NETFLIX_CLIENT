import React, { useContext, useState } from 'react';
import './settingspage.scss';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [editMode, setEditMode] = useState({ username: false, email: false, password: false }); // Added 'password' to editMode state
  const [formData, setFormData] = useState({ username: user.username, email: user.email, password: '' }); // Initialize password field

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      dispatch(logout());
      navigate('/login');
    }, 3000); // 3 seconds animation time
  };

  const handleEditClick = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async (field) => {
    try {
      const response = await axios.put(
        `/users/${user._id}`,
        { [field]: formData[field] },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data;
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
        setEditMode({ ...editMode, [field]: false });
        setFormData({ ...formData, [field]: updatedUser[field] });
      } else {
        console.error('Failed to update user data');
        // Optionally, handle error state or show error message to user
      }
    } catch (error) {
      console.error('Failed to update user data', error);
      // Optionally, handle error state or show error message to user
    }
  };

  return (
    <div className={`settings-page ${isLoggingOut ? 'logging-out' : ''}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        className="netflix-logo"
      />
      <div className="settings-container">
        {isLoggingOut ? (
          <div className="logout-animation">
            <p>Logging out...</p>
          </div>
        ) : (
          <>
            <h1>User Settings</h1>
            <div className="user-data">
              <div className="user-data-item">
                <span className="user-data-label">Username: </span>
                {editMode.username ? (
                  <>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <button className="save-button" onClick={() => handleSaveClick('username')}>Save</button>
                  </>
                ) : (
                  <>
                    <span className="user-data-value">{formData.username}</span>
                    <button className="edit-button" onClick={() => handleEditClick('username')}>Edit</button>
                  </>
                )}
              </div>
              <div className="user-data-item">
                <span className="user-data-label">Email: </span>
                {editMode.email ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <button className="save-button" onClick={() => handleSaveClick('email')}>Save</button>
                  </>
                ) : (
                  <>
                    <span className="user-data-value">{formData.email}</span>
                    <button className="edit-button" onClick={() => handleEditClick('email')}>Edit</button>
                  </>
                )}
              </div>
              <div className="user-data-item">
                <span className="user-data-label">Password: </span>
                {editMode.password ? (
                  <>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button className="save-button" onClick={() => handleSaveClick('password')}>Save</button>
                  </>
                ) : (
                  <>
                    <span className="user-data-value">********</span> {/* Display masked password */}
                    <button className="edit-button" onClick={() => handleEditClick('password')}>Change Password</button>
                  </>
                )}
              </div>
            </div>
            <div className="logout-bar" onClick={handleLogout}>
              <span>Logout</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Setting;
