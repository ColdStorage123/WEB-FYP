import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom'

function Home() {

   
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                 <Link to ='/' className='link-style'>
                <div className='card-inner'>
                   
                    <h3>Total Orders</h3>
                    <BsFillArchiveFill className='card_icon'/>  
                </div>
                </Link>
                
            </div>
            <div className='card' >
            <Link to ='/' className='link-style'>  
                <div className='card-inner'>
                    <h3>New Orders</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
            <div className='card'>
            <Link to ='/' className='link-style'>  
                <div className='card-inner'>
                    <h3>View Customer Reviews</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
            <div className='card'>
            <Link to ='/pending-storage-request' className='link-style'>  
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                </Link>
                
            </div>
        </div>

        

       
    </main>
  )
}

export default Home
