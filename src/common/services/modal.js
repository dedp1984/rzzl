angular.module('app')
    .factory('modal',function( $uibModal){
        return {
            print:function(scope,templateUrl,size,actionButtons,wintype){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    scope:scope,
                    backdrop:true,
                    templateUrl: 'common/tpl/dialog-print.html',
                    controller: function($scope){
                        $scope.templateUrl=templateUrl;
                        $scope.print=function(){
                            window.print();
                            $uibModalInstance.close();
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.$on('onClose',function(){
                            console.log('recv close');
                            $uibModalInstance.dismiss('cancel');
                        })
                    },
                    size: size
                });
            },
            error:function(errmsg){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    backdrop:true,
                    resolve:{
                      error:function(){
                          return errmsg;
                      }
                    },
                    templateUrl: 'common/tpl/dialog-error.html',
                    controller: function($scope,error){
                        $scope.errmsg=error;
                        $scope.print=function(){
                            window.print();
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.$on('onClose',function(){
                            console.log('recv close');
                            $uibModalInstance.dismiss('cancel');
                        })
                    }
                });
            },
            info:function(title,info){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    backdrop:true,
                    resolve:{
                        tips:function(){
                            return info;
                        },
                        title:function(){
                            return title
                        }
                    },
                    templateUrl: 'common/tpl/dialog-info.html',
                    controller: function($scope,tips,title){
                        $scope.tips=tips;
                        $scope.title=title;
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.$on('onClose',function(){
                            console.log('recv close');
                            $uibModalInstance.dismiss('cancel');
                        })
                    }
                });
            },
            confirm:function(title,info){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    backdrop:true,
                    resolve:{
                        tips:function(){
                            return info;
                        },
                        title:function(){
                            return title
                        }
                    },
                    templateUrl: 'common/tpl/dialog-confirm.html',
                    controller: function($scope,tips,title){
                        $scope.tips=tips;
                        $scope.title=title;
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.ok=function(){
                            $uibModalInstance.close();
                        }
                    }
                });
                return $uibModalInstance.result;
            },
            show:function(templateUrl,indata){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    backdrop:'false',
                    resolve: {
                        indata: function () {
                            return indata;
                        }
                    },
                    templateUrl: templateUrl,
                    controller: function($scope,indata){
                        $scope.vm={};
                        $scope.vm.indata=indata;
                        $scope.vm.outdata={};
                        $scope.ok=function(){
                            $uibModalInstance.close($scope.vm);
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: 'lg'
                });
                return $uibModalInstance.result;
            }
        }
    })
