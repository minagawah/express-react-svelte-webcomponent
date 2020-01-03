import React, { Fragment } from 'react';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';

const list = [
  { id: 'mushroom', name: 'Mushroom', count: 54 },
  { id: 'pepperoni', name: 'Pepperoni', count: 1 },
  { id: 'pineapple', name: 'Pineapple', count: 0 },
];

export const Toppings = () => {
  return (
    <Fragment>
      <h1>Pizza - Toppings</h1>
      <div>
        {list.map((o) => {
          return (
            <div key={o.id} css={css`${tw`flex flex-row`}`}>
              <div css={css`padding: 0.2em; color: #a2a2a2;`}>{o.name}</div>
              <div css={css`padding: 0.2em;`}>{o.count}</div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
