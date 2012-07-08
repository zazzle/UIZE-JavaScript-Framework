/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Node.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Node',required:'Uize.Class',builder:function(){var _a=function(){},_b,_c='string',_d='object',_e='function',_f=true,_g=false,_h=null,_i='hidden',_j=Uize,_k=_j.copyInto,_l=_j.isPrimitive,_m=_j.returnFalse;var _n=typeof navigator!='undefined',_o=_n?navigator:{userAgent:'',appName:''},_p=_o.userAgent.toLowerCase(),_q=_o.appName=='Microsoft Internet Explorer',_r={TABLE:_f,THEAD:_f,TFOOT:_f,TBODY:_f,TR:_f,COL:_f,COLGRPUP:_f,FRAMESET:_f,HEAD:_f,HTML:_f,STYLE:_f,TITLE:_f},_s=_p.indexOf('applewebkit')> -1,_t=_p.indexOf('gecko')> -1,_u=_p.indexOf('opera')> -1,_v=_t||_u,_w= +(_q&&(_p.match(/MSIE\s*(\d+)/i)||[0,0])[1]),_x=_q&&_w<9,_y=_a._y={},_z={},_A=0,_B={clientX:0,clientY:0,pageX:0,pageY:0};var _C=_a._C=function(_D){_B.clientX=_D.clientX;_B.clientY=_D.clientY;_B.pageX=_D.pageX;_B.pageY=_D.pageY;};function _E(_F){var _G=document.getElementById(_F);return(!_q||(_G&&_G.id==_F))?_G:_h;}function _H(){return document[_s?'body':'documentElement'];}function _I(_J){
var _K=(_J=_J+'').slice(_J.indexOf('(')+1,_J.indexOf(')'));return Function.apply({},(_K?_K.split(','):[]).concat(_J.slice(_J.indexOf('{')+1,_J.lastIndexOf('}'))));}function _L(_M){if(_M.charCodeAt(0)==111&&_M.charCodeAt(1)==110)_M=_M.slice(2);return(_M.charCodeAt(_M.length-1)==41&&_a.VirtualEvent?_a.VirtualEvent.resolve(_M):_M);}var _N='table-',_O=_N+'row',_P=_N+'cell',_Q=_k({SPAN:'inline',THEAD:_N+'header-group',TFOOT:_N+'footer-group',LI:'list-item'},_q&&typeof DOMImplementation=='undefined'?_h:{TABLE:'table',TR:_O,TH:_P,TD:_P,TBODY:_O+'-group',COLGROUP:_N+'column-group',COL:_N+'column',CAPTION:_N+'caption'});_a.display=function(_R,_S){_S=_S===_b|| !!_S;_T(_R,function(_U){_U.style.display=_S?(_Q[_U.tagName]||'block'):'none';});};var _T=_a.doForAll=function(_R,_J,_V,_W){if(typeof _R==_c)_R=_X(_R,_V,_W);if(_R!=_b){if(_Y(_R)){_J(_R);}else{var _Z=typeof _R;if((_Z==_d||_Z==_e)&&typeof _R.length=='number'){for(var _0= -1,_1=_R.length;++_0<_1;)_T(_R[_0],_J,_V,_W);}else if(_Z==_d){for(var _2 in _R)
_T(_R[_2],_J,_V,_W);}}}};var _3=_a.doRectanglesOverlap=function(_4,_5,_6,_7,_8,_9,_ba,_bb){return(_6-1+ +_4>=_8&&_ba-1+ +_8>=_4&&_7-1+ +_5>=_9&&_bb-1+ +_9>=_5);};var _X=_a.getById=function(_U,_V,_W){if(typeof _U!=_c)return _U;var _G=_W?_W[_U]:_b;if(_G===_b){var _bc=_bd(_V,_U);(_G=_E(_bc))||(((_G=document.getElementsByName(_bc)).length<2)&&(_G=_G[0]||_h));if(_W)_W[_U]=_G;}return _G;};_a.find=function(_be){if(typeof _be!=_d|| !_be||typeof _be.length=='number'||_Y(_be))return _be;var _bf=document,_bg=[],_bh=_k({},_be),_bi='root'in _bh?_X(_bh.root):_bf;delete _bh.root;if(_bi){var _bj=_bh.tagName;if('id'in _bh&&_l(_bh.id)){var _U=_E(_bh.id);_U&&_bg.push(_U);delete _bh.id;}else if('name'in _bh&&_l(_bh.name)){_bg=_bf.getElementsByName(_bh.name);delete _bh.name;}else{var _bk=_l(_bj);_bk&&delete _bh.tagName;_bg=_bi.getElementsByTagName(_bj&&_bk?_bj:'*');_bi=_h;}if(_bi==_bf)_bi=_h;if(!_bj||_bj=='*')delete _bh.tagName;}var _bl=_bg.length;for(var _bm in _bh)break;if(!_bl||(_bm==_b&& !_bi))return _bg;var _bn=[],_bo;
for(var _bp= -1;++_bp<_bl;){var _U=_bg[_bp];if(_bo=_bi?_bq(_U,_bi):_f){for(var _br in _bh){var _bs=_U[_br],_bt=_bh[_br],_bu=_j.isFunction;if(!(_l(_bt)?_bs==_bt:(_bt instanceof RegExp?_bt.test(_bs||''):(_bu(_bt)?_bt.call(_U,_bs):_f)))){_bo=_g;break;}}}_bo&&_bn.push(_U);}return _bn;};var _bv=_a.getCoords=function(_U){var _bw=0,_bx=0,_by=0,_bz=0,_bA=_f,_bB=100,_bC=_H(),_bD=_bE(window);function _bF(){_bw+=_bC.scrollLeft;_bx+=_bC.scrollTop;}if(_U==window){_bF();_by=_bD.width;_bz=_bD.height;}else if(_Y(_U=_X(_U))){_by=_U.offsetWidth;_bz=_U.offsetHeight;if(!(_by&&_bz)&&_U.tagName=='DIV'){for(var _bG=_U.childNodes,_bH=_bG.length;--_bH>=0;){if(_bG[_bH].nodeName.charAt(0)!='#'){var _bI=_bv(_bG[_bH]);if(_bI.width||_bI.height){_by=Math.max(_by,_bI.right-_bw+1);_bz=Math.max(_bz,_bI.bottom-_bx+1);}}}}function _bJ(_U){return _bK(_U,'display')=='none'||_bK(_U,'visibility')==_i;}if(_U.tagName=='A'&&_U.childNodes.length==1&&_U.childNodes[0].tagName=='IMG')_U=_U.childNodes[0];var _bL=_bA= !_bJ(_U),_bM=_U,_bN=_U,_bO=_bD.width,
_bP=_bD.height,_bQ=_bC.scrollLeft,_bR=_bC.scrollTop,_bS=_bQ+_bO,_bT=_bR+_bP;while(_bN.parentNode&&typeof _bN.parentNode!='unknown'){var _bU=_bN.offsetLeft||0,_bV=_bN.offsetTop||0,_bW=_bN.offsetWidth,_bX=_bN.offsetHeight;if(_bA&&_bJ(_bN))_bA=_g;if(_bN==_bM){_bw+=_bU+(parseInt(_bK(_bN,'borderLeftWidth'))||0);_bx+=_bV+(parseInt(_bK(_bN,'borderTopWidth'))||0);_bM=_bN.offsetParent;_bK(_bN,'position')=='fixed'&&_bF();}if(_bN!=_U&&_bN!=document.body&&_bN!=document.documentElement&&(_bN.scrollWidth>_bW||_bN.scrollHeight>_bX)){_bw-=_bN.scrollLeft;_bx-=_bN.scrollTop;if(_q){_bw+=_bN.clientLeft;_bx+=_bN.clientTop;}if(_bA)_bA=_3(_bw,_bx,_by,_bz,_bU,_bV,_bW,_bX);}_bN=_bN.parentNode;}if(_bA)_bA=_3(_bw,_bx,_by,_bz,_bQ,_bR,_bO,_bP);_bB=_bA?((Math.min(_bw+_by,_bS)-Math.min(Math.max(_bw,_bQ),_bS))*(Math.min(_bx+_bz,_bT)-Math.min(Math.max(_bx,_bR),_bT)))/(_by*_bz)*100:0;}return{x:_bw,y:_bx,width:_by,height:_bz,area:_by*_bz,left:_bw,top:_bx,right:_bw+_by-1,bottom:_bx+_bz-1,seen:_bA,percentSeen:_bB};};
var _bE=_a.getDimensions=function(_U){if(_U==window){var _bC=document.documentElement;return{width:_bC.clientWidth||window.innerWidth||_bC.offsetWidth,height:_bC.clientHeight||window.innerHeight||_bC.offsetHeight};}else if(_U=_X(_U)){return{width:_U.offsetWidth||parseInt(_bK(_U,'width'))||0,height:_U.offsetHeight||parseInt(_bK(_U,'height'))||0};}else{return{width:0,height:0};}};var _bY={borderColor:['border','Color'],borderWidth:['border','Width'],padding:1,margin:1},_bK=_a.getStyle=function(_U,_bZ){var _b0=typeof _bZ==_c,_b1=_b0?'':{};if(_U=_X(_U)){if(_b0){var _b2=_q&&_bZ=='opacity',_b3=document.defaultView,_b4=_b3&&_b3.getComputedStyle(_U,'');if(_b2)_bZ='filter';if(_b4){if(!(_b1=_b4[_bZ])){var _b5=_bY[_bZ];if(_b5){var _b6=_b5[0]||_bZ,_b7=_b5[1]||'',_b8=_b4[_b6+'Top'+_b7],_b9=_b4[_b6+'Right'+_b7],_ca=_b4[_b6+'Bottom'+_b7],_cb=_b4[_b6+'Left'+_b7];_b1=_b8==_b9&&_b9==_ca&&_ca==_cb?_cb:_b8+' '+_b9+' '+_ca+' '+_cb;}}}else{var _cc=_U.currentStyle;_b1=_cc?_cc.getAttribute(_bZ):_U.style[_bZ];}if(_b2){
var _cd=(_b1||'').match(/alpha\s*\(\s*opacity\s*=([^\)]*)\)/i);_b1=_cd?_cd[1]/100:1;}}else{for(_bZ in _bZ)_b1[_bZ]=_bK(_U,_bZ);}}return _b1;};var _ce=_a.getText=function(_U){var _cf='';if(_U=_X(_U)){function _cg(_U){if(typeof _U.innerText==_c){_cf+=_U.innerText.replace(/\r|\n|\r\n/g,'');}else if(typeof _U.textContent==_c){_cf+=_U.textContent;}else{if(_U.nodeType==3)_cf+=_U.data;_U.childNodes&&_j.forEach(_U.childNodes,_cg);}}_cg(_U);}return _cf;};_a.getValue=function(_U){var _b1;if(_U=_X(_U)){if(_Y(_U)){var _ch=_U.tagName;if(_ch=='TEXTAREA'){_b1=_U.value;}else if(_ch=='INPUT'){_b1=_U.type=='checkbox'?_U.checked:_U.value;}else if(_ch=='SELECT'){if(_U.multiple){_b1=[];_j.forEach(_U.options,function(_ci){_ci.selected&&_b1.push(_ci.value)});}else{_b1=_U.value;}}else if(_ch=='IMG'){_b1=_U.src;}else{_b1=_U.innerHTML.replace(/<br\/?>/gi,'\n').replace(/&nbsp;/g,' ');}}else{_b1=(_j.findRecord(_U,{tagName:'INPUT',type:'radio',checked:_f})||{}).value;}}return _b1;};_a.injectHtml=function(_R,_cj,_ck){var
 _cl,_cm,_cn,_co,_cp,_cq,_cr=_j.isArray(_cj)||(_Y(_cj)&&(_cj=[_cj]));((_cl=_ck=='inner replace')||(_cm=_ck=='outer replace')||(_cn=_ck=='inner top')||(_co=_ck=='outer top')||(_cp=_ck=='outer bottom')||(_cq=_f));_cr||(_cj+='');_T(_R,function(_U){var _cs=_U.childNodes;function _ct(_cu){return _cu&&/<script/i.test(_cu)}function _cv(){return _ct(_cj)}if((_cl||(!_cs.length&&(_cn||_cq)))&& !_Y&& !_cv()){_U.innerHTML=_cj;}else if(_cm&&_q&& !_Y&& !_cv()){_U.outerHTML=_cj;}else{if(_cl)if(_q&&_r[_U.tagName]){var _cw=_U.cloneNode();_U.replaceNode(_cw);_U=_cw;}else _U.innerHTML='';if(_cr){var _cx=[];for(var _bp= -1,_cy=_cj.length;++_bp<_cy;)_cx.push(_cj[_bp].cloneNode(_f));}else{var _cz=document.createElement('DIV');_cz.innerHTML='<i>e</i>'+_cj;var _cx=_cz.childNodes}var _cA=_cn?_cs[0]:_cp?_U.nextSibling:_U,_cB=_U.parentNode,_cC= +!_cr;function _cD(_U){if(_U.tagName=='SCRIPT'){var _cE=document.createElement('script');if(_U.id)_cE.id=_U.id;if(_U.type)_cE.type=_U.type;_cE.text=_U.text;if(_U.src)_cE.src=_U.src;
_U.parentNode.replaceChild(_cE,_U);}else if(_ct(_U.innerHTML)){_j.forEach(_U.childNodes,_cD);}}while(_cx.length>_cC){var _cF=_cr?_cx.shift():_cx[_cC];if(_cq||_cl){_U.appendChild(_cF);}else if(_cn){_cA?_U.insertBefore(_cF,_cA):_U.appendChild(_cF);}else if(_co||_cm){_cB.insertBefore(_cF,_cA);}else if(_cp){_cA?_cB.insertBefore(_cF,_cA):_cB.appendChild(_cF);}_cr||_cD(_cF);}_cm&&_cB.removeChild(_U);}});};var _Y=_a.isNode=function(_U){return!!(_U&&typeof _U==_d&&(_U.getAttribute||_U.documentElement||(_U.self&&_U.self==_U)));};var _bq=_a.isOnNodeTree=function(_U,_cG){_U=_X(_U);_cG=_X(_cG);while(_U){if(_U==_cG)return _f;_U=_U.parentNode;}return _g;};var _bd=_a.joinIdPrefixAndNodeId=function(_V,_F){return(_V||'')+(_V&&_F?'-':'')+_F;};_a.remove=function(_R){_T(_R,function(_U){_U.parentNode.removeChild(_U)});};_a.setClipRect=function(_R,_b8,_b9,_ca,_cb){var _cH='rect('+_b8+'px, '+_b9+'px, '+_ca+'px, '+_cb+'px)';_T(_R,function(_U){_U.style.clip=_cH});};var _cI=['left','top','width','height'];
_a.setCoords=function(_R,_cJ){_cK(_R,_j.isArray(_cJ)?_j.meldKeysValues(_cI,_cJ):_cJ);};_a.centerInWindow=function(_R){var _cL=_bv(window);_T(_R,function(_U){var _cM=_bE(_U);_a.setCoords(_U,{left:_cL.x+((_cL.width-_cM.width)>>1),top:_cL.y+((_cL.height-_cM.height)>>1)});});};_a.getEventAbsPos=function(_cN){var _cO=(_cN||(_cN=_B)).targetTouches;if(_cO&&_cO.length)_cN=_cO[0];if(_cN.pageX!=_b){return{left:_cN.pageX,top:_cN.pageY};}else{var _bC=_H();return{left:_cN.clientX+_bC.scrollLeft,top:_cN.clientY+_bC.scrollTop};}};var _cP=_a.setAbsPos=function(_R,_cQ,_cR){_cR=typeof _cR=='number'?{x:_cR,y:_cR}:(_cR||{x:0,y:0});var _bC=document[_s?'body':'documentElement'],_cS=_bE(window);_T(_R,function(_U){function _cT(_cU,_cV,_cW,_cX){var _cY=_cQ[_cU],_cZ=_cR[_cX],_c0=_cY-_bC[_cV],_c1=_cZ+_cM[_cW];return(_cY+(_c0+_c1>_cS[_cW]?Math.max(-_c1,-_c0):_cZ));}var _cM=_bE(_U);_cK(_U,{left:_cT('left','scrollLeft','width','x'),top:_cT('top','scrollTop','height','y'),right:'auto',bottom:'auto'});});};
_a.setAbsPosAdjacentTo=function(_R,_c2,_c3){_c2=_X(_c2);var _c4=_bv(_c2),_c5=_c4.width/2,_c6=_c4.height/2,_c7=_c3=='x'? -1:1;if(!_c5&& !_c6)_c4=_a.getEventAbsPos();_T(_R,function(_U){_cP(_U,{left:_c4.left+_c5,top:_c4.top+_c6},{x:-_c5*_c7,y:_c6*_c7});});};_a.setInnerHtml=function(_R,_cu){_cu+='';_T(_R,function(_U){_U.innerHTML=_cu});};var _c8={};_a.setOpacity=function(_R,_c9){_c8.opacity=_c9;_cK(_R,_c8);};_a.setProperties=function(_R,_be){_T(_R,function(_U){_k(_U,_be)});};var _cK=_a.setStyle=function(_R,_be){_T(_R,function(_U){var _da=_U.style,_db;if(_q&&'opacity'in _be)_da.filter=(_db=Math.round(_be.opacity*100))<100?'alpha(opacity='+_db+')':'';for(var _bZ in _be)_da[_bZ]=(typeof(_db=_be[_bZ])==_d&&_db?(_db=_db.valueOf()):_db)!=_b?(typeof _db=='number'&&_bZ!='opacity'&&_bZ!='zIndex'?Math.round(_db)+'px':_db+''):'';});};_a.setValue=function(_R,_b1){_b1+='';_T(_R,function(_U){var _ch=_U.tagName,_dc=_U.readOnly;if(_dc)_U.readOnly=_g;if(_ch=='TEXTAREA'){_U.value=_b1;}else if(_ch=='INPUT'){var _dd=_U.type;
if(_dd=='text'||_dd==_i||_dd=='password'){_U.value=_b1;}else if(_dd=='checkbox'){_U.checked=_b1=='true';}else if(_dd=='radio'){_U.checked=_U.value==_b1;}}else if(_ch=='SELECT'){if(!_b1){_U.selectedIndex= -1;}else{var _de=_U.options;if(_U.multiple&&(_b1=='*'||_b1.indexOf(',')> -1)){var _df=_b1!='*'?_j.lookup(_b1.split(',')):_b;for(var _dg=_de.length,_ci;--_dg>=0;)(_ci=_de[_dg]).selected= !_df||_df[_ci.value];}else{_U.selectedIndex=_j.findRecordNo(_de,{value:_b1},_U.selectedIndex);}}}else if(_ch=='IMG'){if(_b1)_U.src=_b1;}else{_ch=='PRE'&&_q?(_U.innerText=_b1):(_U.innerHTML=_b1.replace(/</g,'&lt;').replace(/\n/g,'<br/>'));}if(_dc)_U.readOnly=_dc;});};_a.show=function(_R,_dh){_cK(_R,{visibility:_dh||_dh===_b?'inherit':_i});};_a.showClickable=function(_R,_di){_cK(_R,{cursor:_di||_di===_b?(_x?'hand':'pointer'):'default'});};var _dj=_a.unwire=function(_R,_dk,_dl,_dm){if(typeof _dk==_d&&_dk&& !_dk.virtualDomEvent){for(var _M in _dk)_dj(_R,_M,_dk[_M],_dl);}else{_a.unwireEventsByOwnerId(_dm,_R!==_b||_dk!=_b||_dl!=_b
?{node:_R,eventName:_dk,handler:_dl}:_b);}};_a.unwireEventsByOwnerId=function(_dn,_do){var _dp=_z[_dn=_dn||''];if(_dp){function _dq(_dr){if(_dr!==_h){var _ds=_do&&_do.eventName,_dt=_do&&_do.handler,_du=_dr||_ds||_dt;if(_ds&&_ds.charCodeAt)_ds=_L(_ds);for(var _dv=_dp.length;--_dv>=0;){var _dw=_dp[_dv],_dx=_y[_dw],_U=_dx._U,_M=_dx._M;if(!_du||((!_dr||_dr==(_dx._dy||_U))&&(!_ds||_ds==_M)&&(!_dt||_dt==_dx._dz))){_du&&_dp.splice(_dv,1);if(_dx._dA){_a.unwireEventsByOwnerId(_dx._dA)}else{try{_U==window?_dB.unwire(_M,_dx._dC):_q?_U.detachEvent('on'+_M,_dx._dC):_U.removeEventListener(_M,_dx._dC,_g);}catch(_dD){}}delete _y[_dw];}}(_du&&_dp.length)||delete _z[_dn];}}_do&&_do.node!==_b?_T(_do.node,_dq):_dq();}};var _dE=_I(function(_dw){return(function(_D){var _dx=window.Uize&&Uize.Node._y[_dw];return _dx&&_dx._dz.call(_dx._U,_D.windowEvent);});}),_dF=_I(function(_dw){return(function(_D){var _dx=window.Uize&&Uize.Node._y[_dw];return _dx&&_dx._dz.call(_dx._U,_D||window.event);});}),_dG={click:_dF,mouseover:_I(
function(_dw){return(function(_D){var _dx=window.Uize&&Uize.Node._y[_dw],_dH=(_D||(_D=window.event)).fromElement||_D.relatedTarget;if(_dx){if(_dH){try{if(!_dH.Uize_Widget_Drag_shield&& !Uize.Node.isOnNodeTree(_dH,_dx._U))_dH=null;}catch(_dD){_dH=null;}}if(!_dH){Uize.Node._C(_D);return _dx._dz.call(_dx._U,_D);}}});}),mouseout:_I(function(_dw){return(function(_D){var _dx=window.Uize&&Uize.Node._y[_dw],_dI=(_D||(_D=window.event)).toElement||_D.relatedTarget;if(_dx){if(_dI){try{if(!_dI.Uize_Widget_Drag_shield&& !Uize.Node.isOnNodeTree(_dI,_dx._U))_dI=null;}catch(_dD){_dI=null;}}if(!_dI)return _dx._dz.call(_dx._U,_D);}});}),mousedown:_dF,mouseup:_dF};_a.wire=function(_R,_M,_dz,_dn){if(!_M)return;if(_dn==_b)_dn='';var _dJ;if(_M.charCodeAt)_M=_L(_M);if(typeof _M==_d&& !(_dJ= !!_M.virtualDomEvent)){_dn=arguments[2]||'';for(var _D in _M)_a.wire(_R,_D,_M[_D],_dn);return;}_T(_R,function(_U){var _ch=_U.tagName;(_z[_dn]||(_z[_dn]=[])).push(_A);var _dC=(_dJ?_m:_U==window?_dE:_dG[_M]||_dF)(_A);var _dx=_y[_A++]={_U:_U,_M:_M,
_dz:_dz,_dC:_dC};if(_v&&_ch=='BODY'&&_M=='scroll'){_dx._dy=_U;_U=_dx._U=document;}if(_dC){var _dK='on'+_M;_U==window?_dB.wire(_M,_dC):_q?_U.attachEvent(_dK,_dC):_U.addEventListener(_M,_dC,_g);if(_ch=='A'&&(_M=='mousedown'||_M=='click')&& !_U[_dK])_U[_dK]=_m;}else if(_dJ){_M.wire(_U,_dz,_dx._dA=_j.getGuid());}});};_a.ieMajorVersion=_w;_a.isIe=_q;_a.isSafari=_s;_a.isMozilla=_t;if(_n){_a.wire(document.documentElement,'mousemove',_C);var _dB=Uize.Class(),_dL=setTimeout(function(){_dB.fire('load')},15000);_j.forEach(['focus','blur','load','beforeunload','unload','resize','scroll'],function(_dM){var _dN='on'+_dM,_dO=window[_dN]||_m;window[_dN]=function(_D){_dM=='load'&&clearTimeout(_dL);_dO.call(window,_D||(_D=window.event));_dB.fire({name:_dM,windowEvent:_D});};});}_a.returnFalse=_m;_a.returnTrue=_j.returnTrue;return _a;}});