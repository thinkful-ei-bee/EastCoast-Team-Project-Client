import React,{Component} from 'react'
import './LandingPage.css'
import ParticleComponent from "../../Components/Particles/ParticleComponent";
import {Link} from 'react-router-dom'

export default class LandingPage extends Component{
  render(){
    return(
     
      <div className='LandingPageContent'>
         <div className='landing-hero'>
           <span id='landing-title'>Event date to build trust</span>
            <p className='landing-slogan'>Eventify her! and impress her. Rendezvous is the secret to a successful date
            </p>
          <div className='explore-rendezvous'>
        <Link 
          to='/register'
         > Sign up and try</Link>
        </div>
      </div>
     
     <div className='how-it-work'>
        HOW IT WORKS
      
         
      
       
  </div>                              
    <ParticleComponent />           
        </div>              
    )
  }
}

