/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeSite.Build.FileBuilders.IndexPages.Appendixes Package
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
		The =UizeSite.Build.FileBuilders.IndexPages.Appendixes= module defines a file builder for the appendixes index page of the UIZE Web site.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'UizeSite.Build.FileBuilders.IndexPages.Appendixes',
	required:'UizeSite.Build.FileBuilders.IndexPages',
	builder:function () {
		'use strict';

		return UizeSite.Build.FileBuilders.IndexPages.getIndexPageUrlHandler (
			'Appendixes index page',
			'appendixes',
			'appendixes',
			'appendixes',
			/(\.simple|\.html\.jst)$/
		);
	}
});

