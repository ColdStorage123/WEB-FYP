
import React, { useEffect, useState } from 'react';
import 
 { BsJustify}
 from 'react-icons/bs';
 

function Header({OpenSidebar}) {
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
    /*   const handleLogout = () => {
        localStorage.removeItem('userData');
        window.location.href = '/login'; // Redirect the user to the login page
      }; */
  return (
    <header className='header' style={{ fontSize: "50px", justifyContent: "center"}}>
        <div className='menu-icon'>
            <BsJustify  onClick={OpenSidebar}/>
        </div>
       
        <div style={{ fontSize: "50px", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
  <p style={{ fontSize: "50px", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><b>Hi, Welcome Back {fullName}!!</b></p>
</div>

        <div >
            
        </div>
    </header>
  )
}

export default Header