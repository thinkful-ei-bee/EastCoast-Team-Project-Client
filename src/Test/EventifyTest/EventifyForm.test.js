import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EventifyForm from '../../Routes/EventifyRoute/EventifyForm'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const location = {
      state : { baseId : 1 }
      }
      
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><EventifyForm location={location} /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})