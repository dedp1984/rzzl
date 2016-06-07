/**二手车价格只能为0或者300**/
app.directive('verifyEscpgf',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                if(newVal==0||newVal==300){
                    ngModelController.$setValidity('isOver', true);
                }else{
                    ngModelController.$setValidity('isOver', false);
                }
            });
        }
    }
});
