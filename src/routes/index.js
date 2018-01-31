import express from 'express';
import { mmpReviewTool, mmpReviewToolRedirect } from './mmp-review-tool';
import { nonVotersTool, nonVotersToolRedirect } from './non-voters-tool';

const router = express.Router({
  caseSensitive: true,
  strict: true
});

/**
 * Homepage
 */
router.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.redirect(302, '/tools');
});

/**
 * Tools
 */
router.get('/tools', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.render('tools/Tools', {
    nav: 'tools',
    title: 'MyGov Tools',
    description: 'Tools'
  });
});
router.get('/tools/mmp-review', mmpReviewToolRedirect);
router.get('/tools/mmp-review/:hash', mmpReviewTool);
router.get('/tools/non-voters', nonVotersToolRedirect);
router.get('/tools/non-voters/:hash', nonVotersTool);

export default router;
