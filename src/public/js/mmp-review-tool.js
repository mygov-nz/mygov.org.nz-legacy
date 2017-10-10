'use strict';

import 'types';
import React from 'react';
import ReactDOM from 'react-dom';
import { getData, getYears } from 'data';

console.log(getYears().map(getData));
