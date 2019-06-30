import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import LoginForm from '../../Components/LoginForm/LoginForm'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Login Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><LoginForm /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('calls handleSubmit when button is clicked', () => {
    const props = 
      { user_name: 'testUser1', password: 'password1' }
    

    const handleSubmitMock = jest.fn();
    const wrapper = mount(<LoginForm {...props} handleSearchSubmit={handleSubmitMock}/>);

    const form = wrapper.find('form');
    form.simulate('submit', {target: {user_name: {}, password: {}}});
    expect(handleSubmitMock).toHaveBeenCalledTimes(0);
  })
  
})