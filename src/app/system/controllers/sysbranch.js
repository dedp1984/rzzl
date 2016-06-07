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
        this.item.gpslvl0t4s=this.lvl0t4s;
        this.item.gpslvl4t6s=this.lvl4t6s;
        this.item.gpslvl6s=this.lvl6s;
        CarCreditRestangular.all('branchs').post(this.item).then(function(){
            $state.go('app.sysbranchs.list');
            toaster.pop('success', '操作提醒',  '增加经销商成功');
        },function(){

        })
    };
    $scope.detail=function(id){
        CarCreditRestangular.one('branchs',id).get().then(function(response){
            $scope.item=response;
            $scope.getAllGpsLvl();
            $state.go('app.sysbranchs.detail');
        })
    };
    $scope.initBranchGpsLvl=function(){
        CarCreditRestangular.all("gpslvl").getList({'lvlamt':'0-4'}).then(function(response){
            $scope.gpsLvls0t4=response;
            $scope.lvl0t4s=$scope.item.gpslvl0t4s;
            for(var i=0;i<$scope.lvl0t4s.length;i++){
                var item=$scope.lvl0t4s[i];
                for(var j=0;j<$scope.gpsLvls0t4.length;j++){
                    if(item.id==$scope.gpsLvls0t4[j].id){
                        $scope.gpsLvls0t4.splice(j,1);
                        break;
                    }
                }
            };
        });
        CarCreditRestangular.all("gpslvl").getList({'lvlamt':'4-6'}).then(function(response){
            $scope.gpsLvls4t6=response;
            $scope.lvl4t6s=$scope.item.gpslvl4t6s;
            for(var i=0;i<$scope.lvl4t6s.length;i++){
                var item=$scope.lvl4t6s[i];
                for(var j=0;j<$scope.gpsLvls4t6.length;j++){
                    if(item.id==$scope.gpsLvls4t6[j].id){
                        $scope.gpsLvls4t6.splice(j,1);
                        break;
                    }
                }
            };
        });
        CarCreditRestangular.all("gpslvl").getList({'lvlamt':'6-max'}).then(function(response){
            $scope.gpsLvls6=response;
            $scope.lvl6s=$scope.item.gpslvl6s;
            for(var i=0;i<$scope.lvl6s.length;i++){
                var item=$scope.lvl6s[i];
                for(var j=0;j<$scope.gpsLvls6.length;j++){
                    if(item.id==$scope.gpsLvls6[j].id){
                        $scope.gpsLvls6.splice(j,1);
                        break;
                    }
                }
            };
        });
    };
    $scope.modify=function(){
        $scope.item.gpslvl0t4s=this.lvl0t4s;
        $scope.item.gpslvl4t6s=this.lvl4t6s;
        $scope.item.gpslvl6s=this.lvl6s;
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
    };
    $scope.getAllGpsLvl=function(){
        $scope.gpsLvls0t4=CarCreditRestangular.all("gpslvl").getList({'lvlamt':'0-4'}).$object;
        $scope.gpsLvls4t6=CarCreditRestangular.all("gpslvl").getList({'lvlamt':'4-6'}).$object;
        $scope.gpsLvls6=CarCreditRestangular.all("gpslvl").getList({'lvlamt':'6-max'}).$object;
    };
    $scope.select0t4SysGpsLvl=function(){
        for(var i=0;i<$scope.gpsLvls0t4.length;i++){
            var item=$scope.gpsLvls0t4[i];
            if(item.id==this.lvl0t4sys){
                $scope.gpsLvls0t4.splice(i,1);
                this.lvl0t4s.push(item);
            }
        }
    }

    $scope.select0t4BranchGpsLvl=function(){
        for(var i=0;i<this.lvl0t4s.length;i++){
            var item=this.lvl0t4s[i];
            if(item.id==this.lvl0t4){
                this.lvl0t4s.splice(i,1);
                $scope.gpsLvls0t4.push(item);
            }
        }
    }
    $scope.select4t6SysGpsLvl=function(){
        for(var i=0;i<$scope.gpsLvls4t6.length;i++){
            var item=$scope.gpsLvls4t6[i];
            if(item.id==this.lvl4t6sys){
                $scope.gpsLvls4t6.splice(i,1);
                this.lvl4t6s.push(item);
            }
        }
    }

    $scope.select4t6BranchGpsLvl=function(){
        for(var i=0;i<this.lvl4t6s.length;i++){
            var item=this.lvl4t6s[i];
            if(item.id==this.lvl4t6){
                this.lvl4t6s.splice(i,1);
                $scope.gpsLvls4t6.push(item);
            }
        }
    }
    $scope.select6SysGpsLvl=function(){
        for(var i=0;i<$scope.gpsLvls6.length;i++){
            var item=$scope.gpsLvls6[i];
            if(item.id==this.lvl6sys){
                $scope.gpsLvls6.splice(i,1);
                this.lvl6s.push(item);
            }
        }
    }

    $scope.select6BranchGpsLvl=function(){
        for(var i=0;i<this.lvl6s.length;i++){
            var item=this.lvl6s[i];
            if(item.id==this.lvl6){
                this.lvl6s.splice(i,1);
                $scope.gpsLvls6.push(item);
            }
        }
    }


  }])
;