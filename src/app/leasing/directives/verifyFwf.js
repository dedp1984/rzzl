/**1000元≤服务费融资额≤3000元**/
app.directive('verifyFwf',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                if(newVal<1000||newVal>3000){
                    $scope.errmsgfwf="1000元≤服务费融资额≤3000元";
                    ngModelController.$setValidity('isOver', false);
                }else{
                    var fjfhj=
                        (parseFloat($scope.itemapp.gzs)+
                        parseFloat($scope.itemapp.fwf)+
                        parseFloat($scope.itemapp.bxf)+
                        parseFloat($scope.itemapp.ybf)+
                        parseFloat($scope.itemapp.ghf)+
                        parseFloat($scope.itemapp.jzf)+
                        parseFloat($scope.itemapp.gpsfee)).toFixed(2);
                    if(fjfhj>lcj*0.2){
                        $scope.errmsg="附加费融资总额≤裸车价*20%";
                        ngModelController.$setValidity('isOver', false);
                    }else{
                        ngModelController.$setValidity('isOver', true);
                    };
                };

            });
        }
    }
});
