/**保险融资额与购置税融资额合计≤裸车价*15%**/
app.directive('verifyBxf',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                var gzs=$scope.itemapp.gzs;
                var lcj=$scope.itemapp.lcj;
                if(gzs+newVal>lcj*0.15){
                    ngModelController.$setValidity('isOver', false);

                }else{
                    var fjfhj=
                        (parseFloat($scope.itemapp.gzs)+
                        parseFloat($scope.itemapp.fwf)+
                        parseFloat($scope.itemapp.bxf)+
                        parseFloat($scope.itemapp.ybf)+
                        parseFloat($scope.itemapp.ghf)+
                        parseFloat($scope.itemapp.jzf));
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
