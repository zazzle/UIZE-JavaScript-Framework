/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Util.Coupler.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Util.Coupler',superclass:'Uize.Class',builder:function(b_a){var b_b={};var b_c=b_a.subclass(),b_d=b_c.prototype;function b_e(){var b_f=this,b_g=b_f.b_g;if(b_g){for(var b_h= -1,b_i=b_g.length,b_j;++b_h<b_i;)(b_j=b_g[b_h]).b_k.unwire(b_j.b_l,b_j.b_m);b_g=b_f.b_g=null;}if(b_f.b_n){var b_o=b_f.b_o,b_p=b_f.b_p;if(b_o&&b_p){Uize.callOn(b_o,'set',[b_o[0].get(b_p)]);var b_q=b_p.length,b_r=b_p.concat().sort()+'',b_s=b_b[b_r];if(!b_s){var b_t=['if (target.UIZE_UTIL_COUPLER_driver) return;'];if(b_q>1){b_t.push('var properties, changedMap = eventObj.properties;');for(var b_u= -1;++b_u<b_q;){var b_v='\''+b_p[b_u]+'\'';b_t.push('if ('+b_v+' in changedMap) (properties || (properties = {})) ['+b_v+'] = changedMap ['+b_v+'];');}b_t.push('if (!properties) return;');}else{var b_v='\''+b_p[0]+'\'';b_t.push('var properties = {'+b_v+':eventObj.source.get ('+b_v+')};');}b_t.push('var source = eventObj.source;','source.UIZE_UTIL_COUPLER_driver = 1;','target.set (properties);',
'delete source.UIZE_UTIL_COUPLER_driver;');b_s=b_b[b_r]=new Function('eventObj','target',b_t.join(''));}b_g=b_f.b_g=[];var b_l='Changed.'+(b_q>1?'*':b_p[0]);function b_w(b_x,b_y){var b_m=function(b_z){b_s(b_z,b_y)};b_g.push({b_k:b_x,b_l:b_l,b_m:b_m});b_x.wire(b_l,b_m);}for(var b_A= -1,b_B=b_o.length;++b_A<b_o.length;)b_w(b_o[b_A],b_o[(b_A+1)%b_B]);}}}b_c.registerProperties({b_n:{name:'coupled',onChange:b_e,value:true},b_o:{name:'instances',onChange:b_e},b_p:{name:'properties',onChange:b_e}});return b_c;}});