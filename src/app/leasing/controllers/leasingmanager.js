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
            CarCreditRestangular.one("leasingapps/getOnApproveRecord",item.id).get().then(function(response){
                response.checked=true;
                $scope.selected.push(response);
            });
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
            var str="序号,经销商名称,经销商开户银行,经销商放款账号,客户姓名,身份证号,还款卡开户行,还款账号,合同金额,放款金额,期数,经销商返佣"
            for(var i=0;i<$scope.selected.length;i++){
                var item=$scope.selected[i];
                str+='\n'+i+',';
                str+=(item.branchname==undefined?" ":item.branchname)+",";
                str+=(item.openbankname==undefined?" ":item.openbankname)+",";
                str+=(item.openbankno==undefined?" ":"'"+item.openbankno)+" ,";
                str+=(item.name==undefined?" ":item.name)+",";
                str+=(item.idno==undefined?" ":"'"+item.idno)+" ,";
                str+=(item.refundbankno==undefined?"":"'"+item.refundbankno)+" ,";
                str+=(item.refundacctno==undefined?"":"'"+item.refundacctno)+" ,";
                str+=(item.rzje==undefined?"":item.rzje)+",";
                if(angular.isUndefined(item.id)||parseInt(item.id.split("-")[1])>=20160622){
                    var sfje=Math.round(parseFloat(item.rzje-item.reserver1-item.reserver3));
                    str+=sfje+",";
                }else{
                    var sfje=Math.round(parseFloat(item.rzje-item.reserver1+item.reserver2-item.reserver3));
                    str+=sfje+",";
                }
                str+=(item.rzqx==undefined?"":item.rzqx)+",";
                str+=(item.reserver2)+",";

            }
            str =  encodeURIComponent(str);
            var link = document.createElement('a');
            link.href = "data:text/csv;charset=utf-8,\ufeff"+str;
            link.download ="在审案件表.csv";
            link.click();
            window.URL.revokeObjectURL(link.href);
        };
        $scope.exportKhhzhzb=function(){
            var ids="";
            angular.forEach($scope.selected,function(item){
                ids+=item.id+',';
            })
            CarCreditRestangular.one("leasingapps","exportKhhzhzb").withHttpConfig({responseType: 'arraybuffer'}).get({'ids':ids}).then(function(response){
                console.log(response);
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                $scope.saveAs(blob, '客户还租汇总表' + '.xls');
            });
        }
    }]);