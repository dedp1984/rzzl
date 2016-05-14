/**校验修改密码是确认密码是否与新密码相等**/
app.directive('confirmPasswd',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                var newPasswd=$scope.$eval(attrs.confirmPasswd);
                if(newPasswd!=newVal){
                    ngModelController.$setValidity('valid', false);
                }else{
                    ngModelController.$setValidity('valid', true);
                }
            });
        }
    }
});
