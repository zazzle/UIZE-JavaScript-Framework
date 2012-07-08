/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Widget.Bar.Slider.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Bar.Slider',required:['Uize.Node','Uize.Widget.Drag'],builder:function(d_a){var d_b=true,d_c=false,d_d=Uize.Node,d_e=Uize.Widget.Drag;var d_f=d_a.subclass(),d_g=d_f.prototype;d_g.d_h=function(){this.d_i=null;this.fire('Value Change After Rest');};d_g.d_j=function(d_k){var d_l=this,d_m= +d_l;d_l.set({value:d_k});if(+d_l!=d_m){if(d_l.isWired&&d_l.children.drag.get('inDrag')){if(d_l.d_i)clearTimeout(d_l.d_i);d_l.d_i=setTimeout(function(){d_l.d_h()},d_l.d_n);}else{d_l.d_h();}}};d_g.wireUi=function(){var d_l=this;if(!d_l.isWired){var d_o=d_l.getNode('track'),d_p=d_l.getNode('knob'),d_q,d_r,d_s,d_t,d_u,d_v=d_l.get('scaleFunc'),d_w=d_l.get('valueFunc');function d_x(){d_q=d_l.get('orientation')=='vertical'?1:0;d_r=d_d.getDimensions(d_o);d_s=[d_r.width,d_r.height];d_t=d_d.getDimensions(d_p);d_u=[d_t.width,d_t.height];}function d_y(d_z){var d_A=d_v(d_l.get('maxValue')),d_B=d_v(d_l.get('minValue'));return(d_z*(1-d_q*2)*(d_A-d_B)/(d_s[d_q]-d_u[d_q]));}var
 d_C=d_l.addChild('drag',d_e,{node:d_p}),d_D;d_C.wire({'Drag Start':function(){d_l.set({d_E:d_b});d_x();d_D= +d_l;},'Drag Update':function(){d_l.d_j(d_w(d_v(d_D)+d_y([d_C.eventDeltaPos[0],d_C.eventDeltaPos[1]][d_q])));},'Drag Done':function(){d_l.set({d_E:d_c});clearTimeout(d_l.d_i);d_l.d_i=null;d_l.d_h();}});function d_F(d_G){if(d_l.get('enabledInherited')){d_x();var d_H=d_d.getCoords(d_o),d_I=d_d.getEventAbsPos(d_G);d_l.d_j(d_w(d_v(d_l.get('minValue'))+d_y((d_q?d_I.top:d_I.left)-d_u[d_q]/2*(1-d_q*2)-(d_q?d_H.bottom:d_H.x))));return d_C.initiate(d_G);}}d_l.wireNode([d_o,'full','empty'],{mousedown:d_F,touchstart:d_F});d_a.prototype.wireUi.call(d_l);}};d_f.presets={};d_f.registerProperties({d_E:{name:'inDrag',value:d_c},d_n:{name:'restTime',value:250},d_w:{name:'valueFunc',value:function(d_J){return d_J}}});return d_f;}});