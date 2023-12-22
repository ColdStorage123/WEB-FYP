import React, { useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsXSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AcceptedCSR1 from '../OrderPlacementHome1';

function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <Link to='/orderplacement' className='link-style'>
            <div className='card-inner'>
              <h3>Order Now</h3>
              <BsFillArchiveFill className='card_icon' />
            </div>
          </Link>
        </div>
        <div className='card'>
          <Link to='/farmeracceptedorders' className='link-style'>
            <div className='card-inner'>
              <h3>Track Your Orders</h3>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
          </Link>
        </div>
        <div className='card'>
          <Link to='/farmerorders' className='link-style'>
            <div className='card-inner'>
              <h3>View History</h3>
              <BsPeopleFill className='card_icon' />
            </div>
          </Link>
        </div>
        <div className='card'>
          {/* Replace BsFillBellFill with the desired icon for order cancellation */}
          <Link to='/farmerOrderCancel' className='link-style'>
            <div className='card-inner'>
              <h3>Order Cancellation</h3>
              <BsXSquareFill className='card_icon' />
            </div>
          </Link>
        </div>
      </div>
      <div className='order-preview'>
        <h2>Recent Orders</h2>
        <AcceptedCSR1 limit={4} />
        <Link to='/orderplacement' className='link-style'>
          View All Storages
        </Link>
      </div>
    </main>
  );
}

export default Home;
