angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('galleries', {
    url: '/galleries',
    templateUrl: 'templates/galleries.html',
    controller: 'galleriesCtrl'
  })

  .state('allCurrentSOASExhibitions', {
    url: '/all-current-exhibitions',
    templateUrl: 'templates/allCurrentSOASExhibitions.html',
    controller: 'allCurrentSOASExhibitionsCtrl'
  })

  .state('forthcomingExhibitions', {
    url: '/forthcoming-exhibitions',
    templateUrl: 'templates/forthcomingExhibitions.html',
    controller: 'forthcomingExhibitionsCtrl'
  })

  .state('pastExhibitions', {
    url: '/past-exhibitions',
    templateUrl: 'templates/pastExhibitions.html',
    controller: 'pastExhibitionsCtrl'
  })

  .state('openingScreen', {
    url: '/opening',
    templateUrl: 'templates/openingScreen.html',
    controller: 'openingScreenCtrl'
  })

  .state('currentExhibition1', {
    url: '/current-exhibition1',
    templateUrl: 'templates/currentExhibition1.html',
    controller: 'currentExhibition1Ctrl'
  })

  .state('currentExhibition2', {
    url: '/page27',
    templateUrl: 'templates/currentExhibition2.html',
    controller: 'currentExhibition2Ctrl'
  })

  .state('forthcomingExhibition1', {
    url: '/forthcoming-exhibition',
    templateUrl: 'templates/forthcomingExhibition1.html',
    controller: 'forthcomingExhibition1Ctrl'
  })

  .state('shaoXiBuddha', {
    url: '/buddha',
    templateUrl: 'templates/shaoXiBuddha.html',
    controller: 'shaoXiBuddhaCtrl'
  })

  .state('musicStandErardSebastian', {
    url: '/music-stand',
    templateUrl: 'templates/musicStandErardSebastian.html',
    controller: 'musicStandErardSebastianCtrl'
  })

  .state('buffoHarpsichord', {
    url: '/buffo-harpsichord',
    templateUrl: 'templates/buffoHarpsichord.html',
    controller: 'buffoHarpsichordCtrl'
  })

  .state('guitar', {
    url: '/guitar',
    templateUrl: 'templates/guitar.html',
    controller: 'guitarCtrl'
  })

  .state('indiaCitarPlater', {
    url: '/india-citar',
    templateUrl: 'templates/indiaCitarPlater.html',
    controller: 'indiaCitarPlaterCtrl'
  })

  .state('shaoXiBuddhaMore', {
    url: '/page28',
    templateUrl: 'templates/shaoXiBuddhaMore.html',
    controller: 'shaoXiBuddhaMoreCtrl'
  })

  .state('musicStandMore', {
    url: '/music-stand-more',
    templateUrl: 'templates/musicStandMore.html',
    controller: 'musicStandMoreCtrl'
  })

  .state('snowDomeMore', {
    url: '/snow-dome-more',
    templateUrl: 'templates/snowDomeMore.html',
    controller: 'snowDomeMoreCtrl'
  })

  .state('musicStandAudio', {
    url: '/music-stand-audio',
    templateUrl: 'templates/musicStandAudio.html',
    controller: 'musicStandAudioCtrl'
  })

  .state('shaoXiBuddhaAudio', {
    url: '/buddha-audio',
    templateUrl: 'templates/shaoXiBuddhaAudio.html',
    controller: 'shaoXiBuddhaAudioCtrl'
  })

  .state('snowDome', {
    url: '/snow-dome',
    templateUrl: 'templates/snowDome.html',
    controller: 'snowDomeCtrl'
  })

  .state('ahmedWorkingCairo', {
    url: '/ahmed-working',
    templateUrl: 'templates/ahmedWorkingCairo.html',
    controller: 'ahmedWorkingCairoCtrl'
  })

  .state('theToolsOfTheTrade', {
    url: '/the-tools-of-the-trade',
    templateUrl: 'templates/theToolsOfTheTrade.html',
    controller: 'theToolsOfTheTradeCtrl'
  })

  .state('exhibitionQuizHome', {
    url: '/quiz-home',
    templateUrl: 'templates/exhibitionQuizHome.html',
    controller: 'exhibitionQuizHomeCtrl'
  })

  .state('question1', {
    url: '/question-1',
    templateUrl: 'templates/question1.html',
    controller: 'question1Ctrl'
  })

  .state('question2', {
    url: '/question-2',
    templateUrl: 'templates/question2.html',
    controller: 'question2Ctrl'
  })

  .state('question3', {
    url: '/question-3',
    templateUrl: 'templates/question3.html',
    controller: 'question3Ctrl'
  })

  .state('question4', {
    url: '/question-4',
    templateUrl: 'templates/question4.html',
    controller: 'question4Ctrl'
  })

  .state('endOfQuiz', {
    url: '/end-of-quiz',
    templateUrl: 'templates/endOfQuiz.html',
    controller: 'endOfQuizCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })

  .state('termsAndConditions', {
    url: '/terms-and-conditions',
    templateUrl: 'templates/termsAndConditions.html',
    controller: 'termsAndConditionsCtrl'
  })

  .state('snowDomeAudio', {
    url: '/snow-dome-audio',
    templateUrl: 'templates/snowDomeAudio.html',
    controller: 'snowDomeAudioCtrl'
  })

$urlRouterProvider.otherwise('/opening')

  

});