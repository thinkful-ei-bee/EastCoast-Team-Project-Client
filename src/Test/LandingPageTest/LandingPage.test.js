import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../../Routes/LandingPageRoute/LandingPage'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><LandingPage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})