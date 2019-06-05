import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'

export default function Nav () {
  return(
    <div className="nav">
      <nav>
        Navigation

        <Link to='/dashboard'>Dashboard</Link>     
        <Link to='/profile'>Profile</Link> 
        <button type='button'>Logout</button>  
      </nav>
    </div>
  )
}

