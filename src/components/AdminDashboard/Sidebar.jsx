import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboard, faUser, faSignOutAlt, faSnowflake } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const [fullName, setFullName] = useState('');

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
          <Link to="/dashboard">
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
          <Link to="/admin" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout 
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar;
