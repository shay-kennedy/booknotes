import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import routes from './components/router';


console.log(`Client running in ${process.env.NODE_ENV} mode`);

render(routes, document.getElementById('app'));