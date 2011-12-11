/*
	UIZE JAVASCRIPT FRAMEWORK 2011-12-03

	http://www.uize.com/reference/Uize.Widget.ColorCube.Draggable.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.ColorCube.Draggable',required:['Uize.Node','Uize.Widget.Drag','Uize.Color'],builder:function(d_a){var d_b=true,d_c=false,d_d=Uize.Node;var d_e=new Uize.Color;var d_f=d_a.subclass(),d_g=d_f.prototype;function d_h(d_i,d_j,d_k){var d_l=d_i.colorTopLeft.tuple,d_m=d_i.colorTopRight.tuple,d_n=d_i.colorBottomLeft.tuple,d_o=d_i.colorBottomRight.tuple;function d_p(d_q){function d_r(d_s,d_t,d_u){return d_s+(d_t-d_s)*d_u;}return(d_r(d_r(d_l[d_q],d_m[d_q],d_j),d_r(d_n[d_q],d_o[d_q],d_j),d_k));}d_e.encoding=d_i.colorTopLeft.encoding;Uize.Color.setTuple(d_e.tuple,d_p(0),d_p(1),d_p(2));return d_e.to();}d_g.wireUi=function(){var d_v=this;if(!d_v.isWired){var d_w=d_v.getNode(),d_x=new Uize.Widget.Drag({node:d_w}),d_y=['Left','Right'],d_z=['Top','Bottom'],d_A=d_x.eventStartPos,d_B=d_x.eventDeltaPos,d_C=d_x.eventPos,d_D,d_E,d_F={};d_d.showClickable(d_w);d_x.wire({'Drag Start':function(d_G){d_v.set({d_H:d_b});d_D=d_d.getCoords(d_w);d_E=[d_D.left,d_D.top,d_D.right,d_D.bottom];function d_I(d_J){(
d_F[d_J]||(d_F[d_J]=new Uize.Color)).from(d_v.get(d_J));}d_I('colorTopLeft');d_I('colorTopRight');d_I('colorBottomLeft');d_I('colorBottomRight');},'Drag Update':function(d_G){var d_K=[],d_L={},d_M={},d_N=[];function d_O(d_P){d_N[d_P]=d_B[d_P]>0?0:1;var d_Q=d_E[d_N[d_P]*2+d_P],d_R=d_N[d_P],d_S=1-d_R;d_K[d_R*2+d_P]=d_R;d_K[d_S*2+d_P]=d_R+(d_S-d_R)*(d_C[d_P]-d_Q)/(d_A[d_P]-d_Q);}d_O(0);d_O(1);function d_T(d_U,d_V){var d_W='color'+d_z[d_V]+d_y[d_U];d_L[d_W]=d_U==d_N[0]&&d_V==d_N[1]?d_F[d_W].to():d_h(d_F,(d_U-d_K[0])/(d_K[2]-d_K[0]),(d_V-d_K[1])/(d_K[3]-d_K[1]));}d_T(0,0);d_T(0,1);d_T(1,0);d_T(1,1);d_v.set(d_L);d_v.fire('Colors Changed');},'Drag Done':function(){d_v.set({d_H:d_c})}});d_v.addChild('drag',d_x);d_a.prototype.wireUi.call(d_v);}};d_f.registerProperties({d_H:{name:'inDrag',value:d_c}});return d_f;}});