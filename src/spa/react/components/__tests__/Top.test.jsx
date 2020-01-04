import React from 'react';
import { shallow } from 'enzyme';
import { Top } from '../';

beforeEach(() => {
});

afterEach(() => {
});

it('renders without crashing', () => {
  const wrapper = shallow(<Top />);
  expect(wrapper).toMatchSnapshot();
});
