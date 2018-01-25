import { resultSelector } from '../lib/tools/mmp-review-tool/selectors';
import { hashToParams } from '../lib/tools/mmp-review-tool/utils';

const noop = () => null;

/**
 * MMP Review Tool
 *
 * @param {*} req 
 * @param {*} res 
 */
export function mmpReviewTool(req, res) {
  const state = hashToParams(req.params.hash);
  const props = resultSelector(state);
  const headers = {
    Link: '<https://mygov.org.nz/tools/mmp-review>; rel="canonical"'
  };

  props.params = state;
  props.handlers = {
    setOverhang: noop,
    setTagAlong: noop,
    setTagAlongSeats: noop,
    setThreshold: noop,
    setYear: noop
  };

  res.set(headers);
  res.render('tools/MMPReviewTool', {
    layout: {
      nav: 'tools/mmp-review',
      title: 'MMP Review Tool - MyGov',
      description: 'This tool was created to allow users to evaluate the possible effects of changes to rules determining the outcome of a New Zealand General Election.',
      scripts: [
        '/js/mmp-review-tool.js'
      ]
    },
    props
  });
}

/**
 * MMP Review Tool redirect
 *
 * @param {*} req 
 * @param {*} res 
 */
export function mmpReviewToolRedirect(req, res) {
  res.redirect(302, '/tools/mmp-review/MjAxNywyLDAsMCwx');
}
