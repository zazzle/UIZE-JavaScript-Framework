/*
	UIZE JAVASCRIPT FRAMEWORK

	http://www.uize.com/reference/Uize.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
(function(){var _a=Uize=function(){},_b,_c='string',_d='object',_e='number',_f='boolean',_g='function',_h=Function,_i=Array,_j=false,_k=true,_l=null,_m={},_n=Object.prototype.toString;var _o=0,_p=[],_q,_r= !!_i.forEach,_s= !!(_i.indexOf&&_i.lastIndexOf);function _t(_u){return(_v(_u)?_u:_u?{constructor:_b,toLocaleString:_b,toString:_b,valueOf:_b}:{});}function _w(_x,_y){var _z=_x[0];if(_A(_z)){var _B=_x[1],_C=_x.length;_A(_B)&&_y(_z,_B);if(_C>2){for(var _D=1;++_D<_C;)_A(_B=_x[_D])&&_y(_z,_B);;}}return _z;}_a.capFirstChar=function(_E){return _E.charAt(0).toUpperCase()+_E.slice(1);};var _F=_a.clone=function(_G){if(_G==_b)return _G;var _H=typeof _G;if(_H==_c||_H==_e||_H==_f||_I(_G))return _G;var _J=_G.constructor;if(_J==Date||_J==String||_J==Number||_J==Boolean){return new _J(_G.valueOf())}else if(_J==RegExp){return new RegExp(_G.source,(_G.global?'g':'')+(_G.ignoreCase?'i':'')+(_G.multiline?'m':''));};var _K=_J==Object,_L= !_K&&_M(_G);if(_K||_L){var _N,_O,_P=_K?{}:[];if(_L)_P.length=_G.length;for(var _Q in _G)
_P[_Q]=(_O=typeof(_N=_G[_Q]))==_c||_O==_e||_O==_f||_N==_b?_N:_F(_N);return _P;}return _G;};var _R=_a.constrain=function(_G,_S,_T){return(_S<_T?(_G<_S?_S:_G>_T?_T:_G):(_G<_T?_T:_G>_S?_S:_G));};_a.inRange=function(_G,_S,_T){return _G==_a.constrain(_G,_S,_T);};var _U=_a.copyInto=function(){return _w(arguments,function(_z,_B){for(var _V in _B)_z[_V]=_B[_V];});};Uize.mergeInto=function(){function _W(_z,_B){var _X,_Y;for(var _V in _B)(_Z(_Y=_B[_V])&&_Z(_X=_z[_V]))?_W(_X,_Y):(_z[_V]=_Y);}return _w(arguments,_W);};var _0=_a.forEach=function(_1,_2,_3,_4){if(_1){var _5=_M(_1);if(!_5||_1.length){if(typeof _2==_c)_2=new _h('value','key','source',_2);if(_5){if(_r&& !_4){_1.forEach(_2,_3);}else{for(var _6= -1,_7=_1.length;++_6<_7;)(_4||_6 in _1)&&_2.call(_3,_1[_6],_6,_1);}}else if(_v(_1)){for(var _6 in _1)_2.call(_3,_1[_6],_6,_1);}else if(typeof _1==_e){for(var _6= -1;++_6<_1;)_2.call(_3,_6,_6,_1);}}}};var _8=_a.resolveTransformer=function(_9){var _ba=typeof _9;return(_9==_b?_a.returnX:_ba==_g?_9:_ba=='string'
?new _h('value','key','return '+_9):_ba=='object'?(_bb(_9)?function(_G){return _9.test(_G+'')}:function(_G){return _9.hasOwnProperty(_G)?_9[_G]:_G}):function(){return _9});};_a.resolveMatcher=function(_bc){return _bc==_b?_a.returnTrue:_8(_bc);};var _bd=_a.map=function(_1,_be,_bf){if(typeof _1==_e){_1=new _i(_1);if(typeof _bf!=_d)_bf=_1;}_be=_8(_be);if(typeof _bf!=_d)_bf=_bf===_j?_1:_M(_1)?[]:{};_0(_1,function(_G,_bg){var _bh=_be.call(_1,_G,_bg);if(_bf)_bf[_bg]=_bh;},0,_k);return _bf;};_a.callOn=function(_bf,_bi,_bj){var _bk=_bl(_bi),_bm= !_bk&&_I(_bi);_bj||(_bj=_p);function _bn(_bf){if(_bf!=_b)_Z(_bf)||_M(_bf)?_0(_bf,_bn,0,_k):_bm||(_bk&&_I(_bf[_bi]))?(_bm?_bi:_bf[_bi]).apply(_bf,_bj):0;}if(_bk||_bm)_bn(_bf);};_a.defaultNully=function(_G,_bo){return _G!=_b?_G:_bo;};_a.indexIn=function(_1,_G,_bp,_bq){var _br=_bs(_1),_P= -1;if(_br||_v(_1)){var _bt=_br?_1:_bu(_1);if((_bq=_bq!==_j)&&_s){_P=_i[_bp?'lastIndexOf':'indexOf'](_bt,_G);}else{for(var _bv=_bt.length,_6=_bp?_bv: -1,_bw=_bp? -1:1;--_bv>=0;){
var _bx=_bt[_6+=_bw];if(_bq?_bx===_G:_bx==_G){_P=_6;break;}}}if(!_br&&_P> -1)_P=_by(_1)[_P];}return _P;};var _by=_a.keys=function(_bz){var _P=[];if(!_bl(_bz))for(var _bg in _bz)_P.push(_bg);return _P;};_a.totalKeys=function(_bz){var _P=0;if(!_bl(_bz))for(var _bg in _bz)_P++;return _P;};var _bu=_a.values=values=function(_bz){if(_M(_bz))return _bz;var _P=[];if(!_bl(_bz))for(var _bg in _bz)_P.push(_bz[_bg]);return _P;};_a.meldKeysValues=function(_by,_bu){var _P={};for(var _bA= -1,_bB=Math.min(_by.length,_bu.length);++_bA<_bB;)_P[_by[_bA]]=_bu[_bA];return _P;};_a.min=function(_bz){return Math.min.apply(0,_bu(_bz));};_a.max=function(_bz){return Math.max.apply(0,_bu(_bz));};_a.reverseLookup=function(_bz,_u){var _bC=_t(_u);if(!_bl(_bz))for(var _bg in _bz)_bC[_bz[_bg]+'']=_bg;return _bC;};_a.lookup=function(_bu,_bD,_u){var _bC=_t(_u);if(arguments.length==1)_bD=_k;if(_bu!=_b){for(var _bE= -1,_bF=_bu.length;++_bE<_bF;)_bC[_bu[_bE]]=_bD;}return _bC;};var _v=_a.isObject=function(_G){return!!_G&&typeof _G==_d;};
var _A=_a.canExtend=function(_G){var _H=typeof _G;return!!_G&&(_H==_d||_H==_g);};var _Z=_a.isPlainObject=function(_G){var _bG=_G&&_G.constructor;return!!(_bG&&(_bG==Object||(typeof _bG.prototype.hasOwnProperty==_g&&_bG.prototype.hasOwnProperty('hasOwnProperty'))));};var _M=_a.isArray=function(_G){return _G instanceof Array||(!!_G&&_I(_G.splice));};var _bs=_a.isList=function(_G){return _v(_G)&&typeof _G.length==_e;};var _I=_a.isFunction=function(_G){var _J=_G!=_b&&_G.constructor;return!!(_J&&_J==_J.constructor);};_a.isNumber=function(_G){return typeof _G==_e&&_G===_G;};var _bl=_a.isString=function(_G){return typeof _G==_c;};_a.isBoolean=function(_G){return typeof _G==_f;};_a.isNully=function(_G){return _G==_b;};var _bH=_a.isPrimitive=function(_G){if(_G==_b)return _j;var _H=typeof _G;return _H==_c||_H==_e||_H==_f;};var _bb=_a.isRegExp=function(_G){return _n.call(_G)=='[object RegExp]';};_a.isIn=function(_1,_G,_bq){return _a.indexIn(_1,_G,_j,_bq)!== -1;};_a.isEmpty=function(_bz){
if(_v(_bz)&&_v(_bz=_bz.valueOf())){if(_M(_bz))return!_bz.length;for(var _bg in _bz)return _j;return _k;}return!_bz;};_a.isNaN=function(_G){return _G!==_G;};_a.isSameAs=function(_G,_bI){return _G===_bI||(_G!==_G&&_bI!==_bI);};_a.emptyOut=function(_1){if(_v(_1)){if(_M(_1)){_1.length=0;}else{for(var _Q in _1)delete _1[_Q];}}return _1;};var _bJ=_a.recordMatches=function(_bK,_bL){if(!_bK)return!_bL;if(_I(_bL))return _bL(_bK);for(var _V in _bL){if(_bK[_V]!==_bL[_V])return _j;}return _k;};var _bM=_a.toNumber=function(_G,_bN){if(typeof _G==_e){if(_G==_G)return _G;}else{if(_I(_G))_G=_G();if(_v(_G))_G=_G.valueOf();}return((_G=_G==_b||_G===''||_G!==_G|| !_bH(_G)?NaN: +_G)!=_G&&arguments.length>1?_bN:_G);};_a.findRecordNo=function(_bO,_bL,_bP){for(var _bQ= -1,_bR=_bO?_bO.length:0;++_bQ<_bR;)if(_bJ(_bO[_bQ],_bL))return _bQ;return _R(_bM(_bP,-1),-1,_bR-1);};_a.findRecord=function(_bO,_bL,_bP){var _bQ=_a.findRecordNo(_bO,_bL,_bP);return _bQ> -1?_bO[_bQ]:null;};var _bS=_a.getClass=function(_bT){return(_bT==_b?_b
:typeof _bT==_g?_bT:_bT.constructor);};_a.getGuid=function(){return'uizeGuid'+_o++;};var _bU=_a.getPathToLibrary=function(_bV,_bW){if(typeof document!='undefined'&&document.getElementsByTagName){for(var _bX= -1,_bY=document.getElementsByTagName('SCRIPT'),_bZ=_bY.length,_b0,_b1;++_bX<_bZ;){if((_b1=(_b0=_bY[_bX].src).indexOf(_bV))> -1)return(_bW?_b0.replace(_bV,_bW):_b0.slice(0,_b0.lastIndexOf('/',_b1)+1));}}return'';};var _b2=_a.globalEval=new _h('toEval','return eval (toEval)');var _b3=_a.isInstance=function(_G){return!!(typeof _G==_d&&_G&&_G.constructor.subclass);};_a.nop=new _h;_a.returnFalse=new _h('return false');_a.returnTrue=new _h('return true');_a.returnX=new _h('x','return x');var _b4=function(){var _b5=this;_b5._b6={};_b5._b7={};_b5._b8={};},_b9=_b4.prototype;_b9.done=function(_ca,_P){var _b5=this,_b8=_b5._b8[_ca];_b5._b6[_ca]=_m;_b5._b7[_ca]=_P;if(_b8){delete _b5._b8[_ca];for(var _cb= -1,_cc=_b8.length;++_cb<_cc;)_b8[_cb](_P);}};_b9.once=function(_cd,_ce){var _b5=this;if(_bs(_cd)&&_cd.length<2)
_cd=_cd[0];if(_cd==_b){_ce();}else if(_bs(_cd)){var _cf=[],_cg=_cd.length,_ch=0;_0(_cd,function(_ca,_ci){_b5.once(_ca,function(_P){_cf[_ci]=_P;(++_ch==_cg)&&_ce.apply(0,_cf);});});}else{_b5._b6[_cd]==_m?_ce(_b5._b7[_cd]):(_b5._b8[_cd]||(_b5._b8[_cd]=[])).push(_ce);}};var _cj='[#modulePath]',_ck={},_cl={},_cm={},_cn=new _b4();var _co=_a.getModuleByName=function(_cp){var _cq;return(_ck[_cp]||(_cp=='*'&&_ck)||((_cq=(new _h('try {return '+_cp+'} catch (e) {}'))())&&(_ck[_cp]=_cq)));};var _cr=_a.resolveModuleDefinition=function(_cs){var _ct=_cs.name=_cs.name||'',_cu=_cs.host=_ct.substr(0,_ct.lastIndexOf('.')),_cv=_cs.superclass=_cs.superclass||_cu,_cw=_cs.required;_cw=_cs.required=_bl(_cw)?_cw.split(','):_cw||[];_cu&&_cw.push(_cu);_cv!=_cu&&_cw.push(_cv);return _cs;};_a.require=function(_cx,_cy){if(typeof _cx==_c)_cx=[_cx];_cy&&_cn.once(_cx,_cy);_0(_cx,function(_cq){if(_cm[_cq]!=_m){_cm[_cq]=_m;_a.moduleLoader(_cq,function(_cz){_cz&&_b2(_cz)})}});};_a.module=function(_cs){var _ct=_cr(_cs).name;
if(!_ct||_cl[_ct]!=_m){_cl[_ct]=_cm[_ct]=_m;_a.require(_cs.required,function(){var _cq=(_cs.builder||_a.nop)(_co(_cs.superclass));_ct&&(new _h('m',_ct+'=m'))(_cq=_ck[_ct]=_cq||function(){});if(_I(_cq)){_cq.moduleName=_ct;if(!_cq.subclass)_cq.toString=function(){var _b5=this,_cp=_bS(_b5).moduleName,_cA=_b5.subclass;return('['+(_b3(_b5)||(!_cA&& !_cp)?_d:_cA?'class':'package')+' '+(_cp||'Function')+']');};}_cn.done(_ct,_cq);});}};_a.module({name:'Uize',builder:function(){return _a}});_a.moduleLoader=function(_cB,_cy){var _cC=document.createElement('script');_cC.async=true;_cC.type='text/javascript';_cC.src=_a.moduleUrlResolver(_cB);(_q||(_q=document.getElementsByTagName('HEAD')[0])).appendChild(_cC);};_a.moduleUrlResolver=function(_cp){return _a.moduleUrlTemplate.replace(_cj,_cp+'.js');};_a.pairUp=function(_cD){var _P={},_bj=arguments.length==1&&_M(_cD)?_cD:arguments,_cE=_bj.length;if(_cE<3){_P[_bj[0]]=_bj[1];}else{for(var _cF= -2;(_cF+=2)<_cE;)_P[_bj[_cF]]=_bj[_cF+1];}return _P;};
var _cG=_a.escapeRegExpLiteral=function(_cH){return _cH.replace(/([\^\$\|\{\}\[\]\(\)\?\.\*\+\\])/g,'\\$1');};_a.substituteInto=function(_1,_cI,_cJ){if(!(_1=_1==_b?'':_1+'')||_cI==_b)return _1;if(_bH(_cI))_cI=[_cI];var _cK=(_cJ||'[#KEY]').split('KEY'),_cL=[];for(var _cM in _cI)_cL.push(_cG(_cM));return _1.replace(new RegExp(_cG(_cK[0])+'('+_cL.join('|')+')'+_cG(_cK[1]),'g'),function(_cN,_cM){return _cI[_cM]+''});};_a.noNew=function(_J){var _cO;function _cP(){if(_cO){_cO=_j;return this;}else{var _b5=this;if(_b5==_b||_b5.constructor!=_cP){_cO=_k;_b5=new _cP;}_J.apply(_b5,arguments);return _b5;}}return _cP;};_a.now=new _h('return '+(Date.now?'Date.now()':'+new Date'));_a.moduleName='Uize';_a.moduleUrlTemplate=_bU('Uize.js',_cj);_a.pathToResources=_bU('Uize.js');return _a;})();