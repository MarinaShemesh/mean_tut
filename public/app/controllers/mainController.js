// console.log('testing mainController');
angular.module('mainController', ['authService'])
  .controller('MainCtrl', MainCtrl);

 MainCtrl.$inject = ['Auth', '$timeout', '$location'];
 function MainCtrl(Auth, $timeout, $location){
   // console.log('testing the MainCtlr');
    const app = this;

    this.doLogin = function(loginData){
      console.log('login form submitted');
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
        }, 2000);
        //redirect to home page
        
      } else {
        app.loading = false;
        app.errorMessage = data.data.message;
      }
    });

    }

 }


