import express from 'express';
import { mmpReviewTool, mmpReviewToolRedirect } from './mmp-review-tool';

const router = express.Router();

router.get('tools/mmp-review/:hash', mmpReviewTool);
router.get('tools/mmp-review', mmpReviewToolRedirect);

export default router;
