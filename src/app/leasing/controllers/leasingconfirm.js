app.controller('leasingconfirms', ['$scope', 'toaster','$state', 'CarCreditRestangular','$rootScope',
    function($scope, toaster,$state,CarCreditRestangular,$rootScope) {
        $scope.initList=function(){
            CarCreditRestangular.all('leasingapps').getList({sqdzt:'待确认'}).then(function(response){
                $scope.items=response;
            })
        }

        $scope.pageChanged=function(){
            $scope.initList();
        }
        $scope.query=function(){
            CarCreditRestangular.all('leasingapps').getList({sqdzt:'待确认'}).then(function(response){
                $scope.items=response;
            })
        }
}]);