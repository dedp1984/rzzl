app.controller('leasingapps', ['$scope', 'toaster', '$state','$stateParams','CarCreditRestangular','$rootScope','modal',
    function($scope, toaster,$state,$stateParams,CarCreditRestangular,$rootScope,modal) {
        $scope.namespace='leasingapps';
        $scope.initList=function(){
            CarCreditRestangular.all('leasingapps').all("jxs").getList().then(function(response){
                $scope.items=response;
            });
        };
        $scope.showRejectReason=function(id){
            CarCreditRestangular.one('leasingapproves',id).get().then(function(response){
                modal.info('拒绝原因',response.qxr1yj);
            })
        }
        $scope.showCheckRejectReasion=function(id){
            CarCreditRestangular.one('leasingapps',id).get().then(function(response){
                modal.info('退回原因',response.reserver6);
            })
        }
        $scope.pageChanged=function(){
            $scope.initList();
        }
        $scope.query=function(){
            CarCreditRestangular.all('leasingapps').all("jxs").getList({}).then(function(response){
                $scope.items=response;
            });
        }

}]);