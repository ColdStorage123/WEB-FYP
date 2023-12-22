import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill, BsFillArchiveFill,  BsMenuButtonWideFill} from 'react-icons/bs';

import { FaUser } from 'react-icons/fa'; 


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            
          
            <div className='sidebar-brand'>
            <Link to="/dashboard">    
    <img src="ourlogo.png" alt="Our Logo" style={{  width: '50%' }} />
    </Link>
</div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

       
        
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/dashboard"> 
            <BsGrid1X2Fill className='icon'/> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/orders"> 
            <BsFillArchiveFill className='icon'/> Orders
          </Link>
        </li>
        <li className='sidebar-list-item'>
                    <Link to="/update-profile"> 
                        <FaUser className='icon'/> Update Profile
                    </Link>
                </li>
            
               
        <li className='sidebar-list-item'>
          <Link to="/ohistory">
            <BsMenuButtonWideFill className='icon'/> Order History
          </Link>
        </li>
        </ul>
    </aside>
  )
}

export default Sidebar;