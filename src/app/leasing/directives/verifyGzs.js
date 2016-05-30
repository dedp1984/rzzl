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
                   // ngModelController.$error={};
                    ngModelController.$setValidity('isOver', true);

                }
            });
        }
    }
});
