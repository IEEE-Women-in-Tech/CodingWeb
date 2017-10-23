
function homeCtrl() {
   let hvm = this;

   hvm.venue = {
      name: 'Code Koalas',
      img: require('../../assets/images/logos/codekoalas-logo.png'),
      url: 'https://codekoalas.com/',
      address: '1712 Main St STE 100 Kansas City, MO 64108'
   };
   hvm.map = {
      center: {
         latitude: 39.0929036,
         longitude: -94.5837574
      },
      zoom: 15,
      marker: {
         id:0,
         coords: {
            latitude: 39.0929036,
            longitude: -94.5837574
         }
      }
   };

};

homeCtrl.$inject = []

function codeCtrl() {
   let cvm = this;
   cvm.tools = [{
      name: 'cupcake',
      url: '',
      img: require('../../assets/images/cupcake1.png')
   }, {
      name: 'cupcake',
      url: '',
      img: require('../../assets/images/cupcake2.png')
   }, {
      name: 'cupcake',
      url: '',
      img: require('../../assets/images/cupcake3.png')
   }, {
      name: 'cupcake',
      url: '',
      img: require('../../assets/images/code.png')
   }];
};

function mentorCtrl() {
   let mvm = this;

   mvm.leaders = [{
      name: 'Jody Smith',
      title: 'Co-Director',
      img: require('../../assets/images/mentors/jody.jpg'),
      twitter: ''
   }, {
      name: 'Jennifer Wadella',
      title: 'Founder',
      img: require('../../assets/images/mentors/jennifer.png'),
      twitter: 'likeOMGitsFEDAY'
   }];

   mvm.mentors = [{
      name: 'Olivia Mark',
      title: 'Mentor',
      img: require('../../assets/images/mentors/oliviamark.jpg'),
      twitter: 'opticspec'
   }, {
      name: 'Jessica Ralston',
      title: 'Mentor',
      img: require('../../assets/images/mentors/jessicaralston.jpg'),
      twitter: ''
   }, {
      name: 'Amy Kurtz',
      title: 'Mentor',
      img: require('../../assets/images/mentors/amy.jpg'),
      twitter: 'amyontheweb'
   }, {
      name: 'Kayla Hennegin',
      title: 'Mentor',
      img: require('../../assets/images/mentors/kayla.jpeg'),
      twitter: 'bellafaith'
   }, {
      name: 'Thuy Copeland',
      title: 'Mentor',
      img: require('../../assets/images/mentors/thuyc.jpg'),
      twitter: 'mindgraffiti'
   }, {
      name: 'Nancy Alpers',
      title: 'Mentor',
      img: require('../../assets/images/mentors/nancy.jpeg'),
      twitter: 'nancyalpers'
   }, {
      name: 'Brenda Riggs',
      title: 'Volunteer',
      img: require('../../assets/images/mentors/brenda.jpeg'),
      twitter: 'Riggs_Brenda'
   }];
};



export default angular.module('home.controllers', [])
   .controller('homeCtrl', homeCtrl)
   .controller('codeCtrl', codeCtrl)
   .controller('mentorCtrl', mentorCtrl);
