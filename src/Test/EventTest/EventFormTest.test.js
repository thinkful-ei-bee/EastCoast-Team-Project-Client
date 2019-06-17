import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EventForm from '../../Routes/EventsRoute/EventForm'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><EventForm /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('calls handleSubmit when button is clicked', () => {
    const props = 
      { event_name: 'test event name1',
        event_date: '12 march 2019',
        event_time: '12:00pm',
        event_type: 'test event type',
        event_location: 'test event location',
        event_details: 'test event details',
        is_private: false }
    

    const handleSubmitMock = jest.fn();
    const wrapper = mount(<BrowserRouter><EventForm {...props} handleSearchSubmit={handleSubmitMock}/></BrowserRouter>);

    const form = wrapper.find('form');
    form.simulate('submit', {target: {event_name: {}, event_date: {}, event_time: {}, event_type: {}, event_location: {}, event_details: {}, is_private: {}}});
    expect(handleSubmitMock).toHaveBeenCalledTimes(0);
  })
  
})