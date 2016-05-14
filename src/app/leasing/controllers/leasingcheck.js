app.controller('leasingchecks', ['$scope', 'toaster','$state' ,'CarCreditRestangular','$stateParams','$rootScope',
    function($scope, toaster,$state,CarCreditRestangular,$stateParams,$rootScope) {

        $scope.namespace="leasingchecks";

        $scope.initList=function(){
            CarCreditRestangular.all('leasingapps').all('check').getList({sqdzt:'待审核'}).then(function(response){
                $scope.items=response;
            });
        };
        $scope.pageChanged=function(){
            $scope.initList();
        }
        $scope.query=function(){
            CarCreditRestangular.all('leasingapps').all("check").getList({sqdzt:'待审核'}).then(function(response){
                $scope.items=response;
            });
        }

}]);