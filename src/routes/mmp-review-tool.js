import { resultSelector } from '../lib/tools/mmp-review-tool/selectors';
import { hashToParams } from '../lib/tools/mmp-review-tool/utils';
import MMPReviewTool from '../views/tools/MMPReviewTool';

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
}

/**
 * MMP Review Tool redirect
 *
 * @param {*} req 
 * @param {*} res 
 */
export function mmpReviewToolRedirect(req, res) {
  res.redirect(302, 'https://mygov.org.nz/tools/mmp-review/MjAxNywyLDAsMCwx');
}
