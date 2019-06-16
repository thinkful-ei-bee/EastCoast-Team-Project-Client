import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Footer extends React.Component{
  render(){
    return(
      <div className='footer'>
      <span id='author'>Created by EastCoast Team</span>
      <div className='social_icon_container'>
      <a href='https://github.com/thinkful-ei-bee/EastCoast-Team-Project-Client'>               
         <FontAwesomeIcon className='social_icon' icon={['fab', 'github']} />       
       </a>
       </div>
        {/* <div className='social_icon_group'>

       <a href='https://github.com/JizongL'>               
         <FontAwesomeIcon className='social_icon' icon={['fab', 'github']} />       
       </a>
       
       <a href='https://www.linkedin.com/in/d-liang/'>
        <FontAwesomeIcon className='social_icon' icon={['fab', 'linkedin']} />
        </a>
        <a href='https://medium.com/@jizongliang'>
        <FontAwesomeIcon className='social_icon' icon={['fab', 'medium']} />
        </a>
        <a href='https://twitter.com/TmmGeek'>
        <FontAwesomeIcon className='social_icon' icon={['fab', 'twitter']} />
        </a>
        </div> */}
        
        <p className="copyright-text">Copyright &copy; 2019 All Rights Reserved
          
            </p>
      </div>

      
    )
  }
}