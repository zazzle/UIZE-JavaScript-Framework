/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Widget.Tree.List.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Tree.List',required:['Uize.Node','Uize.Tooltip','Uize.Xml'],builder:function(d_a){var d_b,d_c=true,d_d=false,d_e=Uize.pathToResources+'Uize_Widget_Tree_List/',d_f=Uize.Node,d_g=Uize.Tooltip,d_h=Uize.Xml.toAttributeValue;var d_i=d_a.subclass(),d_j=d_i.prototype;d_j.setItemExpanded=function(d_k,d_l){var d_m=this;if(d_m.isWired){var d_n=d_m.getItemFromSpecifier(d_k);d_m.displayNode(d_k+'Children',d_n.expanded=typeof d_l=='boolean'?d_l:d_n.expanded===d_d);d_m.setNodeProperties(d_k+'Toggler',{src:d_m.d_o(d_n),title:d_m.d_p(d_n)});}else{d_a.prototype.setItemExpanded.call(d_m,d_k,d_l);}};d_j.d_o=function(d_n){return d_e+this.d_q+'-'+(d_n.expanded===d_d?'collapsed':'expanded')+'.gif';};d_j.d_p=function(d_n){return'Click to '+(d_n.expanded===d_d?'expand':'collapse');};d_j.wireUi=function(){var d_m=this;if(!d_m.isWired){var d_r=d_m.d_r;d_m.traverseTree({itemHandler:function(d_n,d_k){d_r&&d_m.wireNode(d_k+'TitleLink',{mouseover:function(){var d_s=Uize.Node.getById(d_r);if(d_s){var d_t,
d_u=d_m.d_u;if(d_u){d_t=d_u.call(d_m,d_n);}else{var d_v=d_n.description;if(d_v)d_t=d_h(d_v);}if(d_t){d_f.setInnerHtml(d_s,d_t);d_g.showTooltip(d_s,d_c);d_m.fire({name:'After Show Tooltip',item:d_n});}}},mouseout:function(){d_g.showTooltip(d_m.d_r,d_d);d_m.fire({name:'After Hide Tooltip',item:d_n});}});},beforeSubItemsHandler:function(d_n,d_k){d_m.wireNode([d_k+'TogglerLink',!d_n.link||d_m.d_w?(d_k+'TitleLink'):d_b],{click:function(d_x){if(d_x.shiftKey||d_x.ctrlKey||d_x.metaKey){d_m.setExpandedDepth(d_m.getItemFromSpecifier(d_k).expanded!==d_d?0:(d_x.shiftKey?1:1000),d_k);d_x.cancelBubble=d_c;}else{d_m.setItemExpanded(d_k);}},focus:function(){this.blur()}});}});d_a.prototype.wireUi.call(d_m);}};d_i.registerProperties({d_y:{name:'alwaysLinkHeadings',value:d_d},d_z:{name:'iconBgColor',value:'#aaa'},d_q:{name:'iconTheme',value:'arrows'},d_A:{name:'levelClasses',value:[]},d_w:{name:'linksAlwaysToggleExpanded',value:d_d},d_B:{name:'spaceBeforeText',value:7},d_r:'tooltip',d_u:'tooltipTemplate'});d_i.set({html:{
process:function(input){var d_m=this,d_C=[],d_D=input.idPrefix,d_E=d_i.getBlankImageUrl(),d_F='<img src="'+d_E+'" class="divider" align="center"/>',d_G='style="'+(input.iconBgColor?('background:'+input.iconBgColor+'; '):'')+'width:9px; height:9px;"',d_A=input.levelClasses,d_H=d_A.length-1;d_m.traverseTree({itemHandler:function(d_n,d_k,d_I){var d_J=d_n.link,d_K=d_i.itemHasChildren(d_n),d_L='<img src="'+d_E+'" width="'+(d_I*(10+input.spaceBeforeText))+'" height="10"/>',d_M=d_A[Math.min(d_I,d_H)];d_C.push('<nobr>'+d_L+(d_i.itemIsDivider(d_n)?d_F:('<span style="width:10px; height:10px; padding-right:'+input.spaceBeforeText+'px;">'+(d_K?('<a id="'+d_D+'-'+d_k+'TogglerLink" href="javascript://"><img id="'+d_D+'-'+d_k+'Toggler" src="'+d_m.d_o(d_n)+'" '+d_G+' border="0" title="'+d_m.d_p(d_n)+'"/></a>'):'<img src="'+d_e+input.iconTheme+'-bullet.gif" '+d_G+'"/>')+'</span>'+(d_J||(d_K&&input.alwaysLinkHeadings)?('<a id="'+d_D+'-'+d_k+'TitleLink" class="'+d_M+'" href="'+(d_J||'javascript://')+'">'+d_n.title+'</a>')
:('<span class="'+d_M+'">'+d_n.title+'</span>'))))+'</nobr><br/>');},beforeSubItemsHandler:function(d_n,d_k){d_C.push('<span id="'+d_D+'-'+d_k+'Children" style="display:'+(d_n.expanded!==d_d?'block':'none')+';">');},afterSubItemsHandler:function(){d_C.push('</span>\n')}});return d_C.join('');}}});return d_i;}});