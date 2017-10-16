import render from 'lib/tools/common/render';
import * as actions from 'lib/tools/mmp-review-tool/actions';
import { resultSelector } from 'lib/tools/mmp-review-tool/selectors';
import store from 'lib/tools/mmp-review-tool/store';
import MMPReviewTool from 'views/tools/MMPReviewTool';

/**
 *
 * @param {Function} dispatch
 * @returns {{}}
 */
function mapDispatchToProps(dispatch) {
  return {
    handlers: {
      setOverhang: event => dispatch(actions.setOverhang(event.target.checked)),
      setTagAlong: event => dispatch(actions.setTagAlong(event.target.checked)),
      setTagAlongSeats: event => dispatch(actions.setTagAlongSeats(event.target.value)),
      setThreshold: event => dispatch(actions.setThreshold(event.target.value)),
      setYear: event => dispatch(actions.setYear(event.target.value))
    }
  };
}

render(MMPReviewTool, store, resultSelector, mapDispatchToProps);
