'use strict';

/* Controllers */
  // signin controller
app.controller('SysBranchController', ['$scope','$rootScope','$state','toaster','CarCreditRestangular',function($scope,$rootScope,$state,toaster,CarCreditRestangular) {
    $scope.getList=function(params){
        $scope.items=CarCreditRestangular.all('branchs').getList(params).$object;
    };
    $scope.pageChanged=function(){
        $scope.getList();
    }
    $scope.save=function(){
        CarCreditRestangular.all('branchs').post(this.item).then(function(){
            $state.go('app.sysbranchs.list');
            toaster.pop('success', '操作提醒',  '增加经销商成功');
        },function(){

        })
    };
    $scope.detail=function(id){
        CarCreditRestangular.one('branchs',id).get().then(function(response){
            $scope.item=response;
            $state.go('app.sysbranchs.detail');
        })
    };
    $scope.modify=function(){
        $scope.item.save().then(function(){
            $state.go('app.sysbranchs.list');
            toaster.pop('success', '操作提醒',  '修改经销商成功');
        },function(){

        })
    };
    $scope.delete=function(){
        $scope.item.remove().then(function(){
            $state.go('app.sysbranchs.list');
            toaster.pop('success', '操作提醒',  '删除经销商成功');
        },function(){

        })
    }


  }])
;