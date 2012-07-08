/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Widget.Bar.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Bar',required:'Uize.Node',builder:function(c_a){var c_b,c_c=true,c_d=false,c_e=Uize.Node;var c_f=c_a.subclass(),c_g=c_f.prototype;c_g.c_h=function(c_i){var c_j=this,c_k=c_j.c_l==c_b?c_j.c_k:c_j.c_l,c_m=c_j.c_m;return(Uize.constrain(c_m?(c_k+Math.round((c_i-c_k)/c_m)*c_m):c_i,c_k,c_j.c_n==c_b?c_j.c_o:c_j.c_n));};c_g.c_p=function(){var c_j=this;if(c_j.isWired){var c_q=c_j.c_q,c_r=c_e.getDimensions(c_j.c_s),c_t=[c_r.width,c_r.height],c_u=c_j.c_u,c_v=c_e.getDimensions(c_u),c_w=[c_v.width,c_v.height],c_x=c_j.c_x,c_y=c_x(c_j.c_k),c_z=c_x(c_j.c_o),c_A=c_x(c_j.c_i),c_B=Math.round((c_A-c_y)/(c_z-c_y)*(c_t[c_q]-c_w[c_q])),c_C=c_q?c_t[1]-c_w[1]-c_B:c_B,c_D=Math.round(c_C+c_w[c_q]/2),c_i=Uize.isNumber(c_j.c_E)?c_j.c_i.toFixed(c_j.c_E):c_j.c_i;if(c_u){c_u.style[c_q?'top':'left']=c_C+'px';c_u.title=c_i;}c_j.c_F&&c_e.setClipRect(c_j.c_F,c_q?c_D:0,c_q?c_t[0]:c_D,c_t[1],0);c_j.c_G&&c_e.setClipRect(c_j.c_G,0,c_t[0],c_q?c_D:c_t[1],c_q?0:c_D);c_j.c_H&&c_e.setInnerHtml(c_j.c_H,Uize.isNumber(c_j.c_E)
?c_j.c_i.toFixed(c_j.c_E):c_j.c_i);}};c_g.updateUi=c_g.c_p;c_g.wireUi=function(){var c_j=this;if(!c_j.isWired){c_j.c_q=c_j.c_I=='vertical'?1:0;c_j.c_s=c_j.getNode('track');c_j.c_u=c_j.getNode('knob');c_j.c_F=c_j.getNode('full');c_j.c_G=c_j.getNode('empty');c_j.c_H=c_j.getNode('value');c_a.prototype.wireUi.call(c_j);}};c_f.presets={};function c_J(){var c_j=this;c_j.set({c_i:c_j.c_h(c_j.c_i)});c_j.c_p();}c_f.registerProperties({c_E:'decimalPlacesToDisplay',c_m:{name:'increments',onChange:c_J,value:1},c_l:{name:'minValidValue',onChange:c_J},c_k:{name:'minValue',onChange:c_J,value:0},c_n:{name:'maxValidValue',onChange:c_J},c_o:{name:'maxValue',onChange:c_J,value:100},c_I:{name:'orientation',value:'vertical'},c_x:{name:'scaleFunc',value:function(c_K){return c_K;}},c_i:{name:'value',conformer:c_g.c_h,onChange:c_g.c_p,value:0}});return c_f;}});