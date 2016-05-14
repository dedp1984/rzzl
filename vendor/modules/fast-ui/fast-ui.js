angular.module('fast',['fast.directive']);
angular.module('fast.directive',['fast.template','restangular']);
angular.module('fast.template',[]);
'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:grid
 * @description
 * # grid
 */
angular.module('fast.directive')
  .directive('grid', function () {
    return {
        restirct: 'E',
        scope: {
            gridData:"=",
            url: '@',
            params: '=',
            autoload: '='
        },
        replace: true,
        controller: function ($scope,$element,$attrs,$http) {
            this.addHeader = function (header) {
                if($scope.headers==undefined){
                    $scope.headers=[];
                };
                var flag=false;
                for(var i=0;i<$scope.headers.length;i++){
                    if($scope.headers[i].title===header.title) {
                        flag = true;
                        break;
                    }
                }
                if(!flag)
                    $scope.headers.push(header);
            };
            $scope.$rowClicked = function (row) {
                $scope.$emit('rowClicked', row);
            };
            $scope.generatePageSelector = function (curpageno, pagestep) {
                $scope.pageSelector = [];
                var startIndex = curpageno - 1 > pagestep ? curpageno - pagestep : 1;
                var endIndex = $scope.totalpage - curpageno > pagestep ? curpageno + pagestep : $scope.totalpage;
                for (var i = startIndex; i <= endIndex; i++) {
                    if (curpageno == i) {
                        $scope.pageSelector.push({class: 'active', pageno: i});
                    } else {
                        $scope.pageSelector.push({class: '', pageno: i});
                    }
                }
                if (startIndex != 1) {
                    $scope.pageSelector.unshift({class: '', pageno: '...'});
                    $scope.pageSelector.unshift({class: '', pageno: 1});
                }
                if (endIndex != $scope.totalpage) {
                    $scope.pageSelector.push({class: '', pageno: '...'});
                    $scope.pageSelector.push({class: '', pageno: $scope.totalpage});
                }
            };
            //上一页
            $scope.prevPage = function () {
                if ($scope.curpageno == 1)
                    return;
                $scope.goPage(--$scope.curpageno);
            };
            //下一页
            $scope.nextPage = function () {
                if ($scope.curpageno == $scope.totalpage)
                    return;
                $scope.goPage(++$scope.curpageno);
            };
            //跳转指定页
            $scope.goPage = function (pageno) {
                $scope.curpageno = pageno;
                if($scope.loadFromLocal){
                    $scope.generatePageSelector($scope.curpageno, $scope.pagestep);
                    $scope.breakGridData();
                }else{
                    $scope.loadRemoteData();
                }
            };
            $scope.breakGridData = function () {
                var startIndex = ($scope.curpageno - 1) * $scope.pagesize;
                var endIndex = $scope.curpageno < $scope.totalpage ? $scope.curpageno * $scope.pagesize : $scope.gridData.length;
                $scope.gridPageData = [];
                for (var i = startIndex; i < endIndex; i++) {
                    $scope.gridPageData.push($scope.gridData[i]);
                }
            };
            $scope.initUseLocal = function () {
                $scope.initPageParams();
                $scope.totalpage = ($scope.gridData.length % $scope.pagesize == 0 ? $scope.gridData.length / $scope.pagesize : parseInt($scope.gridData.length / $scope.pagesize) + 1);
                $scope.generatePageSelector($scope.curpageno, $scope.pagestep);
                $scope.breakGridData();
            };
            $scope.initUseRemote = function (){
                $scope.initPageParams();
                $scope.loadRemoteData();
            };
            $scope.initPageParams=function(){
                $scope.pagesize = 10 ;
                $scope.curpageno = 1;
                $scope.pagestep = 10;
            };
            $scope.loadRemoteData = function () {
                if($scope.params==undefined){
                    $scope.params=[];
                }
                angular.extend($scope.params,{
                                    'pagesize':$scope.pagesize,
                                    'startpageno':$scope.curpageno
                                  });
                $http({
                    method: 'GET',
                    url: $scope.url,
                    params: $scope.params
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    $scope.totalItems=data.totalItems;
                    $scope.totalpage = ($scope.totalItems % $scope.pagesize == 0 ? $scope.totalItems / $scope.pagesize : parseInt($scope.totalItems / $scope.pagesize) + 1);
                    $scope.gridPageData = data.items;
                    $scope.generatePageSelector($scope.curpageno, $scope.pagestep);
                }).error(function (data, status, headers, config) {

                })
            };
            $scope.initData=function(){
              if($scope.loadFromLocal){
                  $scope.initUseLocal();
              }else{
                  $scope.initUseRemote();
              }
            };
            $scope.initHeaders=function(){
               // $scope.headers=[{title:'id'},{title:'姓名'},{title:'sex'}];
                $scope.gridPageData=[{}];
            };
            $scope.sendMessage = function (event, args) {
                $scope.$emit(event, args);
            };

        },
        transclude: true,
        templateUrl: 'templates/gridtemplate.html',
        compile: function (tEle, tAttr) {
            return {
                pre: function ($scope, iEle, iAttr, transclude) {
                    $scope.initHeaders();
                    //检查是否定义data或url属性
                    if(!(iAttr.gridData||iAttr.url)){
                        throw "data or url at least one";
                    };
                    //如果定义url则优先使用远程加载数据
                    if(iAttr.url!=undefined){
                        $scope.loadFromLocal=false;
                    }else{
                        $scope.loadFromLocal=true;
                    }
                },
                post: function ($scope, iEle, iAttr, transclude) {
                    $scope.initHeaders();
                    //设置autoload=true则自动加载数据
                    if ($scope.autoload!=undefined && $scope.autoload==true) {
                        $scope.initData();
                    };
                    $scope.$watch('curpageno', function (newVal, oldVal) {
                        $scope.enablePrev = newVal == 1 ? 'disabled' : '';
                        $scope.enableNext = newVal == $scope.totalpage ? 'disabled' : '';
                    });
                    if($scope.loadFromLocal){
                        $scope.$watch('gridData', function (newVal, oldVal) {
                           if (newVal === oldVal)
                                return;
                            $scope.initData();
                        });
                    }else{
                        $scope.$watch('params', function (newVal, oldVal) {
                            if (newVal === oldVal)
                                return;
                            $scope.initData();
                        });
                    };

                }
            }
        }
    }
});

'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:gridrow
 * @description
 * # gridrow
 */
angular.module('fast.directive')
  .directive('gridrow', function () {
    return {
        require:'^grid',
        restrict:'E',
        replace:true,
        transclude:true,
        template:'<td ng-transclude></td>',
        compile:function(tEle,tAttr,trancludeFn){
            return {
                pre:function(scope,iEle,iAttr,gridCtrl){
                    gridCtrl.addHeader({title:iAttr.header});
                },
                post:function(scope,iEle,iAttr){
                    console.log('post link')
                }
            }
        }
    }
});

'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:innerTransclude
 * @description
 * # innerTransclude
 */
angular.module('fast.directive')
  .directive('innerTransclude', function () {
    return function(scope, iEle, $attrs, ctrl, transclude){
                transclude(scope, function(clone){
            iEle.append(clone);
        });
    }
});

'use strict';

/**
 * @ngdoc directive
 * @name widgetApp.directive:tree
 * @description
 * # tree
 */
angular.module('fast.directive')
  .directive('tree', function ($compile) {
        return {
            restrict: "E",
            scope: {
                treeData: '=',
                canChecked:'=',
                nameField:'@'
            },
            controller:function($scope){
              $scope.$itemClicked=function(item) {
                  $scope.$emit('nodeClicked');
              };
                $scope.$on('childNodeChecked',function(event){
                    if(event.targetScope!=event.currentScope){
                        event.currentScope.treeData.checked=false;
                        angular.forEach(event.currentScope.treeData.children,function(object){
                            if(object.checked==true){
                                event.currentScope.treeData.checked=true;
                            }
                        })
                        console.log(event.currentScope.treeData+" receive childNodeChecked Event")
                    }
                });
                $scope.$on('parentNodeChecked',function(event){
                    if(event.targetScope!=event.currentScope) {
                        event.currentScope.treeData.checked=event.targetScope.treeData.checked;
                        console.log(event.currentScope.treeData + " receive parentNodeChecked Event")
                    }
                });
                $scope.$isLeaf=function(item){
                    return item.children.length==0||!item.children;
                };
                $scope.$itemChecked=function(item){
                    $scope.$emit('childNodeChecked');
                    $scope.$broadcast('parentNodeChecked');
                };
                $scope.$getItemIcon=function(item){
                    if($scope.$isLeaf(item)){
                        return "glyphicon glyphicon-file";
                    };
                    return item.$$expanded==true?"glyphicon glyphicon-minus":"glyphicon glyphicon-plus";
                };
                $scope.$itemExpand=function(item){
                    item.$$expanded=!item.$$expanded;
                };

            },
            templateUrl:'templates/treenode.html',
            compile: function(tElement, tAttr) {
                var contents = tElement.contents().remove();
                var compiledContents;
                return function(scope, iElement, iAttr) {
                    if(!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    compiledContents(scope, function(clone, scope) {
                        iElement.append(clone);
                    });

                };
            }
        };
    });

angular.module("fast.template").run(["$templateCache", function($templateCache) {$templateCache.put("templates/gridtemplate.html","<div class=\"row\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <table class=\"table table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th ng-repeat=\"header in headers\">\n                        {{header.title}}\n                    </th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr ng-repeat=\"data in gridPageData\" ng-click=\"$rowClicked(data)\" inner-transclude >\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-8\">\n\n        </div>\n        <div class=\"col-md-4\">\n            <ul class=\"pagination\">\n                <li ng-class=\"enablePrev\"  ng-click=\"prevPage()\">\n                    <a href=\"#\" aria-label=\"Previous\">\n                        <span aria-hidden=\"true\">&laquo;</span>\n                    </a>\n                </li>\n                <li ng-repeat=\"page in pageSelector\" class=\"{{page.class}}\">\n                    <a href=\"\" ng-click=\"goPage(page.pageno)\">\n                        {{page.pageno}}\n                    </a>\n                </li>\n                <li ng-class=\"enableNext\" ng-click=\"nextPage()\">\n                    <a href=\"#\" aria-label=\"Next\">\n                        <span aria-hidden=\"true\">&raquo;</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n\n");
$templateCache.put("templates/treenode.html","<i ng-class=\"$getItemIcon(treeData)\"  ng-click=\"$itemExpand(treeData)\"></i>\n<span ng-click=\"$itemClicked(treeData)\">\n    <input type=\"checkbox\" ng-if=\"canChecked\" ng-model=\"treeData.checked\" ng-change=\"$itemChecked(treeData)\"/>\n    {{treeData[nameField]}}\n</span>\n<ul  ng-show=\"treeData.$$expanded\">\n    <li ng-repeat=\"child in treeData.children\">\n        <tree tree-data=\"child\" can-checked=\"canChecked\" name-field=\"{{nameField}}\"></tree>\n    </li>\n</ul>\n");}]);