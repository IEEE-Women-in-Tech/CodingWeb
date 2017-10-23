'use strict';

export default function appConfig($stateProvider, $locationProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
   $locationProvider.html5Mode(true);

   $urlRouterProvider.otherwise('/');
   $stateProvider
      .state('home', {
         url: '/',
         controller: 'homeCtrl as hvm',
         template: require('./app/home/views/home.html')
      });

     uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyASRlFMsqIDTO_2ebxq7gjOzR5nOjzItnE',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
}

appConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];
