import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';

import "./public/styles/main.scss";

import Application from './components/application.js';

console.clear();

ReactDOM.render(
  <Application />,
  document.getElementById('container')
);

