app.controller('leasingmanager', ['$scope', 'toaster', '$state','CarCreditRestangular','$rootScope','$http','modal',
    function($scope, toaster,$state,CarCreditRestangular,$rootScope,$http,modal) {
        $scope.initList=function(){
            CarCreditRestangular.all('leasingapps').all('managerAppDetail').getList().then(function(response){
                $scope.items=response;
                $scope.checkSelected($scope.items);
            });
        };
        $scope.pageChanged=function(){
            $scope.selectall=false;
            $scope.initList();
        }
        $scope.query=function(){
            $scope.initList();
        }
        $scope.exportCredit=function(){
            CarCreditRestangular.one("leasingapps","downloadAppDetail").withHttpConfig({responseType: 'arraybuffer'}).get().then(function(response){
                console.log(response);
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                $scope.saveAs(blob, '申请明细信息' + '.xls');
            });
            /*
            $http({
                method: 'GET',
                url: 'http://127.0.0.1:8080/carcredit/api/leasingapps/downloadAppDetail',
                headers: {
                    'Authorization':window.localStorage.Authorization
                },
                responseType: 'arraybuffer'
            })
                .success(function(data, status){
                   // console.log(data);
                    var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                    $scope.saveAs(blob, '申请明细信息' + '.xls');
                })*/
        };
        $scope.exportInCase=function(){
            CarCreditRestangular.one("leasingapps","exportInCase").withHttpConfig({responseType: 'arraybuffer'}).get().then(function(response){
                console.log(response);
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                $scope.saveAs(blob, '在审案件明细表' + '.xls');
            });
        }
        $scope.saveAs=function(blob,fileName){
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, fileName);
            } else {
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
        };
        $scope.addToSelected=function(item){
            if(!angular.isDefined($scope.selected)){
                $scope.selected=[];
            }
            for(var i=0;i<$scope.selected.length;i++){
                if(item.id==$scope.selected[i].id){
                    if(item.checked==false){
                        $scope.selected.splice(i,1);
                        $scope.selectall=false;
                        $scope.updateAllSelect($scope.items);
                        return ;
                    }else{
                        $scope.updateAllSelect($scope.items);
                        return;
                    }
                }
            };
            $scope.selected.push(item)
            $scope.updateAllSelect($scope.items);
        };
        $scope.updateAllSelect=function(items){
        };
        $scope.selectAll=function(){
            for(var i=0;i<$scope.items.length;i++){
                $scope.items[i].checked=$scope.selectall;
                $scope.addToSelected($scope.items[i]);
            }

        }
        $scope.showSelected=function(){
            modal.show('app/leasing/tpl/dialog-onapprove.html',$scope.selected).then(function(response){
                console.log(response);
            })
        };
        $scope.checkSelected=function(items){
            if(!angular.isDefined($scope.selected)){
                $scope.selected=[];
            };
            for(var i=0;i<items.length;i++){
                for(var j=0;j<$scope.selected.length;j++){
                    if(items[i].id==$scope.selected[j].id){
                        items[i].checked=true;
                    }
                }
            };
            $scope.updateAllSelect($scope.items);
        };
        $scope.clickDownload=function(){
            var ids="";
            var i=1;
            angular.forEach($scope.selected,function(item){
                ids+=(i++)+":"+item.id+',';
            })
            CarCreditRestangular.one("leasingapps","exportZsajb").withHttpConfig({responseType: 'arraybuffer'}).get({'ids':ids}).then(function(response){
                console.log(response);
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                $scope.saveAs(blob, '在审案件表' + '.xls');
            });
        };
        $scope.exportKhhzhzb=function(){
            var ids="";
            var i=1;
            angular.forEach($scope.selected,function(item){
                ids+=(i++)+":"+item.id+',';
            })
            CarCreditRestangular.one("leasingapps","exportKhhzhzb").withHttpConfig({responseType: 'arraybuffer'}).get({'ids':ids}).then(function(response){
                console.log(response);
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                $scope.saveAs(blob, '客户还租汇总表' + '.xls');
            });
        }
        $scope.exportKhhkxxb=function(){
            var ids="";
            var i=1;
            angular.forEach($scope.selected,function(item){
                ids+=(i++)+":"+item.id+',';
            })
            CarCreditRestangular.one("leasingapps","exportKhhkxxb").withHttpConfig({responseType: 'arraybuffer'}).get({'ids':ids}).then(function(response){
                console.log(response);
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                $scope.saveAs(blob, '客户还款信息表' + '.xls');
            });
        }
    }]);