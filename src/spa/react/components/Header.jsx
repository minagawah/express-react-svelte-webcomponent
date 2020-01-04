import React from 'react';
import { Link } from 'react-router-dom';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import PropTypes from 'prop-types';

import logo from '../../../images/lang-logo.png';

const linkMarginLeft = css`margin-left: 0.8em;`;

const linkStyle = `
  color: #ffffff;
  &:hover {
    color: #ffdede;
  }
`;

const NormalLink = ({ to, children }) => (<a href={to} css={css`${linkStyle}`}>{children}</a>);
const NavLink = styled(Link)`${linkStyle}`;

NormalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Header = () => {
  return (
    <header css={css`
background-color: #e53e3e;
${tw`flex flex-row flex-no-wrap justify-start content-center items-center`}
    `}>
      <img css={css`
animation: ${spin} infinite 20s linear;
width: 65px;
height: 65px;
pointer-events: none;
        `} src={logo} alt="logo" />
      <div css={css`width: calc(100vw - 65px);`}>
        <NormalLink to="../">Top</NormalLink>
        <NavLink to="/top" css={linkMarginLeft}>Pizza</NavLink>
        <NavLink to="/toppings" css={linkMarginLeft}>Toppings</NavLink>
      </div>
    </header>
  );
}
