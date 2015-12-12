angular.module('firebase.config', [])
  .constant('FBURL', 'https://intense-heat-8204.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
