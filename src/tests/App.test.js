import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/Login';

describe('Login Component', () => {
 it('renders a email input', () => {
   expect(shallow(<Login />).find('#email').length).toEqual(1)
  })
 it('renders a password input', () => {
   expect(shallow(<Login />).find('#password').length).toEqual(1)
  })
})

describe('Email input', () => {
  it('should respond to change event and change the state of the Login Component', () => {
   const wrapper = mount(<Login />);
   let input = wrapper.find('#email');
   input.simulate('change', { target: { value: ""} });
   expect(input.props('value').value).toEqual("");
  })
 })

 describe('Password input', () => {
  it('should respond to change event and change the state of the Login Component', () => {
    const wrapper = mount(<Login />);
    let input = wrapper.find('#password');
    input.simulate('change', { target: { value: ""} });
    expect(input.props('value').value).toEqual("");

  });
 })
describe('Form Submit', () => {
 it('should check click is working', () => {
  const wrapper = shallow(<Login />);
  const fn = jest.fn();
  wrapper.instance().onObjSubmit = fn;
  wrapper.update();
  wrapper.find('form').simulate('submit',{ preventDefault: fn });
  expect(fn).toBeCalled();
});
})
