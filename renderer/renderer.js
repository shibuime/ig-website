// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


require('./css/style.scss');

import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import Routes from './routes';



/* Kicking Off */
render(Routes, document.getElementById('content'));



