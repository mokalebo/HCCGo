
welcomeModule = angular.module('HccGoApp.WelcomeCtrl', [ ]);

welcomeModule.controller('welcomeCtrl', ['$scope', '$log', '$timeout', 'connectionService', '$location', function($scope, $log, $timeout, connectionService, $location) {
  
  $scope.clusters = [
    { label: 'Crane', url: 'crane.unl.edu', type: 'slurm' },
    { label: 'Tusker', url: 'tusker.unl.edu', type: 'slurm' },
    { label: 'Sandhills', url: 'sandhills.unl.edu', type: 'slurm' },
    { label: 'Glidein', url: 'glidein.unl.edu', type: 'condor' }
  ];
  
  $scope.selectedCluster = $scope.clusters[0];
  
  $scope.login = function() {
    // Get the input
    $('#loginSubmit').prop('disabled', true);
    $('#loginForm').fadeTo('fast', 0.3);
    
    this.logger = new DebugLogger($('#LoginDebugWindow'))
    
    this.logger.log("Got " + $scope.username + " for login");
    
    this.logger.log("Starting login process", 'warning');
    logger = this.logger;
    
    connectionService.initiateConnection($scope.username, $scope.password, $scope.selectedCluster.url, this.logger, userPrompt,  function(err) {
      $scope.$apply(function() {
        
        if (err) {
          logger.error("Got error from connection");
          $('#loginSubmit').prop('disabled', false);
          $('#loginForm').fadeTo('fast', 1.0);
        } else {
          
          $location.path("/cluster/" + $scope.selectedCluster.label)
          
        }
        
        
      });
      
      
      
    });
    
    
    
  };
  
  
  userPrompt = function(prompt, finishFunc) {
    $scope.$apply(function() {
      $scope.userPrompt = prompt;
    
      $("#promptModal").modal('show');
      $scope.finishFunc = finishFunc;
    });
    
  };
  
  $scope.promptComplete = function() {
    
    $("#promptModal").modal('hide');
    $scope.finishFunc($scope.userResponse);
    
  };
  
  
  
}]);
