import React, {useEffect,useState} from 'react';
import MNav from './MNav';
import MDash from './MDash'
import Footer from './Footer';



const MHome = () => {
    const [fullName, setfullName] = useState('');

  const [email, setEmail] = useState('');
    useEffect(() => {
        
        let user = localStorage.userData;
        user = JSON.parse(user)

        console.log(user);
        if (user) {
          const userName = user.fullName;
          setfullName(userName);
          setEmail(user.email);
        } 
      }, []);
  return (
    <div>
    <p>{email}</p> 
      <MNav />
      <MDash />
      <Footer />

      
    </div>
  );
};

export default MHome;
