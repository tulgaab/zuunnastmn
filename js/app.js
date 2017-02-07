var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var App = angular.module('zuunnast', ['firebase','ngSanitize']);
App.config(function () {
  'use strict';
  var config = {
    apiKey: "AIzaSyBVUG6_-oMMiheGh--b2PlDgLsK9g1-Ens",
    authDomain: "zuunnast-1b0b1.firebaseapp.com",
    databaseURL: "https://zuunnast-1b0b1.firebaseio.com",
    storageBucket: "zuunnast-1b0b1.appspot.com",
    messagingSenderId: "60171925495"
  };
  firebase.initializeApp(config);
});

App.controller('ZuunnastController', ZuunnastController);

function ZuunnastController($scope, $firebaseObject, $firebaseArray) {
  'use strict';

  $scope.subDomain = "/zuunnastmn";
  
  $scope.getPostsLast = function(){
    var messagesRef = firebase.database().ref().child("posts").limitToFirst(2);
    $scope.posts = $firebaseArray(messagesRef);
  }

  $scope.getPosts = function(){
    var messagesRef = firebase.database().ref().child("posts");
    $scope.posts = $firebaseArray(messagesRef);
  }

  $scope.getPostDetail = function(){
    var id = getUrlParameter("id");
    if (id != null && id != undefined){
      var messagesRef = firebase.database().ref().child("posts").child(id);
      $scope.post = $firebaseObject(messagesRef);
      $scope.post.$watch(function(e) {
        if ($scope.post != null && $scope.post != undefined){
          document.title = $scope.post.title + " - " + document.title;
        }
      });
      
    }
    else{
      $scope.post = {};
    }
  }

};