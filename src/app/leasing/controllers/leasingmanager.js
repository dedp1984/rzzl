app.controller('leasingmanager', ['$scope', 'toaster', '$state','CarCreditRestangular','$rootScope',
    function($scope, toaster,$state,CarCreditRestangular,$rootScope) {

        $scope.initList=function(){
            CarCreditRestangular.all('leasingapps').all('managerAppDetail').getList().then(function(response){
                $scope.items=response;
            });
        };
        $scope.pageChanged=function(){
            $scope.initList();
        }
        $scope.query=function(){
            $scope.initList();
        }
}]);