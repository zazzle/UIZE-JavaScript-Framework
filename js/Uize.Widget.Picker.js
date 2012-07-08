/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Widget.Picker.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Picker',superclass:'Uize.Widget.FormElement',required:['Uize.Widget.Button.ValueDisplay','Uize.Node.Event'],builder:function(d_a){var d_b=null;var d_c=d_a.subclass(d_b,function(){var d_d=this;function d_e(){d_d.set({focused:false});var d_f=d_d.getMooringNode(),d_g=Uize.Node.getDimensions(d_f);function d_h(){d_d.d_i&&d_d.set({focused:true})}d_d.callInherited('useDialog')({component:d_d.d_j?Uize.copyInto(d_d.d_j,{value:d_d.get('value')}):d_b,widgetClassName:d_d.d_k,widgetProperties:Uize.copyInto({name:d_d.d_l||'dialog'+d_d.d_k.replace(/\./g,''),picker:d_d,mooringNode:d_f,offsetX:d_g.width>>1,offsetY:d_g.height>>1},d_d.getDialogWidgetProperties(),d_d.get((d_d.d_m||[]).concat('value'))),submitHandler:function(d_n,d_o){d_d.handleDialogSubmit(d_n);d_o&&d_o.keepOpen||d_h();},dismissHandler:d_h});}d_d.wire('Changed.focused',function(){d_d.get('focused')&& !d_d.d_i&&d_e()});d_d.wireNode('input','mousedown',function(d_o){if(!d_d.d_i){Uize.Node.Event.abort(d_o);d_e();}});d_d.addChild(
'selector',d_d.d_p||Uize.Widget.Button.ValueDisplay,d_d.d_q).wire('Click',d_e);}),d_r=d_c.prototype;d_r.getDialogWidgetProperties=function(){return d_b};d_r.getMooringNode=function(){return this.children.selector.getNode()||this.getNode('input')};d_r.handleDialogSubmit=function(d_n){var d_d=this,d_s=d_n.value,d_t=d_n.valueDetails,d_u;d_d.set(Uize.copyInto({},d_t!==d_u?{valueDetails:d_t}:d_u,d_s!==d_u?({value:d_s!=d_b?(d_d.d_v?d_d.d_v.call(d_d,d_s):d_s):''}):d_u));};d_c.registerProperties({d_i:{name:'allowManualEntry',value:true},d_j:'dialogComponent',d_l:'dialogName',d_k:'dialogWidgetClass',d_m:'pipedProperties',d_p:'selectorButtonWidgetClass',d_q:'selectorButtonWidgetProperties',d_t:{name:'valueDetails',onChange:function(){var d_w=this.children.selector;d_w&&d_w.set({valueDetails:this.d_t});}},d_v:'valueFormatter'});d_c.set({value:d_b});return d_c;}});