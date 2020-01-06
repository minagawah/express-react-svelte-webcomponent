/* eslint no-unused-vars: [0] */

import React, { Fragment, useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { css } from '@emotion/core';
// import tw from 'tailwind.macro';

import { useScreenSize } from '../contexts/';
import { NotFound, Header, Top, Toppings } from './';

/*
 * TODO:
 * While other components (such as in `Header.jsx`) work,
 * the following `tw` macro does not work...
 * <div css={css`${tw`p-4`}`}>
 */
export const App = () => {
  const { screenSize } = useScreenSize();

  const resize = useCallback(() => {
    console.log(`[React.App] ${screenSize.width}x${screenSize.height}`);
  }, [screenSize]);

  const [, debouncedResize] = useDebounce(
    resize,
    500,
    [screenSize]
  );

  useEffect(() => {
    debouncedResize();
  }, [debouncedResize]);

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
