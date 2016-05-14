/**合同打印校验实际金额和裸车加区间上下3%**/
app.directive('verifySjje',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                var lcj=$scope.itemapp.lcj;
                if(newVal>lcj*1.03||newVal<lcj*0.97){
                    ngModelController.$setValidity('sfhf', false);
                }else{
                    ngModelController.$setValidity('sfhf', true);
                }
            });
        }
    }
});
