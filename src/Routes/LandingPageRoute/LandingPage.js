import React,{Component} from 'react'
import './LandingPage.css'
import ParticleComponent from "../../Components/Particles/ParticleComponent";
import {Link} from 'react-router-dom'

export default class LandingPage extends Component{
  render(){
    return(
     
      <div className='LandingPageContent'>
         <div className='landing-hero'>
           <span id='landing-title'>Eventify a date and build trust amongst each other.</span>
            <p className='landing-slogan'>Rendezvous is the secret to a successful dating experience.
            </p>
          <div className='explore-rendezvous'>
        <Link 
          to='/signup'
         > Sign up and try</Link>
        </div>
      </div>
     
     <div className='how-it-work'>
        {/* HOW IT WORKS */}
        <p>Here in Rendezvous, we cut out the awkwardness of finding mutual interests for first dates, second dates, or even third dates. See someone you like? Awesome! Create an event you'd be interested in attending with them and once they accept, let the magic happen!</p> 
        <p>Join us and don't be another failed dating app statistic.</p>         
  </div>                              
    <ParticleComponent />           
        </div>              
    )
  }
}

