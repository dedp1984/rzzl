'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          $stateProvider
              //申请单录入管理
              .state('app.leasingapps',{
                  abstract:true,
                  url:'/leasingapps',
                  template:'<div ui-view=""></div>'
              })
              //查询申请单列表
              .state('app.leasingapps.list',{
                  url:'/list',
                  templateUrl:'app/leasing/tpl/leasing-app-list.html',
                  controller:'leasingapps'
              })
              //增加申请单
              .state('app.leasingapps.add',{
                  url:'/add',
                  templateUrl:'app/leasing/tpl/leasing-app-create.html',
                  controller:'leasingController'
              })
              //编辑申请单
              .state('app.leasingapps.detail',{
                  url:'/detail/:id',
                  templateUrl:'app/leasing/tpl/leasing-app-detail.html',
                  controller:'leasingController'
              })
              //打印核准函
              .state('app.leasingapps.confirm',{
                  url:'/confirm/:id',
                  templateUrl:'app/leasing/tpl/leasing-app-confirm.html',
                  controller:'leasingController'
              })
              //合同打印
              .state('app.leasingapps.contract',{
                  url:'contract/:id',
                  templateUrl:'app/leasing/tpl/leasing-app-contract.html',
                  controller:'leasingController'
              })
              //审核管理
              .state('app.leasingchecks',{
                  abstract:true,
                  url:'/leasingchecks',
                  template:'<div ui-view=""></div>'
              })
              //审核管理-查询待审核列表
              .state('app.leasingchecks.list',{
                  url:'/list',
                  templateUrl:'app/leasing/tpl/leasing-check-list.html',
                  controller:'leasingchecks'
              })
              //审核管理-审核提交
              .state('app.check',{
                  url:'/check/:id/:sqdzt',
                  templateUrl:'app/leasing/tpl/leasing-check-create.html',
                  controller:'leasingController'
              })
              //审批管理
              .state('app.leasingapproves',{
                  abstract:true,
                  url:'/leasingapproves',
                  template:'<div ui-view=""></div>',
                  controller:'leasingapproves'
              })
              //审批管理-查询待审批列表
              .state('app.leasingapproves.list',{
                  url:'/list',
                  templateUrl:'app/leasing/tpl/leasing-approve-list.html'
              })
              //审批管理-提交审批
              .state('app.approve',{
                  url:'/approve/:id',
                  templateUrl:'app/leasing/tpl/leasing-approve-create.html',
                  controller:'leasingController'
              })
              //发送核准函管理-查询待确认列表
              .state('app.leasingconfirms-list',{
                  url:'/leasingconfirms',
                  templateUrl:'app/leasing/tpl/leasing-confirm-list.html',
                  controller:'leasingconfirms'
              })
              //发送核准函管理-发送核准函
              .state('app.confirm',{
                  url:'/confirm/:id',
                  templateUrl:'app/leasing/tpl/leasing-confirm-create.html',
                  controller:'leasingController'
              })
              //申请单管理
              .state('app.manager',{
                  abstract:true,
                  url:'/manager',
                  template:'<div ui-view=""></div>'
              })
              //申请单管理-查询申请单列表
              .state('app.manager.list',{
                  url:'/list',
                  templateUrl:'app/leasing/tpl/leasing-manager-list.html',
                  controller:'leasingmanager'
              })
              //申请单管理-编辑申请单
              .state('app.manager.edit',{
                  url:'/edit/:id',
                  templateUrl:'app/leasing/tpl/leasing-manager-edit.html',
                  controller:'leasingController'
              })
      }
    ]
  );