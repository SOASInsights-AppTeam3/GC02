angular.module('app.controllers', [])
 //controller for side-menu    
.controller('side-menu21Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
//controller for the page showing all exhibition
.controller('ExhibitionController',function($scope,$http){
 //extracting data from the Wordpress category (Exhibitions) and sort them based on starting data in descending order
    $http.get('http://soasinsights.azurewebsites.net/wp-json/wp/v2/posts?categories=10').then(function (response) {
        //response consists of data, status, headers, config, stausText
       $scope.data = response.data.sort(function (a, b) {
            var datea = (a.acf.starting_date).split('/').reverse().join(),
                dateb = (b.acf.starting_date).split('/').reverse().join();
            return datea < dateb ? 1 : (datea > dateb ? -1 : 0);
       });
    
        
            console.log($scope.data);
        }).catch(function(err) {
            console.error(err);
        });

   })

//controller for opening screen
.controller('openingScreenCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
//controller for the current exhibition page
.controller('currentExhibitionCtrl', function ($scope, $stateParams, $http) {
  //extracting the data from the specific WordPress post (exhibition post) according to user action
    var url1 = 'http://soasinsights.azurewebsites.net/wp-json/wp/v2/posts/';
    var url2 = $stateParams.exhibitionId;
    console.log($stateParams.exhibitionId);
    var url = url1.concat(url2);
    var url3 = 'http://soasinsights.azurewebsites.net/wp-json/wp/v2/posts?categories=5';
    $http.get(url).then(function (response) {
           $scope.data = response.data;
           // Google analytics track page visit
            if(typeof analytics !== undefined) { 
             analytics.trackView($scope.data.acf.name); 
            } else {
      console.log("Google Analytics Current Exhibition Tracking Unavailable");
    }
            console.log($scope.data);
        }).catch(function(err) {
            console.error(err);
        });
    //extracting the data from the specific WordPress post(item post) for that part. exhibition and sort the items using item ID
    $http.get(url3).then(function (response) {
        $scope.allData = response.data;
        console.log($scope.allData);
        $scope.itemPost = [];
        $scope.itemData = [];
        for (x in $scope.allData) {
            var value = $scope.allData[x].acf.exhibition;
            console.log(value);
            if (String(value) === (String($stateParams.exhibitionId))) {
                $scope.itemData = $scope.allData[x].acf.items.sort(function (a, b) {
                    return a.item_number < b.item_number ? -1 : (a.item_number > b.item_number ? 1 : 0);
                });
                $scope.itemPost=$scope.allData[x].id;
            }
            console.log($scope.itemData);

        }
    });
   
   })
//controller for the item page (description, audio and more)
.controller('itemCtrl', function ($scope, $stateParams, $http,$ionicPlatform) {
  //extracting data from the WordPress post (in item category) according to user action
    var url1 = 'http://soasinsights.azurewebsites.net/wp-json/wp/v2/posts/';
    $scope.url2 = $stateParams.itemPost;
    console.log($stateParams.itemPost);
    var url = url1.concat($scope.url2);
    console.log(url);
    $http.get(url).then(function (response) {
        $scope.exhibitionId = response.data.acf.exhibition;
        $scope.allData = response.data.acf.items;
        $scope.specificitem = [];
        for (y in $scope.allData) {
            var value1 = $scope.allData[y].item_number;
            if (String(value1) === (String($stateParams.itemId))) {
                $scope.specificitem = $scope.allData[y];
                console.log($scope.specificitem);
                // Google analytics track page visit
            if(typeof analytics !== undefined) { 
             analytics.trackView($scope.specificitem.name_of_exhibit); 
            } else {
                console.log("Google Analytics Item Tracking Unavailable");
            }
                $scope.name = $scope.specificitem.name_of_exhibit;
                $scope.paragraph = String($scope.specificitem.long_description).replace(/<\s*\/?\s*br\s*.*?>/g, "\n");
                $scope.audioUrl = $scope.specificitem.audio;
                console.log($scope.audioUrl);
            }            
            };
    //controller for audio player
    $scope.start= false;
    $scope.play = true;
    $scope.remain_rewind=false;
        $scope.remain_forward=false;
    $ionicPlatform.ready(function(){
        var src_1="http://soasinsights.azurewebsites.net/";
        var src_2 = $scope.audioUrl;
        var src = src_1.concat(src_2);
        console.log(src);
        $scope.media = new Media(src, null, null, mediaStatus);
    //function for play/pause button
    $scope.playPause=function(){
         if(typeof analytics !== undefined) { 
            analytics.trackEvent("Audio", "User attempted to use audio player for " + $scope.name, "Used", 25); 
        }
        $scope.start=true;
        $scope.remain_rewind=true;
        $scope.remain_forward=true;
        if($scope.play){
                $scope.media.play();
        }else{
                $scope.media.pause();
        };
        $scope.play=!$scope.play;
    };
    //function for stop button
    $scope.stopMedia = function(){
        $scope.media.stop();
        $scope.play=true;
        $scope.start=false;
        $scope.remain_rewind=false;
        $scope.remain_forward=false;
         if(typeof analytics !== undefined) { 
            analytics.trackEvent("Audio", "Audio for " + $scope.name + " stopped by the user", "Stopped", 25); 
        }
    };
    //function for rewind button
      $scope.Rewind = function(){
    $scope.media.getCurrentPosition(function(position) {
    var mediaDuration = $scope.media.getDuration(); 
      if(position>-1){
        $scope.remain_rewind=true;
            console.log((position) + " sec");
            var mediaPosition = position - (mediaDuration/50);
      if(mediaPosition >-1){
        var mediaInMilli = mediaPosition*1000;
        $scope.media.seekTo(mediaInMilli);
        console.log((mediaInMilli) + " sec");
        }else{
        var mediaInMilli = 0; 
        $scope.media.seekTo(mediaInMilli);
        console.log((mediaInMilli) + " sec");
        };
      
  }else{
    $scope.remain_rewind=false;
  }
  },
      function(e){
        console.log("Error getting pos=" + e);
      });
    };
    //function for the fast forward button
    $scope.FastFoward = function(){
    $scope.media.getCurrentPosition(function(position) {
    var mediaDuration = $scope.media.getDuration();
    if(position>-1){
        console.log((position) + " sec");
        var mediaPosition = position + (mediaDuration/50);
      if(mediaPosition < mediaDuration){
        $scope.remain_forward=true;
      var mediaInMilli = mediaPosition*1000;
  }else{
    $scope.start= false;
    $scope.play = true;
    $scope.remain_forward=false;
    $scope.remain_rewind=false;

  }
      console.log((mediaInMilli) + " sec");
      $scope.media.seekTo(mediaInMilli);
      }else{
        $scope.remain_forward=false;
    }
    },
      function(e){
        console.log("Error getting pos=" + e);
      });
    };
    //function upon leaving the field
     $scope.$on('$ionicView.afterLeave', function(){
        $scope.media.stop();
        $scope.media.release();
        $scope.start= false;
        $scope.play = true;
    });
     //function for mediaStatus
     function mediaStatus(status) {
        if(status==4){
          $scope.stopMedia;
        console.log("Music ends." + $scope.play);
         if(typeof analytics !== undefined) { 
            analytics.trackEvent("Audio", "Audio for " + $scope.name + "Played till the end", "Completed", 25); 
        }
        }
   };

   
  });

    });
        
        
    })

   
//quiz controller 
.controller('quizCtrl', function ($scope, $stateParams,$http,$ionicPopup, $timeout) {
   
    var url1 = 'http://soasinsights.azurewebsites.net/wp-json/wp/v2/posts/';
    $scope.url2 = $stateParams.exhibitionId;
    var url = url1.concat($scope.url2);
    $scope.name="";
    $http.get(url).then(function(response){
        $scope.name = response.data.acf.name;
         // Google analytics track page visit
    if(typeof analytics !== undefined) { 
        analytics.trackView("User accessed quiz page for " + $scope.name); 
        console.log("User accessed quiz page for " + $scope.name);
    } else {
      console.log("Google Analytics Quiz Tracking Unavailable");
    };
    });
    
    //extracting data from WordPress posts (category:quiz)
    var url_quiz = 'http://soasinsights.azurewebsites.net/wp-json/wp/v2/posts?categories=7';
    $http.get(url_quiz).then(function (response) {
        $scope.allData = response.data;
        console.log($scope.allData);
        $scope.questionShow = [];
        for (x in $scope.allData) {
            var value = $scope.allData[x].acf.exhibition_it_is_in;
            console.log(value);
            if (String(value) === (String($stateParams.exhibitionId))) {
                $scope.quiz = $scope.allData[x].acf.quiz_question;
                $scope.length = $scope.quiz.length;
                $scope.questionShow = $scope.quiz[0].quiz_question;
                $scope.choiceShow=$scope.quiz[0].choices;
                $scope.correctAnswer = $scope.choiceShow[parseInt($scope.quiz[0].correct_answer)-1];
                }

            }
        });
    //initialize $scope to be used in html
   $scope.message = "Click 'Check' to check your answer instantly or click 'Next' to continue.";
   $scope.NextButton = "Next";
   $scope.score = 0;
    $scope.questionNo = 0;
    $scope.counter=0;
    $scope.answer = "";
    $scope.checkedItem="";
    $scope.finish=false;
    $scope.yes = false;
    $scope.able_check=true;
    $scope.able = true;
    //function for saving the answer from checkbox
    $scope.saveValue = function(item){
        $scope.answer = item;
    };
    $scope.checkAnswer = function(){
         if($scope.answer!=""){
            $scope.able_check=false;
            $scope.yes = $scope.counter + 1 <= $scope.length && $scope.correctAnswer.choice == $scope.answer;
            if($scope.yes){
                if($scope.counter + 1 <= $scope.length){
                  $scope.message = "Your answer is correct. Click 'Next' to continue.";
                }
                
              }else{
                  if($scope.counter + 1 <= $scope.length){
                  $scope.message = "You got it wrong! The correct answer is: " + $scope.correctAnswer.choice + ". Click 'Next' to continue.";
              }
        }
    }else{
           var alertPopup = $ionicPopup.alert({
       title: 'Nothing is selected!<br><br>Please select an answer to continue.',
       buttons:[{text: 'Okay',type:'button-energized button-block'}],
     });
     alertPopup.then(function(res) {
       console.log('Stop!');
     }); 
        };  

    
};
    //function for displaying the next question + finishing the quiz
    $scope.displayNext = function(){
       if($scope.answer!=""){
 
            $scope.yes = $scope.counter + 1 <= $scope.length && $scope.correctAnswer.choice == $scope.answer;
            if($scope.yes){
                    $scope.score+=1;
        }  
        $scope.counter+=1;
        if($scope.counter + 1 <= $scope.length){
        $scope.able_check=true;
        $scope.answer = "";
        $scope.message ="Click 'Check' to check your answer."
        $scope.questionNo+=1;
        $scope.questionShow = $scope.quiz[$scope.questionNo].quiz_question;
        $scope.choiceShow = $scope.quiz[$scope.questionNo].choices;
        $scope.correctAnswer = $scope.choiceShow[parseInt($scope.quiz[$scope.questionNo].correct_answer)-1];
        if($scope.questionNo + 1 == $scope.length){
            $scope.able_check=false;
            $scope.NextButton = "Finish";
            $scope.message = "This is the last question. Click 'Finish' to display the score.";
        }

    }else{
        if(typeof analytics !== undefined) { 
            analytics.trackEvent("Quiz", "Quiz Finished", "Completed", 25); 
        }
        $scope.able = false;
        $scope.finish=true;
        if ($scope.correctAnswer.choice == $scope.answer){
          $scope.message = "Your answer for this question is correct. Your score is " + $scope.score + " out of " + $scope.length + ".";  
        }else{
        $scope.message = "You got it wrong! The correct answer is " + $scope.correctAnswer.choice + ". Your score is " + $scope.score + " out of " + $scope.length + ".";
        }
    };
    }else{
           var alertPopup = $ionicPopup.alert({
       title: 'Nothing is selected!<br><br>Please select an answer to continue.',
       buttons:[{text: 'Okay',type:'button-energized button-block'}],
     });
     alertPopup.then(function(res) {
       console.log('Stop!');
     }); 
        };  

   }

//function for displaying the previous question
    $scope.displayPrev = function(){
        console.log($scope.questionNo);
        if($scope.questionNo > 0){
        $scope.questionNo-=1;
        $scope.counter-=1;
        $scope.able_check=true;
        if($scope.yes){
            $scope.score-=1;
        }  
        $scope.questionShow = $scope.quiz[$scope.questionNo].quiz_question;
        $scope.choiceShow = $scope.quiz[$scope.questionNo].choices;
        $scope.correctAnswer = $scope.choiceShow[parseInt($scope.quiz[$scope.questionNo].correct_answer)-1];
        if($scope.questionNo + 1 !=$scope.length){
            $scope.NextButton = "Next";
            $scope.message = "Click 'Check' to check your answer.";
        }
    }else{}

    };
//function for starting over
    $scope.startOver = function(){
        $scope.questionNo = 0;
        $scope.counter=0;
        $scope.able_check=true;
        $scope.finish=false;
        $scope.questionShow = $scope.quiz[$scope.questionNo].quiz_question;
        $scope.choiceShow = $scope.quiz[$scope.questionNo].choices;
        $scope.correctAnswer = $scope.choiceShow[parseInt($scope.quiz[$scope.questionNo].correct_answer)-1];
        $scope.score = 0;
        $scope.answer = "";
        $scope.able=true;
        $scope.NextButton="Next";
        $scope.message = "Click 'Check' to check your answer instantly or click 'Next' to continue.";
    };
        


})


//controller for about page   
.controller('aboutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

//controller for terms and condition page   
.controller('termsAndConditionsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}]);
   
