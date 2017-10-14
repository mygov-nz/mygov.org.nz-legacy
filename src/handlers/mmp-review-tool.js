/* export.form = (event, context, callback) => {
    const hash = btoa([
        req.body.year,
        req.body.threshold / 100,
        undefined === req.body.allowOverhang ? 0 : 1,
        undefined === req.body.tagAlong ? 0 : 1,
        req.body.tagAlongSeats
    ].join(','));

    callback(null, {
        statusCode: 302,
        headers: [
            'Link: <https://mygov.org.nz/tools/mmp-review>; rel="canonical"',
            `Location: https://mygov.org.nz/tools/mmp-review/${hash}`
        ]
    });
}; */

const React = require('react');
const ReactDOM = require('react-dom/server');
import { resultSelector } from '../lib/tools/mmp-review-tool/selectors';
import Layout from '../views/Layout';
import MMPReviewTool from '../views/tools/MMPReviewTool';

const noop = () => {};

exports.view = (req, res) => {
  const state = {
    overhang: false,
    tagAlong: false,
    tagAlongSeats: 1,
    threshold: 4,
    year: '2017'
  };

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
    title: 'MMP Review Tool - MyGov',
    description: 'This tool was created to allow users to evaluate the possible effects of changes to rules determining the outcome of a New Zealand General Election.'
  };

  const view = React.createElement(MMPReviewTool, props);
  const layout = React.createElement(Layout, layoutProps, view);

  res.send('<!DOCTYPE html>' + ReactDOM.renderToString(layout));
};
