/* eslint no-undef: [0] */

/*
 * Ignoring `no-undef` above for the following ESLint warning:
 * ====================================================
 * warning  'Reflect' is not defined  no-undef
 * ====================================================
 *
 * Notice the component is importing external CSS and HTML
 * and you can tell the component is expecting Webpack.
 */

import './style.css';
import template from './template.html';

/**
 * @constructor
 */
function MessageBox () {
  const upgrade = (typeof Reflect === 'object')
    ? function () {
      return Reflect.construct(
        HTMLElement,
        arguments,
        this.constructor
      );
    }
    : function () {
      return HTMLElement.apply(this, arguments) || this;
    };

  const self = upgrade.apply(this, arguments);

  self.wrapper = null;
  self.styles = '';
  self.message = '';

  return self;
}

function connectedCallback () {
  const el = document.createElement('template');
  const text = String.raw`${template}`;

  if (!text) {
    throw new Error('No template');
  }
  el.innerHTML = text;

  const root = this.attachShadow({ mode: 'open' });
  root.appendChild(el.content.cloneNode(true));

  this.wrapper = root.querySelector('#wrapper');
  this.padding = this.getAttribute('padding');
  this.bgcolor = this.getAttribute('bgcolor');
  this.message = this.getAttribute('message');

  this.setPadding();
  this.setBackgroundColor();
  this.setMessage();
}

function disconnectedCallback () {}

function adoptedCallback () {}

function attributeChangedCallback (name, prevVal, val) {
  if (name === 'padding') {
    this.padding = val;
    this.setPadding();
  }
  if (name === 'bgcolor') {
    this.bgcolor = val;
    this.setBackgroundColor();
  }
  if (name === 'message') {
    this.message = val;
    this.setMessage();
  }
}

function setPadding () {
  if (this.wrapper && (this.padding || this.padding === 0)) {
    this.wrapper.style.padding = `${this.padding}px`;
  }
}

function setBackgroundColor () {
  if (this.wrapper && this.bgcolor) {
    this.wrapper.style.backgroundColor = this.bgcolor;
  }
}

function setMessage () {
  if (this.wrapper && this.message) {
    this.wrapper.innerHTML = this.message;
  }
}

MessageBox.prototype = Object.create(HTMLElement.prototype);
MessageBox.prototype.constructor = MessageBox;

Object.setPrototypeOf(MessageBox, HTMLElement);
Object.defineProperties(MessageBox, {
  observedAttributes: {
    get: () => {
      return ['padding', 'bgcolor', 'message'];
    },
  },
});

MessageBox.prototype.connectedCallback = connectedCallback;
MessageBox.prototype.disconnectedCallback = disconnectedCallback;
MessageBox.prototype.adoptedCallback = adoptedCallback;
MessageBox.prototype.attributeChangedCallback = attributeChangedCallback;
MessageBox.prototype.setPadding = setPadding;
MessageBox.prototype.setBackgroundColor = setBackgroundColor;
MessageBox.prototype.setMessage = setMessage;

customElements.define('message-box', MessageBox);

export default MessageBox
