var taskApp = angular.module('taskApp',['ngAnimate','ui.bootstrap','xeditable']);
taskApp.run(function(editableOptions){
   editableOptions.theme = 'bs2';
});