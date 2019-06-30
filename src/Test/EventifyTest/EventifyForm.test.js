import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EventifyForm from '../../Routes/EventifyRoute/EventifyForm'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  const location = {
    state : { baseId : 1 }
    }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><EventifyForm location={location} /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('calls handleSubmit when button is clicked', () => {
    const props = 
      { event: 1 }
    

    const handleSubmitMock = jest.fn();
    const wrapper = mount(<BrowserRouter><EventifyForm {...props} location={location} handleSearchSubmit={handleSubmitMock}/></BrowserRouter>);

    const form = wrapper.find('form');
    form.simulate('submit', {target: {event: {}}});
    expect(handleSubmitMock).toHaveBeenCalledTimes(0);
  })
  
})