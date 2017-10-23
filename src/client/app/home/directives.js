function hero() {
   return {
      template: require('./partials/hero.html')
   }
};

function thecode() {
   return {
      template: require('./partials/code.html'),
      controller: 'codeCtrl as cvm'
  }
};

function thecupcakes() {
   return {
      template: require('./partials/cupcakes.html')
   }
};

function mentors() {
   return {
      template: require('./partials/mentors.html'),
      controller: 'mentorCtrl as mvm'
   }
};

function signup() {
   return {
      template: require('./partials/signup.html')
   }
};

function contact() {
   return {
      template: require('./partials/contact.html')
   }
};

function press() {
   return {
      template: require('./partials/press.html')
   }
};

export default angular.module('home.directives', [])
   .directive('hero', hero)
   .directive('thecode', thecode)
   .directive('thecupcakes', thecupcakes)
   .directive('mentors', mentors)
   .directive('signup', signup)
   .directive('contact', contact)
   .directive('press', press);
