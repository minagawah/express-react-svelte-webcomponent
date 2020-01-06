import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const NavLink = styled(Link)`
  display: block;
  color: #de0000;
  &:hover {
    color: #ff8080;
  }
  margin-bottom: 0.3em;
`;

export const Top = () => {
  return (
    <Fragment>
      <h1>Pizza</h1>
      <NavLink to="/toppings">Toppings</NavLink>
      <NavLink to="/cloud">Cloud</NavLink>
    </Fragment>
  );
};
