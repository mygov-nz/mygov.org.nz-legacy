const React = require('react');
const ReactDOM = require('react-dom/server');
import { resultSelector } from '../lib/tools/non-voters-tool/selectors';
import Layout from '../views/Layout';
import NonVotersTool from '../views/tools/NonVotersTool';
import { hashToParams } from '../lib/tools/non-voters-tool/utils';

const noop = () => {};

exports.view = (req, res) => {
  const state = hashToParams(req.params.hash);
  const props = resultSelector(state);

  props.params = state;
  props.handlers = {
    setParty: noop,
    setUnenrolled: noop,
    setVotes: noop,
    setYear: noop
  };

  const layoutProps = {
    cdn: 'http://localhost:3000',
    nav: 'tools/non-voters',
    title: 'Non-voters Tool - MyGov',
    description: 'This tool was created to allow users to evaluate the possible effects of hypothetical situations where non-voters had instead chosen to vote.',
    scripts: [
      '/js/non-voters-tool.js'
    ]
  };

  const view = React.createElement(NonVotersTool, props);
  const layout = React.createElement(Layout, layoutProps, view);

  res.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout));
};
