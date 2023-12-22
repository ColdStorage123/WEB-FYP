import React, {useEffect,useState} from 'react';
import FNav from './FNav';
import FDash from './FDash'
import Footer from './Footer';
import AcceptedCSR1 from './OrderPlacementHome';



const FHome = () => {
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
      <FNav />
      <FDash />
      <AcceptedCSR1 />
      <Footer />

    </div>
  );
};

export default FHome;
