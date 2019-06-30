import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import NotificationRoute from '../../Routes/Notifications/NotificationRoute'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const match = {
      params : { baseId : 1 }
      }

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NotificationRoute /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})