/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Widget.Collection.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Collection',required:['Uize.Widget.Button','Uize.Node.Event'],builder:function(c_a){var c_b=true,c_c=false,c_d=null,c_e;var c_f=c_a.subclass(function(){var c_g=this;c_g.c_h=0;c_g.c_i=c_g.itemWidgets=[];c_g.wire('Items Changed',function(){c_g.set({c_j:c_g.c_i.length});c_g.c_k();});},function(){var c_g=this;c_g.c_l('selectAll',function(){c_g.selectAll()},{affectedBy:['allSelected','totalItems','selectionMode','isEmpty'],stateEvaluator:function(){return(!this.c_m&& !this.c_n&&(this.c_o!='single'||this.c_j==1))}});c_g.c_l('selectNone',function(){c_g.selectAll(c_c)},'someSelected');c_g.c_l('remove',function(){c_g.c_p(c_g.c_q(),c_b)},'someSelected');}),c_r=c_f.prototype;c_r.c_l=c_r.addControlButton=function(c_s,c_t,c_u){var c_g=this,c_v=Uize.Widget.Button.addChildButton.call(c_g,c_s,c_t);if(typeof c_u=='string'&&(c_u=c_u.replace(' ',''))){var c_w=c_u.replace('!',''),c_x=c_u.charAt(0)=='!';c_u={affectedBy:c_w,stateEvaluator:function(){return c_g.get(c_w)!=c_x}};}if(c_u){
var c_y=c_u.affectedBy;if(typeof c_y=='string')c_y=[c_y];function c_z(){c_v.set({enabled:c_u.stateEvaluator.call(c_g)?'inherit':c_c});}Uize.forEach(c_y,function(c_A){c_g.wire('Changed.'+c_A,c_z)});c_z();};return c_v;};c_r.c_B=function(){this.fire('Items Changed')};c_r.c_k=function(){this.set({c_C:this.c_q().length});};c_r.c_D=function(){this.isWired&&this.setNodeValue('totalItems',this.c_j);};c_r.c_E=function(){var c_g=this;c_g.c_F(function(c_G){c_g.c_H(c_G)});c_g.c_i.length=0;};c_r.c_H=function(c_G){c_G.removeUi();c_G.kill();this.removeChild(c_G);};c_r.c_p=function(c_I,c_J){var c_g=this,c_K=c_I.length;if(c_K){function c_L(){c_g.remove(c_I,c_J)}if(c_J){c_g.confirm({message:c_g.localize(c_K==1?'removeItemConfirmation':'removeItemsConfirmation',{0:c_K,itemsToRemove:c_I}),title:c_g.localize(c_K==1?'removeItemConfirmationTitle':'removeItemsConfirmationTitle',{0:c_K,itemsToRemove:c_I}),yesHandler:c_L});}else{c_L();}}};c_r.addItemWidget=function(c_M,c_N){var c_g=this,c_G=c_g.addChild(c_M,c_g.c_O,
Uize.copyInto(c_N,c_g.getItemWidgetProperties()));c_g.wireItemWidget(c_G);c_g.c_i.push(c_G);c_g.isWired&&c_G.insertOrWireUi();return c_G;};c_r.wireItemWidget=function(c_G){var c_g=this;c_G.wire({'Changed.selected':function(){if(c_G.get('selected')){c_g.c_o=='single'&&c_g.selectAll(c_c,c_g.c_P=c_G);c_g.fire({name:'Item Selected',itemWidget:c_G});}else if(c_G==c_g.c_P)c_g.c_P=c_d;c_g.c_k();},'Click Selected':function(c_Q){var c_R=c_Q.domEvent,c_S=c_R&&c_R.shiftKey,c_T=(!c_S&&c_Q.forceToggle)||(c_R&&c_R.ctrlKey),c_U=c_T||c_S;c_U&&Uize.Node.Event.abort(c_R);if((c_g.c_o=='single'&& !(c_T&&c_G.get('selected')))|| !c_U){c_G.set({selected:c_b});c_g.selectAll(c_c,c_g.c_P=c_G);}else{c_S?c_g.selectRange(c_g.c_P,c_G):(c_g.c_P=c_G).toggle('selected');}},'Item Changed':function(){var c_V,c_i=c_g.c_i;for(var widgetNo= -1;++widgetNo<c_i.length;)if(c_i[widgetNo]==c_G)c_V=widgetNo;c_g.c_W[c_V]=Uize.clone(c_G.get('properties'));c_g.c_B()},Remove:function(c_Q){c_g.c_p(c_G.get('selected')&&c_g.c_X?c_g.c_q():[c_G],c_Q.byUser);}});
};c_r.forAll=c_r.c_F=function(c_Y){for(var c_Z= -1,c_i=this.c_i,c_0=c_i.length;++c_Z<c_0;){if(c_Y(c_i[c_Z],c_Z)===c_c)break;}};c_r.getItemWidgetProperties=function(){return this.c_1};c_r.makeItemWidgetName=function(c_2){var c_g=this;return((c_2&&c_g.c_3&&c_2[c_g.c_3])||(c_g.c_4+(c_g.c_i.length? ++c_g.c_h:c_g.c_h=0)));};c_r.getSelected=c_r.c_q=function(c_5){var c_6=[];this.c_F(function(c_G){c_G.get('selected')&&c_6.push(c_G)});return!c_6.length&&c_5?this.c_i.concat():c_6;};c_r.getPropertyForItems=function(c_w,c_i){return Uize.map(c_i,function(c_G){var c_7=c_G.get('properties');return c_w==c_e?c_7:c_7[c_w];});};c_r.getPropertyForSelected=function(c_w,c_5){return this.getPropertyForItems(c_w,this.c_q(c_5));};c_r.updateUi=function(){this.c_D()};c_r.remove=function(c_I,c_J){var c_g=this;function c_8(c_I,c_J){c_g.finishRemove(c_I,c_J);}c_g.fire({name:'Remove',itemWidgets:c_I,byUser:c_J,finishRemove:c_8}).handled||c_8(c_I,c_J);};c_r.finishRemove=function(c_I,c_J){var c_g=this,c_W=c_g.get('items'),
c_i=c_g.itemWidgets,c_0=c_i.length,c_9=c_I,c_ba=c_I.length;if(c_ba==c_0){c_g.c_E();c_W.length=0;}else{c_9=[];c_ba=0;var c_bb=c_d;c_g.forAll(function(c_G,c_Z){if(Uize.isIn(c_I,c_G)){c_bb=c_d;c_9.push(c_G);c_ba++;c_g.c_H(c_G,c_Z);}else{if(!c_bb&& !c_G.get('locked'))c_bb=c_G;if(c_ba){c_W[c_Z-c_ba]=c_W[c_Z];c_i[c_Z-c_ba]=c_G;}}});c_W.length=c_i.length=c_0-c_ba;}if(c_ba){c_g.fire({name:'Items Removed',byUser:c_J,totalBeforeRemove:c_0,itemWidgetsRemoved:c_9,totalRemoved:c_ba,percentRemoved:c_ba/c_0*100});c_g.c_B();}};c_r.selectAll=function(c_6,c_bc){if(!(c_6=c_6!==c_c)||this.c_o!='single'||this.c_j==1)this.c_F(function(c_G){c_G!==c_bc&&c_G.set({selected:c_6});});};c_r.selectRange=function(c_bd,c_be){var c_g=this;if(c_bd&&c_be&&(c_g.c_o=='multi'||c_bd==c_be)){var c_bf=c_c;c_g.c_F(function(c_G){var c_bg=c_G==c_bd||c_G==c_be;if(c_bg)c_bf= !c_bf;c_G.set({selected:c_bf||c_bg});});}};c_r.selectNone=function(){this.selectAll(c_c)};c_f.registerProperties({c_m:{name:'allSelected',value:c_c},c_n:{name:'isEmpty',value:c_b},
c_3:{name:'itemPropertyForItemWidgetName',value:'id'},c_X:{name:'itemRemoveActsOnSelection',value:c_c},c_W:{name:'items',value:[],onChange:function(){var c_g=this;c_g.c_E();Uize.forEach(c_g.c_W,function(c_2){c_g.addItemWidget(c_g.makeItemWidgetName(c_2),{properties:c_2})});c_g.c_B();}},c_O:'itemWidgetClass',c_4:{name:'itemWidgetNamePrefix',value:'item'},c_1:'itemWidgetProperties',c_bh:{name:'oneSelected',value:c_c},c_o:{name:'selectionMode',value:'multi'},c_bi:{name:'someSelected',value:c_c},c_j:{name:'totalItems',onChange:function(){this.set({c_n:!this.c_j});this.c_D();}},c_C:{name:'totalSelected',value:0,onChange:function(){var c_g=this,c_C=c_g.c_C;c_g.set({c_bh:c_C==1,c_bi:c_C>0,c_m:c_C>0&&c_C==c_g.c_j});}}});return c_f;}});