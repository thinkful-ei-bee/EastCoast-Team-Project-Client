import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><RegistrationForm /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
})