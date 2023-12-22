import { useState } from 'react'
import './Dash.css'
import Header from './ManagerHeader'
import Sidebar from './ManagerSidebar'
import Home from './ManagerHomeDash'

function ManagerDash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default ManagerDash; 


