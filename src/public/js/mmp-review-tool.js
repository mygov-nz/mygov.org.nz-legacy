'use strict';

import 'types';
import { createElement } from 'react';
import { hydrate } from 'react-dom';
// import { getData, getYears } from 'data';
import MMPReviewTool from 'views/tools/MMPReviewTool';

const root = createElement(MMPReviewTool);

hydrate(root, document.getElementById('content'));
