/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.String.Lines Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2013 UIZE
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
		The =Uize.Test.Uize.String.Lines= module defines unit tests to verify that the deprecated =Uize.String.Lines= module is still supported and is a reference to the newer =Uize.Str.Lines= module.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Test.Uize.String.Lines',
	required:'Uize.Str.Lines',
	builder:function () {
		'use strict';

		return Uize.Test.resolve ({
			title:'Test for Uize.String.Lines Module',
			test:[
				Uize.Test.requiredModulesTest ('Uize.String.Lines'),
				{
					title:'Test that the deprecated Uize.String.Lines module is simply a reference to the Uize.Str.Lines module',
					test:function () {
						return this.expectSameAs (Uize.Str.Lines,Uize.String.Lines);
					}
				}
			]
		});
	}
});

