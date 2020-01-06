import React from 'react';

/*
 * export type ContextProvidersContextsType = any[];
 *  (contexts: ContextProvidersContextsType, component: any) => {
 */

export const composeContextProviders = (contexts, component) => {
  return contexts.reduce((acc, [Provider, value]) => {
    return (
      <Provider value={value}>{acc}</Provider>
    );
  }, component);
}
