/*
	UIZE JAVASCRIPT FRAMEWORK 2011-12-03

	http://www.uize.com/reference/Uize.Tooltip.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Tooltip',required:['Uize.Node','Uize.Fade'],builder:function(){var _a=function(){},_b=true,_c=false,_d,_e=Uize.Node;var _f=Uize.getGuid(),_g=[],_h,_i=16;function _j(_k){return _e.getById(Uize.isFunction(_k)?_k():_k);}function _l(){_m()}function _n(_o){if(_o!=_h){if(_o){if(_h){_p.stop();_q();}if(!_o._r){_e.wire(document.body,'scroll',_l,_f);_e.wire(document.documentElement,'mousemove',_l,_f);}_h=_o;_e.setStyle(_h._s,{position:'absolute',zIndex:5000,left:-50000,top:-50000});_e.display(_h._s);_m();}else{_p.get('duration')>0?_p.start():_q();}}else if(_o){_p.stop();_e.setOpacity(_h._s,1);}}_a.showTooltip=function(_k,_t,_r){if(_k=_j(_k)){if(_t!==_c){_g.push({_s:_k,_r:_r});}else{for(var _u=_g.length;--_u> -1;)if(_g[_u]._s==_k)break;_u> -1&&_g.splice(_u,1);}_n(_g[_g.length-1]);}};_a.hideTooltip=function(_k){_a.showTooltip(_k,_c)};var _m=_a.positionTooltip=function(_k,_v){_h&&(_k===_d?(_k=_h._s):_h._s==_j(_k))&&_e.setAbsPos(_k,_e.getEventAbsPos(_v),_i);};
var _p=_a.fade=new Uize.Fade({duration:0});function _q(){_h._r||_e.unwireEventsByOwnerId(_f);_e.display(_h._s,_c);_e.setOpacity(_h._s,1);_h=null;}_p.wire({'Changed.value':function(){_e.setOpacity(_h._s,1-_p.get('progress'))},Done:_q});return _a;}});