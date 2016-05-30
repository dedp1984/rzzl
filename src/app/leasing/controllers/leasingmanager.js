app.controller('leasingmanager', ['$scope', 'toaster', '$state','CarCreditRestangular','$rootScope','$http',
    function($scope, toaster,$state,CarCreditRestangular,$rootScope,$http) {

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
        }
}]);