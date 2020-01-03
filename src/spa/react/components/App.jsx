/* eslint no-unused-vars: [0] */

import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { css } from '@emotion/core';
// import tw from 'tailwind.macro';

import { NotFound, Header, Top, Toppings } from './';

/*
 * TODO:
 * While other components (such as in `Header.jsx`) work,
 * the following `tw` macro does not work...
 * <div css={css`${tw`p-4`}`}>
 */
export const App = () => {
  return (
    <Fragment>
      <Header />
      <div css={css`padding: 1em;`}>
        <Switch>
          <Route exact path="/" component={Top} />
          <Route path="/top" component={Top} />
          <Route path="/toppings" component={Toppings} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Fragment>
  );
};
