/**У�����֤���ȱ���Ϊ18λ**/
app.directive('verifyIdno',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                if(newVal.length!=18){
                    ngModelController.$setValidity('sfhf', false);
                }else{
                    ngModelController.$setValidity('sfhf', true);
                }
            });
        }
    }
});
