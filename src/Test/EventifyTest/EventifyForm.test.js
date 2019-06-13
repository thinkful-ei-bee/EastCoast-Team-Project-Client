import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EventifyForm from '../../Routes/EventifyRoute/EventifyForm'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe.skip('Registration Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><EventifyForm /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})