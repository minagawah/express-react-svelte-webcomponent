/* eslint no-undef: [1] */
/* eslint no-unused-vars: [1] */

/*
 * Notice the component is importing external CSS and HTML
 * and you can tell the component is expecting Webpack.
 *
 * Shadow DOM Styling
 * https://javascript.info/shadow-dom-style
 *
 * Don't Use Shadow DOM
 * https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/
 *
 * Adopted Style Sheets
 * https://dev.to/westbrook/why-would-anyone-use-constructible-stylesheets-anyways-19ng
 *
 * Alternative Styling Technique:
 * https://github.com/calebdwilliams/construct-style-sheets
 */

import styles from './style.css';
import template from './template.html';


class BurgerHeader extends HTMLElement {
  connectedCallback () {
    const text = String.raw`${template}`;
    const css = styles.toString();

    if (!text) throw new Error('No template');
    if (!css)  throw new Error('No styles');

    const el = document.createElement('template');
    el.innerHTML = `<style>${css}</style>${text}`;

    // Note: You could do this in "constructor" like the one in "cookiecontent" component does...
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(el.content.cloneNode(true));

    this.wrapper = root.querySelector('#wrapper');
    if (!this.wrapper) throw new Error('Can\'t find \'#wrapper\'');

    const btn = this.btn = root.querySelector('#toggle-button');
    const menu = root.querySelector('#menu-wrapper');

    if (btn && menu) {
      let visible = false;
      menu.classList.add('menu-wrapper-click-hide');

      btn.addEventListener('click', () => {
        menu.classList.remove(`menu-wrapper-click-${visible ? 'show' : 'hide'}`);
        menu.classList.add(`menu-wrapper-click-${visible ? 'hide' : 'show'}`);
        visible = !visible;
      });
    }
  }

  disconnectedCallback () {
    if (this.btn) {
      this.btn.removeEventListener('click');
    }
  }

  adoptedCallback () { }

  /**
   * @param {string} [name]
   * @param {any} [preVal]
   * @param {any} [val]
   */
  attributeChangedCallback () { }
}

customElements.define('burger-header', BurgerHeader);

export default BurgerHeader
