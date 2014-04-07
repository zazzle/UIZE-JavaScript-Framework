/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Data.Diff Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2014 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Test
	importance: 1
	codeCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.Uize.Data.Diff= module defines a suite of unit tests for the =Uize.Data.Diff= module.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Test.Uize.Data.Diff',
	required:'Uize.Test',
	builder:function () {
		'use strict';

		function _addedOrModifiedValuesPropertyComparer (_object1Property,_object2Property) {
			return (
				_object2Property && (!_object1Property || _object2Property.value !== _object1Property.value)
					? _object2Property
					: undefined
			);
		}

		function _addedPropertyComparer (_object1Property,_object2Property) {
			return !_object1Property && _object2Property ? {value:'added'} : undefined;
		}

		function _modifiedPropertyComparer (_object1Property,_object2Property) {
			return (
				_object1Property && _object2Property && _object1Property.value !== _object2Property.value
					? {value:'modified'}
					: undefined
			);
		}

		function _removedPropertyComparer (_object1Property,_object2Property) {
			return _object1Property && !_object2Property ? {value:'removed'} : undefined;
		}

		function _unmodifiedPropertyComparer (_object1Property,_object2Property) {
			return (
				_object1Property && _object2Property && _object1Property.value === _object2Property.value
					? {value:'unchanged'}
					: undefined
			);
		}

		return Uize.Test.resolve ({
			title:'Test for Uize.Data.Diff Module',
			test:[
				Uize.Test.requiredModulesTest ('Uize.Data.Diff'),
				Uize.Test.staticMethodsTest ([
					['Uize.Data.Diff.diff',[
						/*** test the default property comparer ***/
							['With the default property comparer, modified properties are marked by the value "modified"',
								[
									{foo:'bar'},
									{foo:'BAR'}
								],
								{foo:'modified'}
							],
							['With the default property comparer, added properties are marked by the value "added"',
								[
									{},
									{foo:'bar'}
								],
								{foo:'added'}
							],
							['With the default property comparer, removed properties are marked by the value "removed"',
								[
									{foo:'bar'},
									{}
								],
								{foo:'removed'}
							],
							['With the default property comparer, unmodified properties are marked by the value "unchanged"',
								[
									{foo:'bar'},
									{foo:'bar'}
								],
								{foo:'unchanged'}
							],
							['An arbitrarily complex data structure is diff\'ed correctly',
								[
									{
										prop1:'foo',
										prop2:'bar',
										prop4:{
											prop1:'foo',
											prop2:'bar'
										},
										prop6:{
											prop1:'foo',
											prop2:'bar',
											prop3:'baz'
										}
									},
									{
										prop1:'FOO',
										prop3:'bar',
										prop5:{
											prop1:'foo',
											prop2:'bar'
										},
										prop6:{
											prop1:'foo',
											prop2:'BAR',
											prop4:'qux'
										}
									}
								],
								{
									prop1:'modified',
									prop2:'removed',
									prop3:'added',
									prop4:{
										prop1:'removed',
										prop2:'removed'
									},
									prop5:{
										prop1:'added',
										prop2:'added'
									},
									prop6:{
										prop1:'unchanged',
										prop2:'modified',
										prop3:'removed',
										prop4:'added'
									}
								}
							],

						/*** test a custom added-or-modified property comparer ***/
							['With a custom added-or-modified property comparer, modified properties are marked by their new value',
								[
									{foo:'bar'},
									{foo:'BAR'},
									_addedOrModifiedValuesPropertyComparer
								],
								{foo:'BAR'}
							],
							['With a custom added-or-modified property comparer, added properties are marked by their new value',
								[
									{},
									{foo:'bar'},
									_addedOrModifiedValuesPropertyComparer
								],
								{foo:'bar'}
							],
							['With a custom added-or-modified property comparer, removed properties are omitted from the result',
								[
									{foo:'bar'},
									{},
									_addedOrModifiedValuesPropertyComparer
								],
								{}
							],
							['With a custom added-or-modified property comparer, unmodified properties are omitted from the result',
								[
									{foo:'bar'},
									{foo:'bar'},
									_addedOrModifiedValuesPropertyComparer
								],
								{}
							],

						/*** test a custom added property comparer ***/
							['With a custom added property comparer, modified properties are omitted from the result',
								[
									{foo:'bar'},
									{foo:'BAR'},
									_addedPropertyComparer
								],
								{}
							],
							['With a custom added property comparer, added properties are marked by the value "added"',
								[
									{},
									{foo:'bar'},
									_addedPropertyComparer
								],
								{foo:'added'}
							],
							['With a custom added property comparer, removed properties are omitted from the result',
								[
									{foo:'bar'},
									{},
									_addedPropertyComparer
								],
								{}
							],
							['With a custom added property comparer, unmodified properties are omitted from the result',
								[
									{foo:'bar'},
									{foo:'bar'},
									_addedPropertyComparer
								],
								{}
							],

						/*** test a custom modified property comparer ***/
							['With a custom modified property comparer, modified properties are marked by the value "modified"',
								[
									{foo:'bar'},
									{foo:'BAR'},
									_modifiedPropertyComparer
								],
								{foo:'modified'}
							],
							['With a custom modified property comparer, added properties are omitted from the result',
								[
									{},
									{foo:'bar'},
									_modifiedPropertyComparer
								],
								{}
							],
							['With a custom modified property comparer, removed properties are omitted from the result',
								[
									{foo:'bar'},
									{},
									_modifiedPropertyComparer
								],
								{}
							],
							['With a custom modified property comparer, unmodified properties are omitted from the result',
								[
									{foo:'bar'},
									{foo:'bar'},
									_modifiedPropertyComparer
								],
								{}
							],

						/*** test a custom removed property comparer ***/
							['With a custom removed property comparer, modified properties are omitted from the result',
								[
									{foo:'bar'},
									{foo:'BAR'},
									_removedPropertyComparer
								],
								{}
							],
							['With a custom removed property comparer, added properties are omitted from the result',
								[
									{},
									{foo:'bar'},
									_removedPropertyComparer
								],
								{}
							],
							['With a custom removed property comparer, removed properties are marked by the value "removed"',
								[
									{foo:'bar'},
									{},
									_removedPropertyComparer
								],
								{foo:'removed'}
							],
							['With a custom removed property comparer, unmodified properties are omitted from the result',
								[
									{foo:'bar'},
									{foo:'bar'},
									_removedPropertyComparer
								],
								{}
							],

						/*** test a custom unmodified property comparer ***/
							['With a custom unmodified property comparer, modified properties are omitted from the result',
								[
									{foo:'bar'},
									{foo:'BAR'},
									_unmodifiedPropertyComparer
								],
								{}
							],
							['With a custom unmodified property comparer, added properties are omitted from the result',
								[
									{},
									{foo:'bar'},
									_unmodifiedPropertyComparer
								],
								{}
							],
							['With a custom unmodified property comparer, removed properties are omitted from the result',
								[
									{foo:'bar'},
									{},
									_unmodifiedPropertyComparer
								],
								{}
							],
							['With a custom unmodified property comparer, unmodified properties are marked by the value "unchanged"',
								[
									{foo:'bar'},
									{foo:'bar'},
									_unmodifiedPropertyComparer
								],
								{foo:'unchanged'}
							]
					]]
				])
			]
		});
	}
});
