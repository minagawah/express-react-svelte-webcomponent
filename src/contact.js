/* eslint no-unused-vars: [1] */

import './styles.css';

import moment from 'moment';

const el = document.querySelector('#datetime');

if (el) {
  setInterval(() => {
    el.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
  }, 1000);
}

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
