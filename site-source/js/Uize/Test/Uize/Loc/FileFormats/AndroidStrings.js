/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Loc.FileFormats.AndroidStrings Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2014-2015 UIZE
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
		The =Uize.Test.Uize.Loc.FileFormats.AndroidStrings= module defines a suite of unit tests for the =Uize.Loc.FileFormats.AndroidStrings= module.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Test.Uize.Loc.FileFormats.AndroidStrings',
	builder:function () {
		'use strict';

		var
			/*** no strings ***/
				_stringsNoStrings = {},
				_fileNoStrings =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'</resources>\n',

			/*** one string ***/
				_stringsOneString = {
					foo:'bar'
				},
				_fileOneString =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<string name="foo">bar</string>\n' +
					'</resources>\n',

			/*** multiple strings ***/
				_stringsMultipleStrings = {
					foo:'bar',
					baz:'qux',
					hello:'world'
				},
				_fileMultipleStrings =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<string name="foo">bar</string>\n' +
					'	<string name="baz">qux</string>\n' +
					'	<string name="hello">world</string>\n' +
					'</resources>\n',

			/*** special characters ***/
				_stringsSpecialCharacters = {
					foo:'This string contains a \' (single quote), a " (double quote), a \r (carriage return), a \n (new line), and a \\ (backslash).'
				},
				_fileSpecialCharacters =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<string name="foo">This string contains a \\\' (single quote), a \\" (double quote), a \\r (carriage return), a \\n (new line), and a \\\\ (backslash).</string>\n' +
					'</resources>\n',

			/*** string arrays ***/
				_stringsStringArrays = {
					foo:[
						'foo string 1',
						'foo string 2',
						'foo string 3'
					],
					bar:[
						'bar string 1',
						'bar string 2'
					]
				},
				_fileStringArrays =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<string-array name="foo">\n' +
					'		<item>foo string 1</item>\n' +
					'		<item>foo string 2</item>\n' +
					'		<item>foo string 3</item>\n' +
					'	</string-array>\n' +
					'	<string-array name="bar">\n' +
					'		<item>bar string 1</item>\n' +
					'		<item>bar string 2</item>\n' +
					'	</string-array>\n' +
					'</resources>\n',

			/*** plural forms ***/
				_stringsPluralForms = {
					foo:{
						one:'Delete the selected file?',
						other:'Delete the selected {count} files?'
					}
				},
				_filePluralForms =
					'<?xml version="1.0" encoding="utf-8"?>\n' +
					'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
					'	<plurals name="foo">\n' +
					'		<item quantity="one">Delete the selected file?</item>\n' +
					'		<item quantity="other">Delete the selected {count} files?</item>\n' +
					'	</plurals>\n' +
					'</resources>\n'
		;

		return Uize.Test.resolve ({
			title:'Uize.Loc.FileFormats.AndroidStrings Module Test',
			test:[
				Uize.Test.requiredModulesTest ('Uize.Loc.FileFormats.AndroidStrings'),
				Uize.Test.staticMethodsTest ([
					['Uize.Loc.FileFormats.AndroidStrings.from',[
						['Parsing an empty resource strings file produces an empty strings object',
							_fileNoStrings,
							Uize.copy (_stringsNoStrings)
						],
						['Parsing a resource strings file containing just a single string tag produces a strings object with a single string entry',
							_fileOneString,
							Uize.clone (_stringsOneString)
						],
						['Parsing a resource strings file containing multiple string tags produces a strings object with entries for all the strings',
							_fileMultipleStrings,
							Uize.clone (_stringsMultipleStrings)
						],
						['Backslash-escaped double quote, single quote, "r", "n", and backslash characters inside strings are unescaped',
							_fileSpecialCharacters,
							Uize.clone (_stringsSpecialCharacters)
						],
						['A resource strings file may contain string arrays represented with the <string-array> tag, and such string array tags are parsed to string array values in the returned strings object',
							_fileStringArrays,
							Uize.clone (_stringsStringArrays)
						],
						['A resource strings file may contain strings with plural forms represented with the <plurals> tag, and such plural forms tags are parsed to object values in the returned strings object',
							_filePluralForms,
							Uize.clone (_stringsPluralForms)
						],

						/*** test support for enclosing values in quotes ***/
							['String values inside string tags can be enclosed in single or double quotes, and these quotes are not considered to be part of the value',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">\'This string is enclosed in single quotes.\'</string>\n' +
								'	<string name="bar">"This string is enclosed in double quotes."</string>\n' +
								'	<string-array name="baz">\n' +
								'		<item>\'This string is enclosed in single quotes.\'</item>\n' +
								'		<item>"This string is enclosed in double quotes."</item>\n' +
								'	</string-array>\n' +
								'	<plurals name="qux">\n' +
								'		<item quantity="one">\'Delete the selected file?\'</item>\n' +
								'		<item quantity="other">"Delete the selected {count} files?"</item>\n' +
								'	</plurals>\n' +
								'</resources>\n',
								{
									foo:'This string is enclosed in single quotes.',
									bar:'This string is enclosed in double quotes.',
									baz:[
										'This string is enclosed in single quotes.',
										'This string is enclosed in double quotes.',
									],
									qux:{
										one:'Delete the selected file?',
										other:'Delete the selected {count} files?'
									}
								}
							],

						/*** test special handling of limited HTML formatting tags and xliff:g tags ***/
							['A string tag may contain bold, underline, and italics HTML tags for inline formatting.',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains a <b>bolded</b> word, an <u>underlined</u> word, and an <i>italicized</i> sord.</string>\n' +
								'	<string-array name="bar">\n' +
								'		<item>This string contains a <b>bolded</b> word, an <u>underlined</u> word, and an <i>italicized</i> sord.</item>\n' +
								'	</string-array>\n' +
								'	<plurals name="baz">\n' +
								'		<item quantity="one">Delete the selected <b>file</b>?</item>\n' +
								'		<item quantity="other">Delete the selected {count} <u>files</u>?</item>\n' +
								'	</plurals>\n' +
								'</resources>\n',
								{
									foo:'This string contains a <b>bolded</b> word, an <u>underlined</u> word, and an <i>italicized</i> sord.',
									bar:[
										'This string contains a <b>bolded</b> word, an <u>underlined</u> word, and an <i>italicized</i> sord.'
									],
									baz:{
										one:'Delete the selected <b>file</b>?',
										other:'Delete the selected {count} <u>files</u>?'
									}
								}
							],
							['Bold, underline, and italics HTML tags inside a string tag may be nested inside one another.',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains a section that is <i><u><b>bolded, underlined, and italicized</b></u></i>.</string>\n' +
								'	<string-array name="bar">\n' +
								'		<item>This string contains a section that is <i><u><b>bolded, underlined, and italicized</b></u></i>.</item>\n' +
								'	</string-array>\n' +
								'	<plurals name="baz">\n' +
								'		<item quantity="one">Delete the selected <i><u><b>file</b></u></i>?</item>\n' +
								'		<item quantity="other">Delete the selected {count} <b><i><u>files</u></i></b>?</item>\n' +
								'	</plurals>\n' +
								'</resources>\n',
								{
									foo:'This string contains a section that is <i><u><b>bolded, underlined, and italicized</b></u></i>.',
									bar:[
										'This string contains a section that is <i><u><b>bolded, underlined, and italicized</b></u></i>.'
									],
									baz:{
										one:'Delete the selected <i><u><b>file</b></u></i>?',
										other:'Delete the selected {count} <b><i><u>files</u></i></b>?'
									}
								}
							],
							['A string tag may contain xliff:g tags to denote native code sequences, and the contents of these tags are treated as literal text.',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains an xliff:g tag for a <xliff:g id="someId1">{{nativeCodeSequence}}</xliff:g>.</string>\n' +
								'	<string name="bar">This string two xliff:g tags: <xliff:g id="someId2">{{nativeCodeSequence1}}</xliff:g> and <xliff:g id="someId3">[#nativeCodeSequence2#]</xliff:g>.</string>\n' +
								'	<string-array name="baz">\n' +
								'		<item>This string two xliff:g tags: <xliff:g id="someId4">{{nativeCodeSequence1}}</xliff:g> and <xliff:g id="someId5">[#nativeCodeSequence2#]</xliff:g>.</item>\n' +
								'	</string-array>\n' +
								'	<plurals name="qux">\n' +
								'		<item quantity="one">Delete the selected file?</item>\n' +
								'		<item quantity="other">Delete the selected <xliff:g id="someId6">{count}</xliff:g> files?</item>\n' +
								'	</plurals>\n' +
								'</resources>\n',
								{
									foo:'This string contains an xliff:g tag for a {{nativeCodeSequence}}.',
									bar:'This string two xliff:g tags: {{nativeCodeSequence1}} and [#nativeCodeSequence2#].',
									baz:[
										'This string two xliff:g tags: {{nativeCodeSequence1}} and [#nativeCodeSequence2#].'
									],
									qux:{
										one:'Delete the selected file?',
										other:'Delete the selected {count} files?'
									}
								}
							],
							['A string tag may contain xliff:g tags that are wrapped in bold, underline, and italics HTML tags',
								'<?xml version="1.0" encoding="utf-8"?>\n' +
								'<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">\n' +
								'	<string name="foo">This string contains an xliff:g tag for a <i><u><b><xliff:g id="someId1">{{nativeCodeSequence}}</xliff:g></b></u></i> that is wrapped in the supported HTML formatting tags.</string>\n' +
								'	<string-array name="bar">\n' +
								'		<item>This string contains an xliff:g tag for a <i><u><b><xliff:g id="someId2">{{nativeCodeSequence}}</xliff:g></b></u></i> that is wrapped in the supported HTML formatting tags.</item>\n' +
								'	</string-array>\n' +
								'	<plurals name="qux">\n' +
								'		<item quantity="one">Delete the selected file?</item>\n' +
								'		<item quantity="other">Delete the selected <i><u><b><xliff:g id="someId3">{count}</xliff:g></b></u></i> files?</item>\n' +
								'	</plurals>\n' +
								'</resources>\n',
								{
									foo:'This string contains an xliff:g tag for a <i><u><b>{{nativeCodeSequence}}</b></u></i> that is wrapped in the supported HTML formatting tags.',
									bar:[
										'This string contains an xliff:g tag for a <i><u><b>{{nativeCodeSequence}}</b></u></i> that is wrapped in the supported HTML formatting tags.'
									],
									qux:{
										one:'Delete the selected file?',
										other:'Delete the selected <i><u><b>{count}</b></u></i> files?'
									}
								}
							]
					]],
					['Uize.Loc.FileFormats.AndroidStrings.to',[
						['Serializing an empty strings object produces a valid resource strings file containing no string nodes',
							Uize.copy (_stringsNoStrings),
							_fileNoStrings
						],
						['Serializing a strings object with a single string entry produces a resource strings file containing just a single string tag',
							Uize.clone (_stringsOneString),
							_fileOneString
						],
						['Serializing a strings object with multiple string entries produces a resource strings file containing string tags for all the strings',
							Uize.clone (_stringsMultipleStrings),
							_fileMultipleStrings
						],
						['Double quote, single quote, carriage return, new line, and backslash characters inside strings are escaped with backslashes, to satisfy the idiosyncratic requirements of the Android resource file format',
							Uize.clone (_stringsSpecialCharacters),
							_fileSpecialCharacters
						],
						['Serializing a strings object with string array values produces a resource strings file containing <string-array> tags representing the string array values',
							Uize.clone (_stringsStringArrays),
							_fileStringArrays
						],
						['Serializing a strings object with object values representing strings with plural forms produces a resource strings file containing <plurals> tags representing the strings with plural forms',
							Uize.clone (_stringsPluralForms),
							_filePluralForms
						]
					]]
				])
			]
		});
	}
});

