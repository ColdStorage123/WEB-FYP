import React, { useEffect } from 'react';
import 
{ BsFillArchiveFill,  BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom';
 import OrderComponent from '../OrderComponent';

function Home() {
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login'
        }
      }, []);
    

   
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards' style={{ justifyContent: 'center' }}>
            <div className='card'>
                 <Link to ='/accepted' className='link-style'>
                <div className='card-inner'>
                   
                    <h3>Accepted Orders</h3>
                    <BsFillArchiveFill className='card_icon'/>  
                </div>
                </Link>
                
            </div>
            <div className='card' >
            <Link to ='/rejected' className='link-style'>  
                <div className='card-inner'>
                    <h3>Rejected Orders</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
            <div className='card'>
            <Link to ='/viewreviewss' className='link-style'>  
                <div className='card-inner'>
                    <h3>View Customer Reviews</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                </Link>
                
            </div> 
            <div className='card'>
            <Link to ='/cancelledordersmanager' className='link-style'>  
                <div className='card-inner'>
                    <h3>Cancelled Orders</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
        </div>
        <div className='order-preview'>
        <h2>Recent Orders</h2>
        <OrderComponent limit={4} />
        <Link to='/ord' className='link-style'>
          View All Orders
        </Link>
      </div>

        

       
    </main>
  )
}

export default Home
