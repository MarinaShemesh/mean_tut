// console.log('testing mainController');
angular.module('mainController', ['authService'])
  .controller('MainCtrl', MainCtrl);

 MainCtrl.$inject = ['Auth', '$timeout', '$location' , '$rootScope'];
 function MainCtrl(Auth, $timeout, $location, $rootScope){
   // console.log('testing the MainCtlr');
    const app = this;

    $rootScope.$on('$routeChangeStart', function () {

      if(Auth.isLoggedIn()){
        console.log('success: User is logged in');
        Auth.getUser().then(function (data){
          console.log(data.data.username);
          app.username = data.data.username;
          app.usermail = data.data.email;
        });
      } else {
        console.log('Failure not logged in');
        app.username = '';
      }

    });
    
    this.doLogin = function(loginData){
      // console.log('login form submitted');
      app.loading = true;
      app.errorMessage = false;
    
        
    Auth.login(app.loginData)
       .then(function (data){
   
   //create success message
      if(data.data.success){
        app.loading = false;
        app.successMessage = data.data.message;
        $timeout(function(){
          $location.path('/about'); 
          app.loginData = '';
          app.successMessage = false;
        }, 2000);
        //redirect to home page
        
      } else {
        app.loading = false;
        app.errorMessage = data.data.message;
      }
    });

    };

    this.logout = function() {
     Auth.logout();
     $location.path('/logout');
     $timeout(function(){
      $location.path('/');
     }, 2000);
    };

 }


