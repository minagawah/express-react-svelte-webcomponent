/* eslint no-undef: [1] */
/* eslint no-unused-vars: [1] */

import { cookieFactory } from '../../lib/cookies';
import styles from './style.css';
import template from './template.html';

const COOKIE_EXPIRE_CONSENT = 1000 * 60 * 60 * 24 * 365;
const COOKIE_NAME = 'cookieconsent';
const DEFAULT_MODAL_DELAY = 1000;

class CookieConsent extends HTMLElement {
  constructor () {
    super();

    const text = String.raw`${template}`;
    const css = styles.toString();
    
    if (!text) throw new Error('No template');
    if (!css)  throw new Error('No styles');

    const el = document.createElement('template');
    el.innerHTML = `<style>${css}</style>${text}`;

    this.attachShadow({ mode: 'open' })
      .appendChild(el.content.cloneNode(true));

    this.cookie = cookieFactory(); // Create a manager.
  }

  connectedCallback () {
    console.log('[CookieConsent] ++++ connectedCallback()');

    if (!this.shadowRoot) throw new Error('No "shadowRoot"');
    if (!this.cookie) throw new Error('Failed to create a cookie manager');

    this.wrapper = this.shadowRoot.querySelector('#wrapper');
    if (!this.wrapper) throw new Error('Can\'t find \'#wrapper\'');

    // Read a cookie named "cookieconsent".
    const cookieStatus = this.getCookie();
    this.hideModal(); // Hide the modal for default.

    const delay = this.getAttribute('delay') || DEFAULT_MODAL_DELAY;
    console.log(`[CookieConsent] delay: ${delay}`);

    let ready = false;
    if (!cookieStatus) { // Show the modal if the user has chosen neither.
      setTimeout(() => {
        this.showModal();
        ready = true; // User may click on buttons when ready.
        console.log('[CookieConsent] ready');
      }, delay);
    }

    const btnAccept = this.btnAccept = this.shadowRoot.querySelector('#btn-accept');

    if (btnAccept) {
      btnAccept.addEventListener('click', () => {
        if (!ready) return;
        this.setCookie('accept');
        this.hideModal();
      });
    }
  }

  disconnectedCallback () {
    if (this.btnAccept) {
      this.btnAccept.removeEventListener('click');
    }
  }

  adoptedCallback () { }

  /**
   * @param {string} [name]
   * @param {any} [preVal]
   * @param {any} [val]
   */
  attributeChangedCallback () { }

  showModal () {
    this.wrapper.classList.remove('show');
    this.wrapper.classList.remove('hide');
    this.wrapper.classList.add('show');
  }

  hideModal () {
    this.wrapper.classList.remove('show');
    this.wrapper.classList.remove('hide');
    this.wrapper.classList.add('hide');
  }

  removeCookie () {
    this.cookie.remove(COOKIE_NAME);
  }

  getCookie () {
    return this.cookie.read(COOKIE_NAME);
  }

  setCookie (locale = '') {
    return this.cookie.create(
      COOKIE_NAME,
      locale,
      COOKIE_EXPIRE_CONSENT
    );
  }
}

customElements.define('cookie-consent', CookieConsent);

export default CookieConsent
