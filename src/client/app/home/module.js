'use strict';

import angular from 'angular';

import './controllers.js';
import './directives.js';


export default angular.module('home', ['home.controllers', 'home.directives'])
   .name;

