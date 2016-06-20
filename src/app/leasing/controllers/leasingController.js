app.controller('leasingController', ['$scope', '$stateParams','CarCreditRestangular','toaster','$rootScope','modal','$modal',
    function($scope,$stateParams,CarCreditRestangular,toaster,$rootScope,modal, $uibModal) {
        $scope.id=$stateParams.id;
        $scope.sqdzt=$stateParams.sqdzt;

        /**
         * 初始化录入申请单基础数据
         * **/
        $scope.initCreateAppData=function(){
            $scope.itemapp={};
            $scope.subProducts=[];
            $scope.periods=[];
            $scope.productitem={};
            $scope.tmpjtcy={fq:false,zv:false,fm:false,xdjm:false,jzj:false};
            $scope.tmptzr={fq:false,zv:false,fm:false,qq:false,ts:false,py:false};
            $scope.itemapp.jtcy='false,false,false,false,false';
            $scope.itemapp.tzr='false,false,false,false,false,false';
            $scope.itemapp.gpsfee=1998;
            $scope.itemapp.sfbl=20;
            $scope.itemapp.lcj=0;
            $scope.itemapp.gzs=0;
            $scope.itemapp.fwf=0;
            $scope.itemapp.bxf=0;
            $scope.itemapp.ybf=0;
            $scope.itemapp.ghf=0;
            $scope.itemapp.jzf=0;
            $scope.itemapp.bzj=0;
            $scope.itemapp.jtfzyhqkje=0;
            $scope.itemapp.jtfzp2pqkje=0;
            $scope.itemapp.jtfzdbqkje=0;
            $scope.itemapp.jtfzxykqkje=0;
            $scope.itemapp.jtfzqqqkje=0;
            $scope.itemapp.jtfzpyqkje=0;
            $scope.itemapp.jtfzzcgsqkje=0;
            $scope.itemapp.jtfzyhdqkhk=0;
            $scope.itemapp.jtfzp2pqkyhk=0;
            $scope.itemapp.jtfzdbqkyhk=0;
            $scope.itemapp.jtfzxykqkyhk=0;
            $scope.itemapp.jtfzqqqkyhk=0;
            $scope.itemapp.jtfzpyqkyhk=0;
            $scope.itemapp.jtfzzcgsqkyhk=0;
            $scope.itemapp.idtype=1;
            $scope.itemapp.xl=1;
            $scope.itemapp.hyzk=1;
            $scope.itemapp.zsqs=1;
            $scope.itemapp.reserver3=0;
        };
        /**
         * 初始化申请复选框组数据
         * **/
        $scope.initAppMultiCheck=function(item){
            $scope.tmpjtcy={fq:false,zv:false,fm:false,xdjm:false,jzj:false};
            $scope.tmptzr={fq:false,zv:false,fm:false,qq:false,ts:false,py:false};
            var tmptzr=item.tzr.split(',');
            $scope.tmptzr.fq=tmptzr[0]=='true';
            $scope.tmptzr.zv=tmptzr[1]=='true';
            $scope.tmptzr.fm=tmptzr[2]=='true';
            $scope.tmptzr.qq=tmptzr[3]=='true';
            $scope.tmptzr.ts=tmptzr[4]=='true';
            $scope.tmptzr.py=tmptzr[5]=='true';
            var tmpjtcy=item.jtcy.split(',');
            $scope.tmpjtcy.fq=tmpjtcy[0]=='true';
            $scope.tmpjtcy.zv=tmpjtcy[1]=='true';
            $scope.tmpjtcy.fm=tmpjtcy[2]=='true';
            $scope.tmpjtcy.qq=tmpjtcy[3]=='true';
            $scope.tmpjtcy.ts=tmpjtcy[4]=='true';

            var rzje=parseFloat(item.lcj)*(1-parseFloat(item.sfbl)/100);
            $scope.gpslvls=CarCreditRestangular.all("leasingapps").all("getBranchAvailablyGpsLvl").getList({'rzje':rzje}).$object;
        };
        /**
         * 初始化申请单录入节点数据
         * **/
        $scope.initCreateAppStatusData=function(){
            $scope.initCreateAppData();
            CarCreditRestangular.one('leasingapps','getId').get().then(function(response){
                $scope.itemapp.id=response.id;
                $scope.itemapp.tmpid=$scope.itemapp.id;
                $scope.$watch('itemapp.productname',function(newVal,oldVal){
                    if(newVal==''||newVal==undefined)
                        return;
                    var a=newVal.split('-');
                    if(a.length==2){
                        $scope.itemapp.id=$scope.itemapp.tmpid+a[1];
                    }
                });
            })
            CarCreditRestangular.all('products').getList().then(function(response){
                $scope.products=response;
            });
            $scope.invokeAppWatch();
        };
        $scope.initEditAppStatus=function(){
            CarCreditRestangular.one('leasingapps',$stateParams.id).get().then(function(response){
                var tmpitem=response;
                $scope.initAppMultiCheck(tmpitem);
                CarCreditRestangular.all('products').getList().then(function(response){
                    $scope.products=response;
                    CarCreditRestangular.one('products',tmpitem.producttype).getList().then(function(response){
                        $scope.subProducts=response;
                        CarCreditRestangular.all('products').one(tmpitem.producttype,tmpitem.productname).getList().then(function(response){
                            $scope.periods=response;
                            CarCreditRestangular.one('products',tmpitem.producttype).one(tmpitem.productname,tmpitem.rzqx).get().
                                then(function(response){
                                    $scope.productitem=response;
                                    $scope.itemapp=tmpitem;
                                    $scope.invokeAppWatch();
                                });
                        });
                    });

                });
            });
        };
        /**
         * 申请单增、删、改、提交操作
         * **/
        $scope.appctrl={
            create:function(){
                CarCreditRestangular.all('leasingapps').post($scope.itemapp).then(function(response){
                    $rootScope.back();
                    toaster.pop('success', '操作提醒',  '录入申请单信息成功');
                })
            },
            update:function(){
                        $scope.itemapp.save().then(function(response){
                            $rootScope.back();
                            toaster.pop('success', '操作提醒',  '修改申请单信息成功');
                        });
                    },
            delete:function(){
                $scope.itemapp.remove().then(function(response){
                    $rootScope.back();
                    toaster.pop('success', '操作提醒',  '删除申请单信息成功');
                });
            },
            commit:function(){
                $scope.itemapp.sqdzt='待审核';
                $scope.itemapp.save().then(function(response){
                    $rootScope.back();
                    toaster.pop('success', '操作提醒',  '提交申请单信息成功');
                });
            }
        }
        $scope.onProductChange=function(){
            $scope.itemapp.productname="";
            $scope.itemapp.rzqx="";
        };
        $scope.onSubProductChange=function(){
            $scope.itemapp.rzqx="";
        }
        /**
         * 初始化申请单Watcher
         * **/
        $scope.invokeAppWatch=function(){
            $scope.$watch('itemapp.producttype',function(newVal,oldVal){
                CarCreditRestangular.one('products',$scope.itemapp.producttype).getList().then(function(response){
                    $scope.subProducts=response;
                });
            });
            $scope.$watch('itemapp.productname',function(newVal,oldVal){
                CarCreditRestangular.all('products').one($scope.itemapp.producttype,$scope.itemapp.productname).getList().then(function(response){
                    $scope.periods=response;
                });
            });
            $scope.$watch('itemapp.rzqx',function(newVal,oldVal){
                CarCreditRestangular.one('products',$scope.itemapp.producttype).one($scope.itemapp.productname,$scope.itemapp.rzqx).get().
                    then(function(response){
                        $scope.productitem=response;
                    });
            });
            $scope.$watchGroup(['itemapp.lcj','itemapp.gpsfee','itemapp.gzs','itemapp.fwf','itemapp.bxf','itemapp.ybf','itemapp.ghf',
                'itemapp.jzf','itemapp.sfbl','productitem'],function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                $scope.itemapp.rzje=Math.round(parseFloat((($scope.itemapp.lcj*(1-$scope.itemapp.sfbl/100))+
                $scope.itemapp.gpsfee+
                $scope.itemapp.gzs+
                $scope.itemapp.fwf+
                $scope.itemapp.bxf+
                $scope.itemapp.ybf+
                $scope.itemapp.ghf+
                $scope.itemapp.jzf).toFixed(2)));
                $scope.calOtherFee();
                if($scope.itemapp.fjfhj>$scope.itemapp.lcj*0.2){

                }
            });
            $scope.$watch('itemapp.lcj',function(newVal,oldVal){
               $scope.itemapp.pgj=$scope.itemapp.lcj;
            });
            $scope.validfwf=function(){
                var fwfctl=$scope.productitem.reserver1.split(',');
                var minfwf=parseFloat(fwfctl[0]);
                var maxfwf=parseFloat(fwfctl[1]);
                var maxrate=parseFloat(fwfctl[2]);
                if($scope.itemapp.fwf>=minfwf&&$scope.itemapp.fwf<=maxfwf&&$scope.itemapp.fwf<=$scope.itemapp.lcj*maxrate){
                    return;
                }else{
                    toaster.pop('warning', '操作提醒',  $scope.productitem.reserver2);
                    $scope.itemapp.fwf=0;
                }
            }
            $scope.$watch('productitem',function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                $scope.itemapp.rzsxf=Math.round(parseFloat((($scope.itemapp.rzje/10000)*($scope.productitem.charge)).toFixed(2)));
            });
            $scope.$watch('itemapp.rzje',function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                $scope.itemapp.rzsxf=Math.round(parseFloat((($scope.itemapp.rzje/10000)*($scope.productitem.charge)).toFixed(2)));
            });
            $scope.$watchGroup(['itemapp.jtfzyhqkje','itemapp.jtfzp2pqkje','itemapp.jtfzdbqkje','itemapp.jtfzxykqkje','itemapp.jtfzqqqkje','itemapp.jtfzpyqkje','itemapp.jtfzzcgsqkje'],function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                $scope.itemapp.jtfzze=parseFloat(($scope.itemapp.jtfzyhqkje+
                $scope.itemapp.jtfzp2pqkje+
                $scope.itemapp.jtfzdbqkje+
                $scope.itemapp.jtfzxykqkje+
                $scope.itemapp.jtfzqqqkje+
                $scope.itemapp.jtfzpyqkje+
                $scope.itemapp.jtfzzcgsqkje).toFixed(2));
            });
            $scope.$watchGroup(['itemapp.jtfzyhdqkhk','itemapp.jtfzp2pqkyhk','itemapp.jtfzdbqkyhk','itemapp.jtfzxykqkyhk','itemapp.jtfzqqqkyhk','itemapp.jtfzpyqkyhk','itemapp.jtfzzcgsqkyhk'],function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                $scope.itemapp.jtfzzhke=parseFloat(($scope.itemapp.jtfzyhdqkhk+
                $scope.itemapp.jtfzp2pqkyhk+
                $scope.itemapp.jtfzdbqkyhk+
                $scope.itemapp.jtfzxykqkyhk+
                $scope.itemapp.jtfzqqqkyhk+
                $scope.itemapp.jtfzpyqkyhk+
                $scope.itemapp.jtfzzcgsqkyhk).toFixed(2));
            });
            $scope.$watch('itemapp.czr2name',function(newVal,oldVal){
                if($scope.itemapp.poname==''||$scope.itemapp.poname==undefined||(oldVal==newVal)){
                    return;
                }
                $scope.itemapp.czr2idtype=$scope.itemapp.idtype;
                $scope.itemapp.czr2idno=$scope.itemapp.poidno;
                $scope.itemapp.czr2mobile=$scope.itemapp.pomobile;
                $scope.itemapp.czr2qq=$scope.itemapp.poqq;
                $scope.itemapp.czr2weixin=$scope.itemapp.poweixin;
                $scope.itemapp.czr2dwmc=$scope.itemapp.podwmc;
                $scope.itemapp.czr2dwlx=$scope.itemapp.podwlx;
                $scope.itemapp.czr2sshy=$scope.itemapp.posshy;
                $scope.itemapp.czr2dwdh=$scope.itemapp.podwdh;
                $scope.itemapp.czr2zj=$scope.itemapp.pozj;
                $scope.itemapp.czr2zwmc=$scope.itemapp.pozwmc;
                $scope.itemapp.czr2dwdz=$scope.itemapp.podwdz;
                $scope.itemapp.czr2ysr=$scope.itemapp.poysr;
                $scope.itemapp.czr2nsr=$scope.itemapp.ponsr;
            });
            $scope.$watchGroup(['tmpjtcy.fq','tmpjtcy.zv','tmpjtcy.fm','tmpjtcy.xdjm','tmpjtcy.jzj'],function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                $scope.itemapp.jtcy=$scope.tmpjtcy.fq+','+$scope.tmpjtcy.zv+','+$scope.tmpjtcy.fm+','+$scope.tmpjtcy.xdjm+','+$scope.tmpjtcy.jzj;
            });
            $scope.$watchGroup(['tmptzr.fq','tmptzr.zv','tmptzr.fm','tmptzr.qq','tmptzr.ts','tmptzr.py'],function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                $scope.itemapp.tzr=$scope.tmptzr.fq+','+$scope.tmptzr.zv+','+$scope.tmptzr.fm+','+$scope.tmptzr.qq+','+$scope.tmptzr.ts+','+$scope.tmptzr.py;
            });

            /**
             * 根据汽车融资金额判断判断经销商可选GPS档位
             * **/
            $scope.$watchGroup(['itemapp.lcj','itemapp.sfbl'],function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                var rzje=parseFloat($scope.itemapp.lcj)*(1-parseFloat($scope.itemapp.sfbl)/100);
                if(isNaN(rzje)||angular.isUndefined(rzje))
                    return;
                $scope.itemapp.reserver9="";
                $scope.gpslvls=CarCreditRestangular.all("leasingapps").all("getBranchAvailablyGpsLvl").getList({'rzje':rzje}).$object;
            });
        };


        /**
         * 初始化审核单Watch
         * **/
        $scope.invokeCheckWatch=function(){
            $scope.$watchGroup(["itemcheck.gdgz","itemcheck.nzj","itemcheck.fysr","itemcheck.posr","itemcheck.qtsr"],function(newVal,oldVal){
                $scope.itemcheck.srhj=parseFloat($scope.itemcheck.gdgz)+
                    parseFloat($scope.itemcheck.nzj)+
                    parseFloat($scope.itemcheck.fysr)+
                    parseFloat($scope.itemcheck.posr)+
                    parseFloat($scope.itemcheck.qtsr);
                $scope.yyu=parseFloat($scope.itemcheck.srhj)-parseFloat($scope.itemcheck.zchj);
            });
            $scope.$watchGroup(["itemcheck.dydk","itemcheck.xydk","itemcheck.fzfd","itemcheck.rckz","itemcheck.qtkz"],function(newVal,oldVal){
                $scope.itemcheck.zchj=parseFloat($scope.itemcheck.dydk)+
                    parseFloat($scope.itemcheck.xydk)+
                    parseFloat($scope.itemcheck.fzfd)+
                    parseFloat($scope.itemcheck.rckz)+
                    parseFloat($scope.itemcheck.qtkz);
                $scope.yyu=parseFloat($scope.itemcheck.srhj)-parseFloat($scope.itemcheck.zchj);
            });
            $scope.$watch('yyu',function(newVal,oldVal){
                if($scope.itemapp.ygk>=$scope.yyu){
                    $scope.hknlts="大于等于";
                }else{
                    $scope.hknlts="小于";
                }
            })
        };

        /**
         * 初始化审核相关数据
         * **/
        $scope.initCheckData=function(){
            $scope.itemcheck={};
            $scope.itemcheck.gdgz=0;
            $scope.itemcheck.nzj=0;
            $scope.itemcheck.fysr=0;
            $scope.itemcheck.posr=0;
            $scope.itemcheck.qtsr=0;
            $scope.itemcheck.dydk=0;
            $scope.itemcheck.xydk=0;
            $scope.itemcheck.fzfd=0;
            $scope.itemcheck.rckz=0;
            $scope.itemcheck.qtkz=0;


        };

        /**
         * 初始化审核状态相关数据
         * **/
        $scope.initCheckStateData=function(){
            CarCreditRestangular.one('leasingapps',$stateParams.id).get().then(function(response){
                var tmpitem=response;
                $scope.initAppMultiCheck(tmpitem);
                $scope.initCheckData();
                CarCreditRestangular.all('products').getList().then(function(response){
                    $scope.products=response;
                    CarCreditRestangular.one('products',tmpitem.producttype).getList().then(function(response){
                        $scope.subProducts=response;
                        CarCreditRestangular.all('products').one(tmpitem.producttype,tmpitem.productname).getList().then(function(response){
                            $scope.periods=response;
                            CarCreditRestangular.one('products',tmpitem.producttype).one(tmpitem.productname,tmpitem.rzqx).get().
                                then(function(response){
                                    $scope.productitem=response;
                                    $scope.itemapp=tmpitem;
                                    $scope.calOtherFee();
                                    $scope.initApproveData();
                                    $scope.invokeAppWatch();
                                    $scope.invokeCheckWatch();

                                });
                        });
                    });

                });
            });

        };
        $scope.saveCheck=function(status) {
            var confirmMsg="确认操作？";
            if(status=='待审批'){
                if($scope.itemapp.producttype=="二手车融"){
                    confirmMsg="此产品为二手车融，请确认是否填写评估价";
                }
            };
            modal.confirm("操作提醒",confirmMsg).then(function(){
                $scope.itemapp.sqdzt=status;
                CarCreditRestangular.all('leasingchecks').all("saveCheck")
                    .post({'app': $scope.itemapp, 'check': $scope.itemcheck, 'approve': $scope.itemapprove})
                    .then(function (response) {
                        if(status=='待审批'){
                            $rootScope.back();
                            toaster.pop('success', '操作提醒',  '提交审核信息成功');
                        }
                        else if(status=='审核退回')
                        {
                            $rootScope.back();
                            toaster.pop('success', '操作提醒',  '审核退回成功');
                        }
                        else
                            toaster.pop('success', '操作提醒',  '保存审核信息成功');
                    });
            })

        };
        $scope.checkReject=function(){
            var $uibModalInstance=$uibModal.open({
                animation: true,
                backdrop:'false',
                templateUrl: 'app/leasing/tpl/dialog-input.html',
                controller: function($scope){
                    $scope.ok=function(){
                        $uibModalInstance.close($scope.reason);
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            });
            $uibModalInstance.result.then(function(text){
                $scope.itemapp.reserver6=text;
                $scope.itemapp.sqdzt="审核退回";
                CarCreditRestangular.all('leasingchecks').all("saveCheck")
                    .post({'app': $scope.itemapp})
                    .then(function (response) {
                        $rootScope.back();
                        toaster.pop('success', '操作提醒',  '审核退回成功');
                    });
            })
        }
        /**
         * 初始化审批数据
         * **/
        $scope.initApproveData=function(){
            $scope.itemapprove={};
             //见票放款初始化，如果产品为新车融或信用融则为见票放款，如果为二手车融为见证放款
            if($scope.productitem.productname=='二手车融'||$scope.productitem.productname=='全款再融')
                $scope.itemapprove.fkfs="1";
            else
                $scope.itemapprove.fkfs="2";
        };
        $scope.calOtherFee=function(){
            /**
             * 附加费合计=购置税+服务费+保险费+延保费+过户费+加装费，需四舍五入
             * **/
            $scope.itemapp.fjfhj=
                (parseFloat($scope.itemapp.gzs)+
                parseFloat($scope.itemapp.fwf)+
                parseFloat($scope.itemapp.bxf)+
                parseFloat($scope.itemapp.ybf)+
                parseFloat($scope.itemapp.ghf)+
                parseFloat($scope.itemapp.jzf)+
                parseFloat($scope.itemapp.gpsfee)).toFixed(2);
            /**
             * 月供款= （(融资金额-服务费)/10000*产品万元系数表+(服务费/融资期限)小数进位）四舍五入
             * **/
            if(!$scope.enableNewRzxxForm()){
                $scope.itemapp.ygk=Math.round(((($scope.itemapp.rzje-$scope.itemapp.fwf)/10000)*$scope.productitem.yhk)+Math.ceil($scope.itemapp.fwf/$scope.itemapp.rzqx));
            }else{
                $scope.itemapp.ygk=Math.round((($scope.itemapp.rzje)/10000)*$scope.productitem.yhk);
            }

            $scope.itemapp.fjbl=(parseFloat($scope.itemapp.fjfhj)/parseFloat($scope.itemapp.lcj)).toFixed(2);
            /*
             计算首付款：
             购置税大于0时,首付款=裸车价X首付比例+全额购置税-购置税
             首付款=裸车价X首付比例

             全额购置税：
             如果汽车排量小于1.6L则，全额购置税=汽车裸车价/1.17*0.1*0.5
             如果汽车排量大于1.6L则，全额购置税=汽车裸车价/1.17*0.1
             实放金额=融资金额-GPS-服务费
             */
            if($scope.itemapp.clyh){
                $scope.itemapp.qegzs=parseFloat(($scope.itemapp.lcj/1.17*0.1).toFixed(2));
            }else{
                $scope.itemapp.qegzs=parseFloat(($scope.itemapp.lcj/1.17*0.1*0.5).toFixed(2));
            }
            if($scope.itemapp.gzs>0){
                //$scope.itemapp.sfk=parseFloat(($scope.itemapp.lcj*$scope.itemapp.sfbl/100+$scope.itemapp.qegzs-$scope.itemapp.gzs).toFixed(2));
                $scope.itemapp.sfk=parseFloat(($scope.itemapp.lcj*$scope.itemapp.sfbl/100).toFixed(2));
            }else{
                $scope.itemapp.sfk=parseFloat(($scope.itemapp.lcj*$scope.itemapp.sfbl/100).toFixed(2));
            };
            //$scope.itemapp.sfk=Math.round($scope.itemapp.sfk)+1998-$scope.itemapp.gpsfee;
            if(!$scope.enableNewRzxxForm()){
                if($scope.itemapp.gpsfee>0){
                    $scope.itemapp.sfje=Math.round(parseFloat(($scope.itemapp.rzje-1998-$scope.itemapp.fwf).toFixed(2))-parseFloat($scope.itemapp.rzsxf));
                }else{
                    $scope.itemapp.sfje=Math.round(parseFloat(($scope.itemapp.rzje-$scope.itemapp.fwf).toFixed(2)))-parseFloat($scope.itemapp.rzsxf);
                }
            }else{
                //新版本放款金额=融资金额-gps费用+经销商返佣-二手车评估费
                $scope.itemapp.sfje=Math.round(parseFloat($scope.itemapp.rzje-$scope.itemapp.reserver1+$scope.itemapp.reserver2-$scope.itemapp.reserver3));
            }




        };
        /**
         * 初始化审批状态数据
         * **/
        $scope.initApproveStateData=function(){
            CarCreditRestangular.one('leasingapps',$stateParams.id).get().then(function(response){
                var tmpitem=response;
                $scope.initAppMultiCheck(tmpitem);
                $scope.initCheckData();
                CarCreditRestangular.all('products').getList().then(function(response){
                    $scope.products=response;
                    CarCreditRestangular.one('products',tmpitem.producttype).getList().then(function(response){
                        $scope.subProducts=response;
                        CarCreditRestangular.all('products').one(tmpitem.producttype,tmpitem.productname).getList().then(function(response){
                            $scope.periods=response;
                            CarCreditRestangular.one('products',tmpitem.producttype).one(tmpitem.productname,tmpitem.rzqx).get().
                                then(function(response){
                                    $scope.productitem=response;
                                    $scope.itemapp=tmpitem;
                                    CarCreditRestangular.one('leasingchecks',$scope.itemapp.id).get().then(function(response){
                                        $scope.itemcheck=response;
                                        $scope.initApproveData();
                                        CarCreditRestangular.one('leasingapproves',$scope.itemapp.id).get().then(function(response){
                                            $scope.itemapprove=response;
                                            $scope.calOtherFee();
                                            $scope.initContractData();
                                            $scope.invokeAppWatch();
                                            $scope.invokeCheckWatch();
                                        })
                                    });
                                    ;

                                });
                        });
                    });

                });
            });
        };
        /**初始化确认签约数据数据**/
        $scope.initConfirmData=function(){
            CarCreditRestangular.one('common','systemDate').get().then(function(response){
                $scope.itemapp.confirmdate=response;
            })
        }
        /***
         * 初始化确认签约节点数据
         * **/
        $scope.initConfirmStatusData=function(){
            CarCreditRestangular.one('leasingapps',$stateParams.id).get().then(function(response){
                var tmpitem=response;
                $scope.initAppMultiCheck(tmpitem);
                $scope.initCheckData();
                CarCreditRestangular.all('products').getList().then(function(response){
                    $scope.products=response;
                    CarCreditRestangular.one('products',tmpitem.producttype).getList().then(function(response){
                        $scope.subProducts=response;
                        CarCreditRestangular.all('products').one(tmpitem.producttype,tmpitem.productname).getList().then(function(response){
                            $scope.periods=response;
                            CarCreditRestangular.one('products',tmpitem.producttype).one(tmpitem.productname,tmpitem.rzqx).get().
                                then(function(response){
                                    $scope.productitem=response;
                                    $scope.itemapp=tmpitem;
                                    CarCreditRestangular.one('leasingchecks',$scope.itemapp.id).get().then(function(response){
                                        $scope.itemcheck=response;
                                        $scope.initApproveData();
                                        CarCreditRestangular.one('leasingapproves',$scope.itemapp.id).get().then(function(response){
                                            $scope.itemapprove=response;
                                            $scope.calOtherFee();
                                            $scope.initContractData();
                                            $scope.initConfirmData();
                                            $scope.invokeAppWatch();
                                            $scope.invokeCheckWatch();
                                            $scope.invokeContractWatch();
                                        })
                                    });

                                });
                        });
                    });

                });
            });
        };
       /**
        * 初始化合同打印数据
        * **/
        $scope.initContractData=function(){
            var curDate = new Date();
            var year=curDate.getFullYear();
            var month=curDate.getMonth()+1;
            var date=curDate.getDate();
            var totalMonth=month+parseInt($scope.itemapp.rzqx);
            var a=parseInt(totalMonth/12);
            var b=totalMonth%12;
            $scope.curDate=year+'年 '+month+'月'+date+'日';
            $scope.dkphase='融资(抵押)期限：自'+year+'年'+month+'月'+date+'日至'
                                +(year+a)+'年'+b+'月'+date+'日止(共'+$scope.itemapp.rzqx+'期)';
            $scope.tmplcj=$scope.itemapp.lcj;
            $scope.tmpsfk=$scope.itemapp.sfk;
            $scope.clzj=$scope.tmplcj+$scope.itemapp.gzs+$scope.itemapp.gpsfee+$scope.itemapp.rzsxf+
                $scope.itemapp.fwf+$scope.itemapp.ghf+$scope.itemapp.bxf+$scope.itemapp.jzf+$scope.itemapp.ybf;
        };
        /**初始化合同打印监控**/
        $scope.invokeContractWatch=function(){

        }
        /**
         * 提交审批
         * **/
        $scope.commitApprove=function(result) {
            modal.confirm("操作提醒","确认提交？").then(function(){
                $scope.itemapp.sqdzt=result;
                CarCreditRestangular.all('leasingapproves')
                    .post({'app': $scope.itemapp, 'check': $scope.itemcheck, 'approve': $scope.itemapprove})
                    .then(function (response) {
                        $rootScope.back();
                        toaster.pop('success', '操作提醒',  '提交'+result+'成功');
                    });
            })

        };
        /**
         * 发放核准函确认
         * **/
        $scope.commitConfirm=function(){
            modal.confirm("操作提醒","确认提交？").then(function(){
                $scope.itemapp.sqdzt="待签约";
                $scope.itemapp.save().then(function(){
                    $rootScope.back();
                    toaster.pop('success', '操作提醒',  '发放核准函成功');
                })
            })

        };
        /**
         * 保存申请单、审核表、审批表数据
         * **/
        $scope.updateAllData=function(){
            CarCreditRestangular.all('leasingapps').all('updateAllData')
                .post({'app': $scope.itemapp, 'check': $scope.itemcheck, 'approve': $scope.itemapprove})
                .then(function (response) {
                    $rootScope.back();
                    toaster.pop('success', '操作提醒',  '修改申请单信息成功');
                });
        };
        $scope.lockApp=function(){
            $scope.itemapp.sqdzt="已锁定";
            $scope.itemapp.save().then(function(){
                $rootScope.back();
                toaster.pop('success', '操作提醒',  '锁定申请单信息成功');
            })
        };
        /**
         * 打印核准函
         * **/
        $scope.printConfirm=function(){
            modal.print($scope,'app/leasing/tpl/leasing-confirm-form-print.html','lg');
        };
        /**
         * 打印申请单
         * **/
        $scope.printApp=function(){
            modal.print($scope,'app/leasing/tpl/leasing-app-form-print.html','lg');
        };
        /**
         * 打印审核表
         * **/
        $scope.printCheck=function(){
            modal.print($scope,'app/leasing/tpl/leasing-check-form-print.html','lg');
        };
        /**
         * 打印审批表
         * **/
        $scope.printApprove=function(){
            modal.print($scope,'app/leasing/tpl/leasing-approve-form-print.html','lg');
        };
        /**
         * 打印合同
         * **/
        $scope.printContract=function(){
            if($scope.itemapp.jxsid=='B202'||$scope.itemapp.jxsid=='B203'||$scope.itemapp.jxsid=='B204'){
                var $uibModalInstance=$uibModal.open({
                    animation: true,
                    backdrop:'false',
                    templateUrl: 'app/leasing/tpl/dialog-select_contract-version.html',
                    controller: function($scope){
                        $scope.ok=function(){
                            $uibModalInstance.close($scope.version);
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                });
                $uibModalInstance.result.then(function(version){
                    $scope.itemapp.sqdzt="已打印";
                    $scope.clzj=$scope.tmplcj+$scope.itemapp.gzs+$scope.itemapp.gpsfee+$scope.itemapp.rzsxf+
                        $scope.itemapp.fwf+$scope.itemapp.ghf+$scope.itemapp.bxf+$scope.itemapp.jzf+$scope.itemapp.ybf;
                    $scope.tmpsfk=$scope.itemapp.sfk+$scope.tmplcj-$scope.itemapp.lcj;
                    $scope.itemapp.save().then(function(){
                        if(version=="v2"){
                            modal.print($scope,'app/leasing/tpl/leasing-contract-form-print-v2.html','lg');
                        }else{
                            modal.print($scope,'app/leasing/tpl/leasing-contract-form-print.html','lg');
                        }

                    })
                })
            }else{
                $scope.itemapp.sqdzt="已打印";
                $scope.clzj=$scope.tmplcj+$scope.itemapp.gzs+$scope.itemapp.gpsfee+$scope.itemapp.rzsxf+
                    $scope.itemapp.fwf+$scope.itemapp.ghf+$scope.itemapp.bxf+$scope.itemapp.jzf+$scope.itemapp.ybf;
                $scope.tmpsfk=$scope.itemapp.sfk+$scope.tmplcj-$scope.itemapp.lcj;
                $scope.itemapp.save().then(function(){
                    modal.print($scope,'app/leasing/tpl/leasing-contract-form-print.html','lg');
                })
            }


        };

        /**
         * 判断是否启用新的融资基本信息模
         * 规则：当为新创建或申请单日期大于2016年6月18号则启用新融资基本信息
         * **/
        $scope.enableNewRzxxForm=function(){
            if(angular.isUndefined($scope.itemapp.id)||parseInt($scope.itemapp.id.split("-")[1])>=20160618){
                return true;
            }else{
                return false;
            }
        };

        $scope.onGpsLvlSelected=function(){
            console.log($scope.itemapp.reserver9);
            for(var i=0;i<$scope.gpslvls.length;i++){
                var item=$scope.gpslvls[i];
                if(item.id==$scope.itemapp.reserver9){
                    $scope.itemapp.reserver1=item.xsj;
                    $scope.itemapp.gpsxsj=item.xsj
                    $scope.itemapp.reserver2=item.jxsfybl;
                    $scope.itemapp.jxsfybl=item.jxsfybl;
                    if($scope.itemapp.reserver8){
                        $scope.itemapp.gpsfee=$scope.itemapp.gpsxsj;
                        $scope.itemapp.reserver2=$scope.itemapp.jxsfybl;
                        $scope.itemapp.reserver1=$scope.itemapp.gpsxsj;
                    }else{
                        $scope.itemapp.gpsfee=0;
                        $scope.itemapp.reserver2=0;
                        $scope.itemapp.reserver1=0;
                    }


                }
            }
        };
        /*
        $scope.onSFRZChecked=function(){
            if($scope.itemapp.reserver8){
                $scope.itemapp.gpsfee=$scope.itemapp.gpsxsj;
                $scope.itemapp.reserver2=$scope.itemapp.jxsfybl;
                $scope.itemapp.reserver1=$scope.itemapp.gpsxsj;
            }else{
                $scope.itemapp.gpsfee=0;
                $scope.itemapp.reserver2=0;
                $scope.itemapp.reserver1=0;
            }
        }*/
        $scope.onSFRZChecked=$scope.onGpsLvlSelected;

    }])

