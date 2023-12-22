import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom';
import PendingCSR from '../PendingCSR1';

function Home() {
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                 <Link to ='/acceptedstoragesadmin' className='link-style'>
                <div className='card-inner'>
                   
                    <h3>Registered Storages</h3>
                    <BsFillArchiveFill className='card_icon'/>  
                </div>
                </Link>
                
            </div>
            <div className='card' >
            <Link to ='/rejectedstoragesadmin' className='link-style'>  
                <div className='card-inner'>
                    <h3>Rejected Storages</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
            <div className='card'>
            <Link to ='/pending-storage-request' className='link-style'>  
                <div className='card-inner'>
                    <h3>Pending Storages</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
           {/*  <div className='card' >
            <Link to ='/cancelstorage' className='link-style'>  
                <div className='card-inner'>
                    <h3>Cancel Storage Registration</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                </Link>
                
            </div> */}
        
        </div>

        <div className='order-preview'>
       
        <PendingCSR limit={4} />
        <Link to='/pending-storage-request' className='link-style'>
          View All Requests
        </Link>
      </div>
      
    </main>
  )
}

export default Home
