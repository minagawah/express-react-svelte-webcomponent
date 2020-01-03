/* eslint no-unused-vars: [1] */

import { prop } from 'ramda';

import './styles.css';

(async () => {
  const animeES = await import('animejs/lib/anime.es.js');
  const anime = prop('default')(animeES);

  anime({
    targets: '.square',
    keyframes: [
      { translateX: 190 },
      { translateX: 0 },
    ],
    loop: true,
    duration: 1500,
    easing: 'easeInOutSine',
  });
})();

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
