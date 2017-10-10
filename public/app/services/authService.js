// console.log('testing the authService');
angular.module('authService', [])
 // .config(function(){
  // console.log('testing auth service config');
    .factory('Auth', function ($http, AuthToken){

    const authFactory = {};
    
    authFactory.login = function(loginData){
      return $http.post('/api/authenticate', loginData)
      .then(function (data){
       // console.log('token:', data.data.token);
       AuthToken.setToken(data.data.token);
       return data;
      });
    };

   // Auth.isLoggedIn();
    authFactory.isLoggedIn = function(){
      if (AuthToken.getToken()){
        return true;
      } else {
        return false;
      }
    };

   // Auth.facebook(token);
    authFactory.facebook = function (token){
      AuthToken.setToken(token);
    };
    
    // Auth.getUser();
    authFactory.getUser = function(){
      if(AuthToken.getToken()){
        return $http.post('api/currentuser');
      } else {
        $q.reject({message: 'User has no token'});
      }
    };

    // Auth.logout();
    authFactory.logout = function(){
      AuthToken.setToken();//empty so token is not being set
    };
      return authFactory;
  })
  
  .factory('AuthToken', function ($window){
    const authTokenFactory = {};
    
    // AuthToken.setToken(token);
    authTokenFactory.setToken = function(token){
      if(token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
      
    };
    
    // AuthToken.getToken();
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token');
    };
  
    return authTokenFactory;
  })

  .factory('AuthInterceptors', function (AuthToken){//check for tokens on every request
    const authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config){
      const token =  AuthToken.getToken();

      if(token) config.headers['x-access-token'] = token;

      return config;
    };

    return authInterceptorsFactory
  });




 

  