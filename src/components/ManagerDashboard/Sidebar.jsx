import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,  faUser, faSignOutAlt, faSnowflake } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const [ setFullName] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('userData');
    
        if (userData) {
          try {
            const user = JSON.parse(userData);
            if (user && user.fullName) {
              setFullName(user.fullName);
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
        return () => {
         
          sessionStorage.removeItem('userData');
      };
      }, []); 
      const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        window.location.href = '/login'; 
      }; 
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <Link to="/managerhome">
            <img src="ourlogo.png" alt="Our Logo" style={{ width: '50%' }} />
          </Link>
        </div>
        <span onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faHome} /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} /> Update Profile
          </Link>
        </li>
        <li className='sidebar-list-item'>
      
          <Link to="/storage">
            <FontAwesomeIcon icon={faSnowflake} /> Register Cold Storage 
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/login" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar;
