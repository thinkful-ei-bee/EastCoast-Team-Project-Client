import React,{Component} from 'react'
import './LandingPage.css'
import ParticleComponent from "../../Components/Particles/ParticleComponent";
import {Link} from 'react-router-dom'

export default class LandingPage extends Component{
  render(){
    return(
     
      <div className='LandingPageContent'>
         <div className='landing-hero'>
           <span id='landing-title'>Eventify Your First Date</span>
            <p className='landing-slogan'>Rendezvous is the secret to a successful dating experience.
            </p>
          <div className='explore-rendezvous'>
        <Link 
          to='/signup'
         > Sign up and try</Link>
        </div>
      </div>
     
     <div className='how-it-work'>
          HOW IT WORKS        
  </div> 
        <div className="how-it-works-description">
          We cut out the awkwardness of finding mutual interests for first dates, second dates, or even third dates. See someone you like? Create an event you'd be interested in attending with them and once they accept, let the magic happen!
        </div>  
        <div className="demo">
          Try out a quick demo. Log in with the following credentials: <br></br>
          Username: demoMale1<br></br>
          Password: demoPass2019!
        </div>

    <ParticleComponent />           
        </div>              
    )
  }
}

