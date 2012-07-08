/*
	UIZE JAVASCRIPT FRAMEWORK 2012-07-08

	http://www.uize.com/reference/Uize.Test.Uize.Array.Dupes.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Test.Uize.Array.Dupes',builder:function(){var c_a={},c_b={},c_c={},c_d=[],c_e=[],c_f=[],c_g=function(){},c_h=function(){},c_i=function(){};return Uize.Test.declare({title:'Uize.Array.Dupes Module Test',test:[Uize.Test.requiredModulesTest('Uize.Array.Dupes'),Uize.Test.staticMethodsTest([['Uize.Array.Dupes.dedupe',[['Test that multiple duplicate number values are removed, and that non-duplicate values are not removed',[[1,2,NaN,1,1,2,2,NaN,NaN,Infinity]],[1,2,NaN,Infinity]],['Test that multiple duplicate string values are removed, and that non-duplicate values are not removed',[['foo','bar','foo','foo','bar','bar','hello']],['foo','bar','hello']],['Test that multiple duplicate boolean values are removed, and that non-duplicate values are not removed',[[false,false,false,true]],[false,true]],['Test that multiple duplicate undefined values are removed',[[undefined,undefined,undefined]],[undefined]],['Test that multiple duplicate undefined values are removed',[[null,null,null]],[null]],{
title:'Test that multiple duplicate object values are removed, and that non-duplicate values are not removed',test:function(){return this.expect([c_a,c_b,c_c],Uize.Array.Dupes.dedupe([c_a,c_b,c_a,c_a,c_b,c_b,c_c]));}},{title:'Test that multiple duplicate array values are removed, and that non-duplicate values are not removed',test:function(){return this.expect([c_d,c_e,c_f],Uize.Array.Dupes.dedupe([c_d,c_e,c_d,c_d,c_e,c_e,c_f]));}},{title:'Test that multiple duplicate function values are removed, and that non-duplicate values are not removed',test:function(){return this.expect([c_g,c_h,c_i],Uize.Array.Dupes.dedupe([c_g,c_h,c_g,c_g,c_h,c_h,c_i]));}},{title:'Test that all value types can be present in the source array and duplicates of each type are removed correctly',test:function(){return this.expect([undefined,null,NaN,1,true,'foo',c_a,c_d,c_g],Uize.Array.Dupes.dedupe([undefined,undefined,undefined,null,null,null,NaN,NaN,NaN,1,1,1,true,true,true,'foo','foo','foo',c_a,c_a,c_a,c_d,c_d,c_d,c_g,c_g,c_g]));}},
['Test that string serializations of number values are not considered duplicates of those number values',[[1,'1',-1,'-1',NaN,'NaN',Infinity,'Infinity']],[1,'1',-1,'-1',NaN,'NaN',Infinity,'Infinity']],['Test that string serializations of boolean values are not considered duplicates of those boolean values',[[false,'false',true,'true']],[false,'false',true,'true']],['Test that strings serializations of the values null and undefined are not considered duplicates of those values',[[null,'null',undefined,'undefined']],[null,'null',undefined,'undefined']],['Test that the optional canonicalizer parameter is observed correctly',[['hello','world','Hello','HELLO','World','WORLD','foo'],function(c_j){return c_j.toLowerCase()}],['hello','world','foo']]],null,{cloneArguments:true}],['Uize.Array.Dupes.removeValues',[{title:'',test:function(){var c_k=[2,1,2,true,false,true,'bye','hi','bye',c_b,c_a,c_b,c_e,c_d,c_e,c_h,c_g,c_h,null,null,null,undefined,undefined,undefined],c_l=Uize.Array.Dupes.removeValues(c_k,
[2,true,'bye',c_b,c_e,c_h,null,undefined]);return(this.expect(6,c_l.length)&&this.expect(1,c_l[0])&&this.expect(false,c_l[1])&&this.expect('hi',c_l[2])&&this.expectSameAs(c_a,c_l[3])&&this.expectSameAs(c_d,c_l[4])&&this.expectSameAs(c_g,c_l[5]));}}]]])]});}});