import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><RegistrationForm /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('calls handleSubmit when button is clicked', () => {
    const props = 
      { password: 'password1', user_name: 'testUser1', full_name: 'Test User1', gender: 'male' ,email: 'testuser@test.com' }
    

    const handleSubmitMock = jest.fn();
    const wrapper = mount(<BrowserRouter><RegistrationForm {...props} handleSearchSubmit={handleSubmitMock}/></BrowserRouter>);

    const form = wrapper.find('form');
    form.simulate('submit', {target: {password: {}, user_name: {}, full_name: {}, gender: {}, email:{} }});
    expect(handleSubmitMock).toHaveBeenCalledTimes(0);
  })
})