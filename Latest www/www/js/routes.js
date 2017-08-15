angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
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


    .state('sOASExhibitions', {
        url: '/soas-exhibitions',
        templateUrl: 'templates/sOASExhibitions.html',
        controller: 'ExhibitionController'
    })

    .state('openingScreen', {
        url: '/opening',
        templateUrl: 'templates/openingScreen.html',
        controller: 'openingScreenCtrl'
    })
     .state('Exhibition Page', {
         url: '/soas-exhibitions/:exhibitionId',
         templateUrl: 'templates/currentExhibition.html',
         controller: 'currentExhibitionCtrl'
     })
     .state('Item Page: description', {
          url: '/soas-exhibitions/:exhibitionId/:itemPost/:itemId/description',
          templateUrl: 'templates/item_description.html',
          controller: 'itemCtrl'
     })
    .state('Item Page: audio', {
        url: '/soas-exhibitions/:exhibitionId/:itemPost/:itemId/audio',
        templateUrl: 'templates/item_Audio.html',
        controller: 'itemCtrl'
    })
    .state('Item Page: more', {
        url: '/soas-exhibitions/:exhibitionId/:itemPost/:itemId/more',
        templateUrl: 'templates/item_more.html',
        controller: 'itemCtrl'
    })
    .state('Quiz Page',{
      url: '/soas-exhibitions/:exhibitionId/quiz',
      templateUrl: 'templates/question1.html',
      controller:'quizCtrl'
    });

 

    $urlRouterProvider.otherwise('/opening');



});