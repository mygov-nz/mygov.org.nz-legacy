import ErrorPage from './ErrorPage';
import Layout from './Layout';
import MMPReviewTool from './tools/MMPReviewTool';
import NonVotersTool from './tools/NonVotersTool';
import Tools from './tools/Tools';

export default Layout;

export const views = {
  'ErrorPage': ErrorPage,
  'tools/MMPReviewTool': MMPReviewTool,
  'tools/NonVotersTool': NonVotersTool,
  'tools/Tools': Tools
};
