/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Widget.Scrolly.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Scrolly',required:['Uize.Fade','Uize.Widget.Button'],builder:function(c_a){var c_b=true,c_c=false;var c_d=c_a.subclass(function(){var c_e=this;c_e.fade=Uize.Fade({duration:400,curve:Uize.Fade.celeration(0,1),quantization:1});c_e.fade.wire('Changed.value',function(){c_e.isWired&&c_e.setNodeProperties('view',c_e.fade.valueOf());});},function(){var c_e=this;function c_f(c_g,c_h,c_i){c_e.c_j(c_g,function(c_k){var c_l=c_k.domEvent.shiftKey?Infinity:1,c_m={};if(c_h)c_m.c_n=c_e.c_n+c_h*c_l;if(c_i)c_m.c_o=c_e.c_o+c_i*c_l;c_e.set(c_m);})}c_f('left',-1,0);c_f('right',1,0);c_f('up',0,-1);c_f('down',0,1);}),c_p=c_d.prototype;c_p.c_j=Uize.Widget.Button.addChildButton;c_p.c_q=function(c_r,c_s,c_t){var c_e=this;c_e.isWired&&c_e.displayNode([c_e.children[c_s].getNode(),c_e.children[c_t].getNode()],c_e.c_u||c_e.get('isScrollable'+c_r));};c_p.c_v=function(c_w){if(this.isWired){var c_x=this.getNode('view'),c_y=c_w=='X'?'Width':'Height';this.set('maxPage'+c_w,c_x?Math.max(
Math.ceil(c_x['scroll'+c_y]/c_x['offset'+c_y])-1,0):0);}};c_p.c_z=function(c_A,c_w){this.c_v(c_w);return(Uize.isNumber(c_A= +c_A)?Uize.constrain(c_A,0,this.get('maxPage'+c_w)||0):this.get('page'+c_w));};c_p.c_B=function(c_w){var c_C=this.get('page'+c_w),c_D=this.children;function c_E(c_g,c_F){var c_G=c_D[c_g];c_G&&c_G.set({enabled:c_F?'inherit':c_c});}c_E(c_w=='X'?'left':'up',c_C);c_E(c_w=='X'?'right':'down',(this.get('maxPage'+c_w)-c_C+1||2)>1);};c_p.updateUi=function(){this.c_v('X');this.c_v('Y');};function c_H(){var c_e=this;if(c_e.isWired){var c_x=c_e.getNode('view');c_e.fade.start({startValue:{scrollLeft:c_x.scrollLeft,scrollTop:c_x.scrollTop},endValue:{scrollLeft:c_e.c_n*c_x.offsetWidth,scrollTop:c_e.c_o*c_x.offsetHeight}});}}function c_I(){this.c_B('X')}function c_J(){this.c_B('Y')}function c_K(){this.c_q('X','left','right')}function c_L(){this.c_q('Y','up','down')}c_d.registerProperties({c_M:{name:'isScrollableX',onChange:c_K,value:c_c},c_N:{name:'isScrollableY',onChange:c_L,value:c_c},c_O:{
name:'maxPageX',onChange:[function(){this.set({c_M:(this.c_O+1||2)>1});},c_I]},c_P:{name:'maxPageY',onChange:[function(){this.set({c_N:(this.c_P+1||2)>1});},c_J]},c_n:{name:'pageX',conformer:function(c_Q){return this.c_z(c_Q,'X')},onChange:[c_H,c_I],value:0},c_o:{name:'pageY',conformer:function(c_Q){return this.c_z(c_Q,'Y')},onChange:[c_H,c_J],value:0},c_u:{name:'showButtonsWhenNotScrollable',onChange:[c_K,c_L],value:c_b}});return c_d;}});