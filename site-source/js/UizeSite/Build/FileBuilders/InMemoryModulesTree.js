/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeSite.Build.FileBuilders.InMemoryModulesTree Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2012-2015 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Package
	importance: 5
	codeCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =UizeSite.Build.FileBuilders.InMemoryModulesTree= module defines a file builder for the in-memory modules tree object for the UIZE Web site.

		*DEVELOPERS:* `Chris van Rensburg`

		Functions defined in the file builder are called as instance methods on an instance of a subclass of the =Uize.Services.FileBuilderAdapter= class, so the functions can access instance methods implemented in this class.
*/

Uize.module ({
	name:'UizeSite.Build.FileBuilders.InMemoryModulesTree',
	required:[
		'Uize.Data.PathsTree',
		'Uize.Build.Util'
	],
	builder:function () {
		'use strict';

		return Uize.package ({
			description:'In-memory modules tree object',
			urlMatcher:function (_urlParts) {
				return _urlParts.pathname == this.memoryUrl ('modules-tree');
			},
			builder:function () {
				return Uize.Data.PathsTree.fromList (Uize.Build.Util.getJsModules (this.params),'.');
			}
		});
	}
});

