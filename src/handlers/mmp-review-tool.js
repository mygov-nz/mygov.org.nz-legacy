import React from 'react';
import ReactDOM from 'react-dom/server';
import { resultSelector } from '../lib/tools/mmp-review-tool/selectors';
import { hashToParams } from '../lib/tools/mmp-review-tool/utils';
import Layout from '../views/Layout';
import MMPReviewTool from '../views/tools/MMPReviewTool';

const noop = () => {};

exports.view = (req, res) => {
  const state = hashToParams(req.params.hash);
  const props = resultSelector(state);

  props.params = state;
  props.handlers = {
    setOverhang: noop,
    setTagAlong: noop,
    setTagAlongSeats: noop,
    setThreshold: noop,
    setYear: noop
  };

  const layoutProps = {
    cdn: 'http://localhost:3000',
    nav: 'tools/mmp-review',
    title: 'MMP Review Tool - MyGov',
    description: 'This tool was created to allow users to evaluate the possible effects of changes to rules determining the outcome of a New Zealand General Election.',
    scripts: [
      '/js/mmp-review-tool.js'
    ]
  };

  const view = React.createElement(MMPReviewTool, props);
  const layout = React.createElement(Layout, layoutProps, view);

  if ('production' === process.env.NODE_ENV) {
    res.set('Cache-Control', 'max-age=86400');
  }

  res.set('Link', '<https://mygov.org.nz/tools/mmp-review>; rel="canonical"');
  res.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout));
};
