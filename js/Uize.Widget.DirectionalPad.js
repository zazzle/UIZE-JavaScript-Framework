/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Widget.DirectionalPad.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.DirectionalPad',required:'Uize.Widget.Button',builder:function(c_a){var c_b={north:'North',south:'South',east:'East',west:'West',northeast:'Northeast',northwest:'Northwest',southeast:'Southeast',southwest:'Southwest',northEdge:'NorthEdge',southEdge:'SouthEdge',eastEdge:'EastEdge',westEdge:'WestEdge',northeastEdge:'NortheastEdge',southeastEdge:'SoutheastEdge',northwestEdge:'NorthwestEdge',southwestEdge:'SouthwestEdge',center:'Center'},c_c={north:1,south:1,east:1,west:1},c_d=c_a.subclass(function(){var c_e=this;for(var c_f in c_b)c_e.c_g(c_f);}),c_h=c_d.prototype;c_h.c_g=Uize.Widget.Button.addChildButton;c_h.c_i=function(){var c_e=this;if(c_e.isWired){var c_j=c_e.children;for(var c_k in c_j)c_j[c_k].displayNode('',c_e.c_l=='full'||c_k in c_c);}};c_h.c_m=function(){var c_e=this,c_j=c_e.children,c_n=c_e.get('enabled');if(typeof c_n=='object'){var c_o=c_n.defaultValue===undefined||c_n.defaultValue,c_j=c_e.children,c_p;for(c_p in c_j){var c_q=c_p in c_n;
(c_q||c_o!==undefined)&&c_j[c_p].set({enabled:c_q?c_n[c_p]:c_o});}}else Uize.callOn(c_j,'set',[{enabled:c_n}]);};c_h.wireUi=function(){var c_e=this;if(!c_e.isWired){c_e.wire('Changed.enabled',function(){c_e.c_m()});c_a.prototype.wireUi.call(c_e);}};c_h.updateUi=function(){var c_e=this;if(c_e.isWired){c_a.prototype.updateUi.call(c_e);c_e.c_i();c_e.c_m();}};c_d.registerProperties({c_l:{name:'mode',onChange:c_h.c_i,value:'full'}});return c_d;}});