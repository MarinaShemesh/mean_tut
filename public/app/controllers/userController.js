// console.log('testing usercontroller');
angular.module('userController', ['userService'])
 .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope', '$http', '$location', '$timeout' ,'User'];
function RegisterController($scope, $http, $location, $timeout, User){
  // console.log('testing the RegisterController');
  const app = this;

  this.regUser = function(regData){
    // console.log('form submitted');
    app.errorMessage = false;
    app.loading = false;
    // console.log('regData:', this.regData);
    
    User.create(app.regData)
    // $http.post('/api/users', this.regData)//now in the factory
    .then(function (data){
      // console.log('success:', data.data.success);
      // console.log('message:', data.data.message);
      if(data.data.success){
        app.loading = false;
        app.successMessage = data.data.message;
        $timeout(function(){
          $location.path('/'); 
        }, 2000);
        //redirect to home page
        
      } else {
        app.loading = false;
        app.errorMessage = data.data.message;
      }
    });
  }
}

