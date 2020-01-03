import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../';

beforeEach(() => {
});

afterEach(() => {
});

it('renders without crashing', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
});
