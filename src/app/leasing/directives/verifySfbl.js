/**保险融资额与购置税融资额合计≤裸车价*15%**/
app.directive('verifySfbl',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                var productitem=$scope.productitem;
                if(newVal==0){
                    if(productitem.periods>=36&&productitem.periods<=60){
                        if(productitem.rate!=15.8&&productitem.rate!=18.8&&productitem.rate!=16.8){
                            $scope.errmsg="零首付产品：利率只能选15.8%、16.8%、18.8%";
                            ngModelController.$setValidity('isOver', false);
                        }else{
                            ngModelController.$setValidity('isOver', true);
                        }

                    }else{
                        $scope.errmsg="零首付产品：3年≤融资期限≤5年";
                        ngModelController.$setValidity('isOver', false);
                    }
                }

            });
        }
    }
});
