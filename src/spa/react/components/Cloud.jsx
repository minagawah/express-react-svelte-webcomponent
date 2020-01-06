/*
 * Demonstrating the use of "scrollmonitor-react".
 * <svg ref={this.svgRef}> is a cloud shaped SVG image.
 * As a user scrolls the browser, watchers provided to
 * Content1, Content2, and Content3 would detect
 * whether the user has enter each region. When it
 * enters the region, animate the cloud accordingly.
 */

import React, { Fragment, Component } from 'react';
import anime from 'animejs/lib/anime.min.js';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';
import { Watch } from 'scrollmonitor-react';

import { cloud } from '../cloud';

const extractPos = (id = '') => Number(id.replace('content', '')) - 1;

// A shared wrapper component for Content1, Content2, and Content3.
const ContentWrapper = ({ id, children }) => {
  // const { enterViewport = false, exitViewport = false } = props || {};
  return (
    <div id={id} css={css`
position: relative;
width: 100%;
height: 600px;
pointer-events: none;
border: 1px solid #eaeaea;
${tw`flex flex-col flex-no-wrap justify-center items-center`}
    `}>
      {children}
    </div>
  );
};

const sharedCSS = 'position:relative;font-size:3em;';

/*
 * Content1, Content2, and Content3 will later receive "stateChange" prop
 * to which "receiveStateChange()" is be bound.
 * "scrollmonitor-react" provides them the watchers.
 */
const [Content1, Content2, Content3] =
  [[1, '#ff7871'], [2, '#ff87c9'], [3, '#c9a6ff']].reduce((acc, attr) => {
    // "Watcher" is a special context provider of "scrollmonitor-react".
    return acc.concat(Watch(() => (
      <ContentWrapper id={`content${attr[0]}`}>
        <div css={css`${sharedCSS}color:${attr[1]};`}>
          Content {attr[0]}
        </div>
      </ContentWrapper>
    )));
  }, []);

export class Cloud extends Component {
  constructor(props) {
    super(props);
    this.step = 0;
    this.svgRef = React.createRef();
    this.shapeRef = React.createRef();
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const attr = cloud[0];
    const svg = this.svgRef.current;
    anime.remove(svg);
    anime({
      targets: svg,
      duration: 1,
      easing: 'linear',
      scaleX: attr.scaleX,
      scaleY: attr.scaleY,
      translateX: `${attr.tx}px`,
      translateY: `${attr.ty}px`,
      rotate: `${attr.rotate}deg`,
    });
    this.initLoop();
  }

  initLoop(pos = 0) {
    const attr = cloud[pos];
    const shape = this.shapeRef.current;

    anime.remove(shape);
    anime({
      targets: shape,
      easing: 'linear',
      d: [
        { value: attr.pathAlt, duration: 3500 },
        { value: attr.path, duration: 3500 }
      ],
      loop: true,
      fill: {
        value: attr.fill.color,
        duration: attr.fill.duration,
        easing: attr.fill.easing,
      },
      direction: 'alternate'
    });
  }

  /*
   * For Content1, Content2, and Content3
   * will each be assigned with a prop "stateChange".
   * This is a method bound to "stateChange".
   * Since each is wrapped with "Watch" context provider,
   * we receive "watcher" prop.
   */
  receiveStateChange(watcher = {}) {
    const {
      watchItem = {},
      isInViewport = false,
      isAboveViewport = false,
      isBelowViewport = false,
    } = watcher;

    const { id = '' } = watchItem;

    const pos = extractPos(id);
    const enterViewport = isInViewport && isBelowViewport;
    const exitViewport = isInViewport && isAboveViewport;

    const shape = this.shapeRef.current;
    const svg = this.svgRef.current;

    // Behaviors for "enterViewport".
    if (enterViewport) {
      this.step = pos;
      const attr = cloud[pos];

      anime.remove(shape);
      anime({
        targets: shape,
        duration: attr.animation.path.duration,
        easing: attr.animation.path.easing,
        elasticity: attr.animation.path.elasticity || 0,
        d: attr.path,
        fill: {
          value: attr.fill.color,
          duration: attr.fill.duration,
          easing: attr.fill.easing,
        },
        complete: () => {
          this.initLoop(pos);
        },
      });
      
      anime.remove(svg);
      anime({
        targets: svg,
        duration: attr.animation.svg.duration,
        easing: attr.animation.svg.easing,
        elasticity: attr.animation.svg.elasticity || 0,
        scaleX: attr.scaleX,
        scaleY: attr.scaleY,
        translateX: `${attr.tx}px`,
        translateY: `${attr.ty}px`,
        rotate: `${attr.rotate}deg`,
      });
    }
    // END OF: enterViewport

    // Behaviors for "exitViewport".
    if (exitViewport) {
      const index = pos + 1;

      if (index !== this.step) {
        this.step = index;
        const attr = cloud[index];

        anime.remove(shape);
        anime({
          targets: shape,
          duration: attr.animation.path.duration,
          easing: attr.animation.path.easing,
          elasticity: attr.animation.path.elasticity || 0,
          d: attr.path,
          fill: {
            value: attr.fill.color,
            duration: attr.fill.duration,
            easing: attr.fill.easing,
          },
          complete: () => {
            this.initLoop(index);
          }
        });

        anime.remove(svg);
        anime({
          targets: svg,
          duration: attr.animation.svg.duration,
          easing: attr.animation.svg.easing,
          elasticity: attr.animation.svg.elasticity || 0,
          scaleX: attr.scaleX,
          scaleY: attr.scaleY,
          translateX: `${attr.tx}px`,
          translateY: `${attr.ty}px`,
          rotate: `${attr.rotate}deg`,
        });
      }
    }
    // END OF: exitViewport
  }

  render() {
    return (
      <Fragment>
        <h1>Cloud</h1>
        <div css={css`
position: fixed;
top: 0;
left: 100px;
bottom: 0;
width: 100%;
overflow: hidden;
pointer-events: none;
${tw`flex flex-row flex-no-wrap justify-center items-center`}
    `}>
          <svg ref={this.svgRef} css={css`
position: relative;
height: 100%;
fill: var(--background-color-2);
flex: none;
opacity: 0.45;
          `} width="700" height="385" viewBox="0 0 1400 770">
            <path ref={this.shapeRef} d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z"/>
          </svg>
        </div>
        <Content1 stateChange={this.receiveStateChange.bind(this)} />
        <Content2 stateChange={this.receiveStateChange.bind(this)} />
        <Content3 stateChange={this.receiveStateChange.bind(this)} />
      </Fragment>
    );
  }
}
