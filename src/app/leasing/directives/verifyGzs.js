/**校验购置税金额不超过裸车价**/
app.directive('verifyGzs',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                var lcj=$scope.itemapp.lcj;
                var sfbl=$scope.itemapp.sfbl;
                var clyh=$scope.itemapp.clyh;
                var bxf=$scope.itemapp.bxf;
                var qegzs=0.00;
                if(clyh){
                    qegzs=parseFloat(($scope.itemapp.lcj/1.17*0.1*(1-parseFloat(sfbl)/100)).toFixed(2));
                }else{
                    qegzs=parseFloat(($scope.itemapp.lcj/1.17*0.1*0.5).toFixed(2));
                }
                if(newVal>qegzs){
                    $scope.errmsg="购置税最高上限"+qegzs;
                    ngModelController.$setValidity('isOver', false);

                }else{
                    if(newVal+bxf>lcj*0.15){
                        $scope.errmsg="保险费+购置税≤裸车价*15%";
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
                }



            });
        }
    }
});
