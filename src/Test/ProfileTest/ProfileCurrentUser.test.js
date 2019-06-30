import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ProfileCurrentUser from '../../Routes/ProfileRoute/ProfileCurrentUser'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  it('renders without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ProfileCurrentUser /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})