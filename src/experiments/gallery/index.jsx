/**
 * IMPORTANT: This is not in use.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const Gallery = () => {
  return (
    <div>Gallery</div>
  );
};

export const GalleryRenderer = (req, res) => {
  const app = ReactDOMServer.renderToString(<Gallery />);
  res.render('gallery', { app });
};
