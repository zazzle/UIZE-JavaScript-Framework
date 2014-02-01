/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Loc.Pseudo Class
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
		The =Uize.Test.Uize.Loc.Pseudo= module defines a suite of unit tests for the =Uize.Loc.Pseudo= module.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Test.Uize.Loc.Pseudo',
	builder:function () {
		'use strict';

		var
			_alphabetCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			_alphabetCharactersLookup = Uize.lookup (_alphabetCharacters.split ('')),
			_nonAlphabetCharacters = Uize.map (
				127,
				function (_charCode) {
					var _char = String.fromCharCode (_charCode);
					return _char in _alphabetCharactersLookup ? '' : _char;
				}
			).join (''),
			_truthyValues = [true,'0',-1,{},[],function () {},/\d/],
			_falsyValues = [false,'',0,null,undefined,NaN]
		;

		return Uize.Test.resolve ({
			title:'Test for Uize.Loc.Pseudo Module',
			test:[
				Uize.Test.requiredModulesTest ('Uize.Loc.Pseudo'),
				Uize.Test.staticMethodsTest ([
					['Uize.Loc.Pseudo.accent',[
						['Test that all alphabetical characters are converted correctly to extended character set versions',
							_alphabetCharacters,
							'åƀçðéƒĝĥîĵķļɱñöþǫŕšţûṽŵẋýžÅƁÇÐÉƑĜĤÎĴĶĻṀÑÖÞǪŔŠŢÛṼŴẊÝŽ'
						],
						['Test that non-alphabetical characters in the ASCII character set are left unmodified',
							_nonAlphabetCharacters,
							_nonAlphabetCharacters
						]
					]],
					['Uize.Loc.Pseudo.pseudoLocalize',[
						['Test the options are defaulted correctly when the optional options argument is not specified',
							'This pseudo-localization thing is pretty cool!',
							'[Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!]'
						],

						/*** test handling for the accent option ***/
							['Test that, when the optional options argument is specified, the value of the accent option is defaulted to true if it is not specified',
								['This pseudo-localization thing is pretty cool!',{}],
								'[Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!]'
							],
							{
								title:'Test that, when a falsy value (other than the values null or undefined) is specified for the accent property of the optional options argument, then accenting is disabled as expected',
								test:function () {
									var
										_testString = 'Test string',
										_unaccentedTestString = '[Test_ string__]',
										_actual = [],
										_expected = []
									;
									Uize.forEach (
										_falsyValues,
										function (_falsyValue) {
											if (_falsyValue != undefined) {
												_expected.push (_unaccentedTestString);
												_actual.push (Uize.Loc.Pseudo.pseudoLocalize (_testString,{accent:_falsyValue}))
											}
										}
									);
									return this.expect (_expected,_actual);
								}
							},
							{
								title:'Test that, when a truthy value is specified for the accent property of the optional options argument, then accenting is enabled as expected',
								test:function () {
									var
										_testString = 'Test string',
										_accentedTestString = '[Ţéšţ_ šţŕîñĝ__]',
										_actual = [],
										_expected = []
									;
									Uize.forEach (
										_truthyValues,
										function (_truthyValue) {
											_expected.push (_accentedTestString);
											_actual.push (Uize.Loc.Pseudo.pseudoLocalize (_testString,{accent:_truthyValue}))
										}
									);
									return this.expect (_expected,_actual);
								}
							},

						/*** test handling for the wrapper option ***/
							['Test that, when the optional options argument is specified, the value of the wrapper option is defaulted to square brackets if it is not specified',
								['This pseudo-localization thing is pretty cool!',{}],
								'[Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!]'
							],
							['Test that, when the value null is specified for the wrapper option, its value is defaulted to square brackets',
								['This pseudo-localization thing is pretty cool!',{wrapper:null}],
								'[Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!]'
							],
							['Test that, when the value undefined is specified for the wrapper option, its value is defaulted to square brackets',
								['This pseudo-localization thing is pretty cool!',{wrapper:null}],
								'[Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!]'
							],
							['Test that, when a two character wrapper is specified for the wrapper option, the first character is used as the opener and the second character is used as the closer',
								['This pseudo-localization thing is pretty cool!',{wrapper:'{}'}],
								'{Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!}'
							],
							['Test that, when a string with more than two characters is specified for the wrapper option, the first half is used as the opener and the second half is used as the closer',
								['This pseudo-localization thing is pretty cool!',{wrapper:'<~==~>'}],
								'<~=Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!=~>'
							],
							['Test that, when a string with an odd number of characters is specified for the wrapper option, the first half is used as the opener and the second half is used as the closer, and the opener has one less character than the closer',
								['This pseudo-localization thing is pretty cool!',{wrapper:'<~=+=~>'}],
								'<~=Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!+=~>'
							],
							['Test that, when an empty string is specified for the wrapper option, the returned result has no wrapper characters',
								['This pseudo-localization thing is pretty cool!',{wrapper:''}],
								'Ţĥîš_ þšéûðö-ļöçåļîžåţîöñ______ ţĥîñĝ_ îš_ þŕéţţý__ çööļ_!'
							],

						/*** test handling for the expansion option ***/
							['Test that, when the optional options argument is specified, the value of the expansion option is defaulted to 1.3 if it is not specified',
								['0123456789',{}],
								'[0123456789___]'
							],
							['Test that, when the value null is specified for the expansion option, its value is defaulted to 1.3',
								['0123456789',{expansion:null}],
								'[0123456789___]'
							],
							['Test that, when the value undefined is specified for the expansion option, its value is defaulted to 1.3',
								['0123456789',{expansion:null}],
								'[0123456789___]'
							],
							['Test that, when the value NaN is specified for the expansion option, its value is defaulted to 1.3',
								['0123456789',{expansion:null}],
								'[0123456789___]'
							],
							['Test that, when the value 1 is specified for the expansion option, then no expansion is applied',
								['0123456789',{expansion:1}],
								'[0123456789]'
							],
							['Test that, when a value less than 1 is specified for the expansion option, then no expansion is applied',
								['0123456789',{expansion:.5}],
								'[0123456789]'
							],
							['Test that, when a value greater than 1 is specified for the expansion option, then the number of expansion characters that are added is equal to the expansion value minus one and then multiplied by the length of the source string',
								['0123456789',{expansion:2.5}],
								'[0123456789_______________]'
							],
							['Test that, when the source string has multiple words, the expansion characters are distributed across all the words, with the number of characters added to a word proportional to the size of the word',
								['123 123456 12345 12345678',{expansion:2}],
								'[123___ 123456______ 12345_____ 12345678________]'
							],
							['Test that the number of expansion characters is based only on the lengths of the words and not whitespace, punctuation characters, or added wrapper characters',
								['The cat,     which was big and fat,     shat on the mat!!!',{expansion:2,wrapper:'<<<>>>'}],
								'<<<Ţĥé___ çåţ___,     ŵĥîçĥ_____ ŵåš___ ƀîĝ___ åñð___ ƒåţ___,     šĥåţ____ öñ__ ţĥé___ ɱåţ___!!!>>>'
							]

						/*** test handling for the expansionChar option ***/

						/*** test handling for the wordSplitter option ***/
							/*
							['',
								'',
								1
							]
							*/
							/*
								-
							*/
					]]
				])
			]
		});
	}
});
