import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Main from './Main';
import Mobile from './Mobile/Mobile';
import detectMobile from './Mobile/detectMobile';

const AppMode=detectMobile()? <Mobile/>:<Main/>; 
ReactDOM.render(AppMode, document.getElementById('root'));
registerServiceWorker();
