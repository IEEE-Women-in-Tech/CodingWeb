import angular from 'angular';
import 'angular-ui-router';
import 'angular-filter';
import 'lodash';
import 'angular-simple-logger';
import 'angular-google-maps';
import 'bootstrap/dist/css/bootstrap.min.css';

import appConfig from './app.config.js';
import './app/home/module.js';

import './index.less';

angular.module('app', ['ui.router', 'angular.filter', 'uiGmapgoogle-maps',  'home'])
   .config(appConfig);