/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Class Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010-2015 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Test
	importance: 8
	codeCompleteness: 40
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.Uize.Class= module defines a suite of unit tests for the =Uize.Class= module.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'Uize.Test.Uize.Class',
	required:[
		'Uize.Data',
		'Uize.Class',
		'Uize.Class.Value'
	],
	builder:function () {
		'use strict';

		var _falsyAndTruthyValues = [
			null,undefined,0,false,'',NaN, // falsy values
			{},[],1,-1,true,'foo'          // truthy values
		];

		function _eventsSystemTest (_title,_isInstance) {
			function _getEventSource () {
				return _isInstance ? Uize.Class () : Uize.Class.subclass ();
			}
			return {
				title:_title,
				test:[
					{
						title:'Firing an event for which no handler is wired has no ill effect',
						test:function () {
							_getEventSource ().fire ('testEvent');
							return true;
						}
					},
					{
						title:'Test that firing an event for which a handler is wired works correctly',
						test:function () {
							var
								_success = false,
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('testEvent',function () {_success = true});
							_eventSource.fire ('testEvent');
							return _success;
						}
					},
					{
						title:
							'An event handler function receives a single object parameter, and this event object contains a name property whose value matches the name of the fired event',
						test:function () {
							var
								_success = false,
								_eventSource = _getEventSource ()
							;
							_eventSource.wire (
								'testEvent',
								function (_event) {
									_success =
										arguments.length == 1 &&
										typeof _event == 'object' && _event &&
										_event.name == 'testEvent'
									;
								}
							);
							_eventSource.fire ('testEvent');
							return _success;
						}
					},
					{
						title:
							'The event object provided to an event handler has a source property, whose value is a reference to the object on which the event was fired',
						test:function () {
							var
								_success = false,
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('testEvent',function (_event) {_success = _event.source === _eventSource});
							_eventSource.fire ('testEvent');
							return _success;
						}
					},
					{
						title:
							'Firing an event for which two handlers are wired results in the handlers being exucuted in the order wired',
						test:function () {
							var
								_coverageAndOrder = [],
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler1')});
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler2')});
							_eventSource.fire ('testEvent');
							return this.expect ('handler1,handler2',_coverageAndOrder + '');
						}
					},
					{
						title:
							'Firing an event for which more than two handlers are wired results in the handlers being exucuted in the order wired',
						test:function () {
							var
								_coverageAndOrder = [],
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler1')});
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler2')});
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler3')});
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler4')});
							_eventSource.fire ('testEvent');
							return this.expect ('handler1,handler2,handler3,handler4',_coverageAndOrder + '');
						}
					},
					{
						title:'Test that firing an event using the alternate event object form is handled correctly',
						test:function () {
							var
								_success = false,
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('testEvent',function () {_success = true});
							_eventSource.fire ({name:'testEvent'});
							return _success;
						}
					},
					{
						title:
							'Extra event object properties that are specified when firing an event are accessible on the event object in the handler',
						test:function () {
							var
								_success = false,
								_eventSource = _getEventSource ()
							;
							_eventSource.wire (
								'testEvent',
								function (_event) {_success = _event.foo == 'bar' && _event.hello == 'world'}
							);
							_eventSource.fire ({
								name:'testEvent',
								foo:'bar',
								hello:'world'
							});
							return _success;
						}
					},
					{
						title:
							'The same event object is passed to all handlers for an event and is also returned as the result of the fire method',
						test:function () {
							var
								_eventSource = _getEventSource (),
								_handler1ReceivedEvent,
								_handler2ReceivedEvent
							;
							_eventSource.wire (
								'testEvent',
								function (_event) {
									_handler1ReceivedEvent = _event;
									_event.foo = 'bar';
								}
							);
							_eventSource.wire (
								'testEvent',
								function (_event) {
									_handler2ReceivedEvent = _event;
									_event.hello = 'world';
								}
							);
							var _event = _eventSource.fire ('testEvent');
							return (
								_event == _handler1ReceivedEvent &&
								_event == _handler2ReceivedEvent &&
								_event.foo == 'bar' && _event.hello == 'world'
							);
						}
					},
					{
						title:'Unwiring an event handler results in that handler no longer being executed',
						test:function () {
							var
								_success = false,
								_eventSource = _getEventSource ()
							;
							function _handler () {_success = !_success}

							_eventSource.wire ('testEvent',_handler);
							_eventSource.fire ('testEvent');
							_eventSource.unwire ('testEvent',_handler);
							_eventSource.fire ('testEvent');

							return _success;
						}
					},
					{
						title:
							'Test that the special wildcard event name results in the handler being executed for all events, and that it can be unwired successfully',
						test:function () {
							var
								_expectedCoverageAndOrder = 'testEvent1,testEvent2,testEvent3',
								_handler1CoverageAndOrder = [],
								_handler2CoverageAndOrder = [],
								_handler3CoverageAndOrder = [],
								_eventSource = _getEventSource ()
							;
							function _handler1 (_event) {_handler1CoverageAndOrder.push (_event.name)}
							function _handler2 (_event) {_handler2CoverageAndOrder.push (_event.name)}
							function _handler3 (_event) {_handler3CoverageAndOrder.push (_event.name)}

							_eventSource.wire ('*',_handler1);
							_eventSource.wire ('*',_handler2);
							_eventSource.wire ('*',_handler3);
							_eventSource.fire ('testEvent1');
							_eventSource.fire ('testEvent2');
							_eventSource.fire ('testEvent3');
							_eventSource.unwire ('*',_handler1);
							_eventSource.unwire ('*',_handler2);
							_eventSource.unwire ('*',_handler3);
							_eventSource.fire ('testEvent1');
							_eventSource.fire ('testEvent2');
							_eventSource.fire ('testEvent3');

							return (
								_handler1CoverageAndOrder + '' == _expectedCoverageAndOrder &&
								_handler2CoverageAndOrder + '' == _expectedCoverageAndOrder &&
								_handler3CoverageAndOrder + '' == _expectedCoverageAndOrder
							);
						}
					},
					{
						title:
							'When the second of three event handlers is unwired, the execution order of the remaining two handlers is preserved',
						test:function () {
							var
								_coverageAndOrder = [],
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler1')});
							function _handler2 () {_coverageAndOrder.push ('handler2')}
							_eventSource.wire ('testEvent',_handler2);
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler3')});
							_eventSource.unwire ('testEvent',_handler2);
							_eventSource.fire ('testEvent');
							return this.expect ('handler1,handler3',_coverageAndOrder + '');
						}
					},
					{
						title:
							'Test that wiring handlers for multiple different events using the event-names-to-handlers map is handled correctly',
						test:function () {
							var
								_event1HandlerCalled,
								_event2HandlerCalled,
								_event3HandlerCalled,
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ({
								testEvent1:function () {_event1HandlerCalled = true},
								testEvent2:function () {_event2HandlerCalled = true},
								testEvent3:function () {_event3HandlerCalled = true}
							});
							_eventSource.fire ('testEvent1');
							_eventSource.fire ('testEvent2');
							_eventSource.fire ('testEvent3');
							return _event1HandlerCalled && _event2HandlerCalled && _event3HandlerCalled;
						}
					},
					{
						title:
							'Test that unwiring handlers for multiple different events using the event-names-to-handlers map is handled correctly',
						test:function () {
							var
								_event1Success = false,
								_event2Success = false,
								_event3Success = false,
								_eventSource = _getEventSource ()
							;
							function _fireAllEvents () {
								_eventSource.fire ('testEvent1');
								_eventSource.fire ('testEvent2');
								_eventSource.fire ('testEvent3');
							}
							var _eventsToHandlersMap = {
								testEvent1:function () {_event1Success = !_event1Success},
								testEvent2:function () {_event2Success = !_event2Success},
								testEvent3:function () {_event3Success = !_event3Success}
							};
							_eventSource.wire (_eventsToHandlersMap);
							_fireAllEvents();
							_eventSource.unwire (_eventsToHandlersMap);
							_fireAllEvents();
							return _event1Success && _event2Success && _event3Success;
						}
					},
					{
						title:
							'Not specifying a handler when unwiring an event results in all handlers for that event being unwired',
						test:function () {
							var
								_handler1Success = false,
								_handler2Success = false,
								_handler3Success = false,
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('testEvent',function () {_handler1Success = !_handler1Success});
							_eventSource.wire ('testEvent',function () {_handler2Success = !_handler2Success});
							_eventSource.wire ('testEvent',function () {_handler3Success = !_handler3Success});
							_eventSource.fire ('testEvent');
							_eventSource.unwire ('testEvent');
							_eventSource.fire ('testEvent');

							return _handler1Success && _handler2Success && _handler3Success;
						}
					},
					{
						title:
							'Unwiring a handler for the special wildcard event results in just that handler being unwired, rather than all handlers for the wildcard event or all handlers for all events',
						test:function () {
							var
								_coverageAndOrder = [],
								_eventSource = _getEventSource ()
							;
							function _handler1 () {_coverageAndOrder.push ('handler1')}
							_eventSource.wire ('*',_handler1);
							_eventSource.wire ('*',function () {_coverageAndOrder.push ('handler2')});
							_eventSource.wire ('testEvent',function () {_coverageAndOrder.push ('handler3')});
							_eventSource.fire ('testEvent');
							_eventSource.unwire ('*',_handler1);
							_eventSource.fire ('testEvent');

							return this.expect ('handler1,handler2,handler3,handler2,handler3',_coverageAndOrder + '');
						}
					},
					{
						title:
							'Specifying no arguments when calling the unwire method will unwire all wired handlers for any events',
						test:function () {
							var
								_coverageAndOrder = [],
								_eventSource = _getEventSource ()
							;
							_eventSource.wire ('*',function () {_coverageAndOrder.push ('handler1')});
							_eventSource.wire ('testEvent1',function () {_coverageAndOrder.push ('handler2')});
							_eventSource.wire ('testEvent1',function () {_coverageAndOrder.push ('handler3')});
							_eventSource.wire ('testEvent2',function () {_coverageAndOrder.push ('handler4')});
							_eventSource.unwire ();
							_eventSource.fire ('testEvent1');
							_eventSource.fire ('testEvent2');

							return this.expect ([],_coverageAndOrder);
						}
					},
					_isInstance
						? {
							title:'Instance events can be bubbled up the parent chain',
							test:[
								{
									title:
										'Setting the bubble event property to true when firing an event on an instance with no parent is not fatal and results in a handler wired for that event being executed',
									test:function () {
										var
											_eventSource = _getEventSource (),
											_success = false
										;
										_eventSource.wire ('testEvent',function () {_success = true});
										_eventSource.fire ({name:'testEvent',bubble:true});
										return _success;
									}
								},
								{
									title:
										'Setting the bubble event property to true when firing an event on an instance with a parent causes that event to fire first on the instance and then on its parent',
									test:function () {
										var
											_coverageAndOrder = [],
											_eventSource = _getEventSource (),
											_eventSourceParent = _getEventSource ()
										;
										_eventSource.parent = _eventSourceParent;
										_eventSource.wire (
											'testEvent',
											function () {_coverageAndOrder.push ('sourceHandler')}
										);
										_eventSourceParent.wire (
											'testEvent',
											function () {_coverageAndOrder.push ('sourceParentHandler')}
										);
										_eventSource.fire ({name:'testEvent',bubble:true});
										return this.expect ('sourceHandler,sourceParentHandler',_coverageAndOrder + '');
									}
								},
								{
									title:'A bubbling event is fired on all instances up the parent chain',
									test:function () {
										var
											_coverageAndOrder = [],
											_eventSource = _getEventSource (),
											_eventSourceParent = _getEventSource (),
											_eventSourceParentParent = _getEventSource (),
											_expectedCoverageAndOrder = [
												'sourceHandler',
												'sourceParentHandler',
												'sourceParentParentHandler'
											]
										;
										_eventSource.parent = _eventSourceParent;
										_eventSourceParent.parent = _eventSourceParentParent;
										_eventSource.wire (
											'testEvent',
											function () {_coverageAndOrder.push (_expectedCoverageAndOrder [0])}
										);
										_eventSourceParent.wire (
											'testEvent',
											function () {_coverageAndOrder.push (_expectedCoverageAndOrder [1])}
										);
										_eventSourceParentParent.wire (
											'testEvent',
											function () {_coverageAndOrder.push (_expectedCoverageAndOrder [2])}
										);
										_eventSource.fire ({name:'testEvent',bubble:true});
										return this.expect (_expectedCoverageAndOrder + '',_coverageAndOrder + '');
									}
								},
								{
									title:
										'The event object provided to all handlers of a bubbling event up the parent chain is the same event object for all handlers',
									test:function () {
										var
											_eventSource = _getEventSource (),
											_eventSourceParent = _getEventSource (),
											_eventSourceParentParent = _getEventSource (),
											_eventSourceHandlerReceivedEvent,
											_eventSourceParentHandlerReceivedEvent,
											_eventSourceParentParentHandlerReceivedEvent,
											_eventFired = {
												name:'testEvent',
												bubble:true
											}
										;
										_eventSource.parent = _eventSourceParent;
										_eventSourceParent.parent = _eventSourceParentParent;
										_eventSource.wire (
											'testEvent',
											function (_event) {
												_eventSourceHandlerReceivedEvent = _event;
												_event.foo = 'bar';
											}
										);
										_eventSourceParent.wire (
											'testEvent',
											function (_event) {
												_eventSourceParentHandlerReceivedEvent = _event;
												_event.hello = 'world';
											}
										);
										_eventSourceParentParent.wire (
											'testEvent',
											function (_event) {
												_eventSourceParentParentHandlerReceivedEvent = _event;
												_event.duck = 'typing';
											}
										);
										var _event = _eventSource.fire (_eventFired);
										return (
											_event == _eventFired &&
											_eventSourceHandlerReceivedEvent == _eventFired &&
											_eventSourceParentHandlerReceivedEvent == _eventFired &&
											_eventSourceParentParentHandlerReceivedEvent == _eventFired &&
											_event.foo == 'bar' && _event.hello == 'world' && _event.duck == 'typing'
										);
									}
								},
								{
									title:
										'A bubbling event can be canceled by a handler of the bubbled event, so that it will not be fired on a higher parent',
									test:function () {
										var
											_coverageAndOrder = [],
											_eventSource = _getEventSource (),
											_eventSourceParent = _getEventSource (),
											_eventSourceParentParent = _getEventSource ()
										;
										_eventSource.parent = _eventSourceParent;
										_eventSourceParent.parent = _eventSourceParentParent;
										_eventSource.wire (
											'testEvent',
											function () {_coverageAndOrder.push ('sourceHandler')}
										);
										_eventSourceParent.wire (
											'testEvent',
											function (_event) {
												_coverageAndOrder.push ('sourceParentHandler');
												_event.bubble = false;
											}
										);
										_eventSourceParentParent.wire (
											'testEvent',
											function () {_coverageAndOrder.push ('sourceParentParentHandler')}
										);
										_eventSource.fire ({name:'testEvent',bubble:true});
										return this.expect ('sourceHandler,sourceParentHandler',_coverageAndOrder + '');
									}
								},
								{
									title:
										'The event object for a bubbling event always has the instance on which the event was originally fired as the value for the source property',
									test:function () {
										var
											_eventSource = _getEventSource (),
											_eventSourceParent = _getEventSource (),
											_eventSourceParentParent = _getEventSource (),
											_eventSourceHandlerSource,
											_eventSourceParentHandlerSource,
											_eventSourceParentParentHandlerSource
										;
										_eventSource.parent = _eventSourceParent;
										_eventSourceParent.parent = _eventSourceParentParent;
										_eventSource.wire (
											'testEvent',
											function (_event) {_eventSourceHandlerSource = _event.source}
										);
										_eventSourceParent.wire (
											'testEvent',
											function (_event) {_eventSourceParentHandlerSource = _event.source}
										);
										_eventSourceParentParent.wire (
											'testEvent',
											function (_event) {_eventSourceParentParentHandlerSource = _event.source}
										);
										_eventSource.fire ({name:'testEvent',bubble:true});
										return (
											_eventSourceHandlerSource == _eventSource &&
											_eventSourceParentHandlerSource == _eventSource &&
											_eventSourceParentParentHandlerSource == _eventSource
										);
									}
								}
							]
						} : {
							title:'Event bubbling is ignored for classes',
							test:[
								{
									title:
										'Setting the bubble event property to true when firing an event on a class with no parent (as it should be) is not fatal and results in a handler wired for that event being executed',
									test:function () {
										var
											_eventSource = _getEventSource (),
											_success = false
										;
										_eventSource.wire ('testEvent',function () {_success = true});
										_eventSource.fire ({name:'testEvent',bubble:true});
										return _success;
									}
								},
								{
									title:
										'Setting the bubble event property to true when firing an event on a class with a parent (which is not exactly valid) is not fatal and results in a handler wired for that event being executed',
									test:function () {
										var
											_coverageAndOrder = [],
											_eventSource = _getEventSource (),
											_eventSourceParent = _getEventSource ()
										;
										_eventSource.parent = _eventSourceParent;
										_eventSource.wire (
											'testEvent',
											function () {_coverageAndOrder.push ('sourceHandler')}
										);
										_eventSourceParent.wire (
											'testEvent',
											function () {_coverageAndOrder.push ('sourceParentHandler')}
										);
										_eventSource.fire ({name:'testEvent',bubble:true});
										return this.expect ('sourceHandler',_coverageAndOrder + '');
									}
								}
							]
						}
				]
			};
		}

		function _onceMethodTest (_notPrefix) {
			var
				_falsyValue = null,
				_truthyValue = {},
				_mustExecuteValue = _notPrefix ? _falsyValue : _truthyValue,
				_mustNotExecuteValue = _notPrefix ? _truthyValue : _falsyValue,
				_mustExecuteStateName = _notPrefix ? 'falsy' : 'truthy',
				_mustNotExecuteStateName = _notPrefix ? 'truthy' : 'falsy',
				_prefix = _notPrefix ? '!' : ''
			;
			return {
				title:'Test that the once method works correctly when there is ' + (_notPrefix ? 'a' : 'no') + ' "!" prefix',
				test:[
					{
						title:'The handler is executed immediately if the property is already ' + _mustExecuteStateName,
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustExecuteValue}});
							var
								_instance = _Class (),
								_handlerCalled = false
							;
							_instance.once (_prefix + 'myProperty',function () {_handlerCalled = true});
							return this.expect (true,_handlerCalled);
						}
					},
					{
						title:'The handler is not executed immediately if the property is not yet ' + _mustExecuteStateName,
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustNotExecuteValue}});
							var
								_instance = _Class (),
								_handlerCalled = false
							;
							_instance.once (_prefix + 'myProperty',function () {_handlerCalled = true});
							return this.expect (false,_handlerCalled);
						}
					},
					{
						title:'The handler is executed later once the property becomes ' + _mustExecuteStateName + ', if it wasn\'t already ' + _mustExecuteStateName,
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustNotExecuteValue}});
							var
								_instance = _Class (),
								_handlerCalled = false
							;
							_instance.once (_prefix + 'myProperty',function () {_handlerCalled = true});
							_instance.set ({myProperty:_mustExecuteValue});
							return this.expect (true,_handlerCalled);
						}
					},
					{
						title:'The handler is executed only the first time that the property becomes ' + _mustExecuteStateName,
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustNotExecuteValue}});
							var
								_instance = _Class (),
								_handlerCalledCount = 0
							;
							_instance.once (_prefix + 'myProperty',function () {_handlerCalledCount++});
							_instance.set ({myProperty:_mustExecuteValue});
							_instance.set ({myProperty:_mustNotExecuteValue});
							_instance.set ({myProperty:_mustExecuteValue});
							return this.expect (1,_handlerCalledCount);
						}
					},
					{
						title:'The method returns a wirings object that can be used to unwire the handler before the property becomes ' + _mustExecuteStateName,
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustNotExecuteValue}});
							var
								_instance = _Class (),
								_handlerCalled = false,
								_wirings = _instance.once (_prefix + 'myProperty',function () {_handlerCalled = true})
							;
							_instance.unwire (_wirings);
							_instance.set ({myProperty:_mustExecuteValue});
							return this.expectNonEmptyObject (_wirings) && this.expect (false,_handlerCalled);
						}
					},
					{
						title:'The method returns an empty wirings object if the handler is executed immediately because the property is already ' + _mustExecuteStateName,
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustExecuteValue}});
							var
								_instance = _Class (),
								_wirings = _instance.once (_prefix + 'myProperty',function () {})
							;
							return this.expectObject (_wirings) && this.expect (true,Uize.isEmpty (_wirings));
						}
					},
					{
						title:'A once handler can safely be registered for a property that has not yet been registered',
						test:function () {
							var
								_Class = Uize.Class.subclass (),
								_instance = _Class (),
								_handlerCalled = false
							;
							_instance.once (_prefix + 'myProperty',function () {_handlerCalled = true});
							_instance.set ({myProperty:_mustExecuteValue});
							return this.expect (true,_handlerCalled);
						}
					},
					{
						title:'The handler is passed the value of the property as its single argument, both when executed immediately and when executed later',
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({
								_myProperty1:{name:'myProperty1',value:_mustExecuteValue},
								_myProperty2:{name:'myProperty2',value:_mustNotExecuteValue}
							});
							var
								_instance = _Class (),
								_valuesPassedToHandler = []
							;
							_instance.once (
								_prefix + 'myProperty1',
								function (_propertyValue) {_valuesPassedToHandler.push (_propertyValue)}
							);
							_instance.once (
								_prefix + 'myProperty2',
								function (_propertyValue) {_valuesPassedToHandler.push (_propertyValue)}
							);
							_instance.set ({myProperty2:_mustExecuteValue});
							return this.expect ([_mustExecuteValue,_mustExecuteValue],_valuesPassedToHandler);
						}
					},
					{
						title:'The same once handler can be registered repeatedly for the same property',
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustExecuteValue}});
							var
								_instance = _Class (),
								_valuesPassedToHandler = []
							;
							function _onceHandler (_propertyValue) {
								_valuesPassedToHandler.push (_propertyValue);
							}
							_instance.once (_prefix + 'myProperty',_onceHandler);
							_instance.set ({myProperty:_mustNotExecuteValue});
							_instance.once (_prefix + 'myProperty',_onceHandler);
							_instance.set ({myProperty:_mustExecuteValue});
							_instance.set ({myProperty:_mustNotExecuteValue});
							_instance.once (_prefix + 'myProperty',_onceHandler);
							_instance.set ({myProperty:_mustExecuteValue});
							return this.expect (
								[_mustExecuteValue,_mustExecuteValue,_mustExecuteValue],
								_valuesPassedToHandler
							);
						}
					},
					{
						title:'Multiple once handlers can be registered for the same property',
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:{name:'myProperty',value:_mustNotExecuteValue}});
							var
								_instance = _Class (),
								_handler1Called = false,
								_handler2Called = false,
								_handler3Called = false
							;
							_instance.once (_prefix + 'myProperty',function () {_handler1Called = true});
							_instance.once (_prefix + 'myProperty',function () {_handler2Called = true});
							_instance.once (_prefix + 'myProperty',function () {_handler3Called = true});
							_instance.set ({myProperty:_mustExecuteValue});
							return (
								this.expect (true,_handler1Called) &&
								this.expect (true,_handler2Called) &&
								this.expect (true,_handler3Called)
							);
						}
					},
					{
						title:'A once handler is executed for all types of ' + _mustExecuteStateName + ' values and for no ' + _mustNotExecuteStateName + ' values',
						test:function () {
							var
								_Class = Uize.Class.subclass (),
								_expectedHandlersCalled = []
							;
							Uize.forEach (
								_falsyAndTruthyValues,
								function (_value,_valueNo) {
									var _propertyName = 'myProperty' + _valueNo;
									_Class.stateProperties (Uize.pairUp (_propertyName,{value:_value}));
									!!_value == !!_mustExecuteValue && _expectedHandlersCalled.push (_propertyName);
								}
							);
							var
								_instance = _Class (),
								_handlersCalled = []
							;
							Uize.forEach (
								_falsyAndTruthyValues,
								function (_value,_valueNo) {
									var _propertyName = 'myProperty' + _valueNo;
									_instance.once (_prefix + _propertyName,function () {_handlersCalled.push (_propertyName)});
								}
							);
							return this.expect (_expectedHandlersCalled,_handlersCalled);
						}
					}
				]
			};
		}

		function _metUnmetMethodTest (_isMetTest) {
			var
				_method = _isMetTest ? 'met' : 'unmet',
				_expectedValue = _isMetTest
			;
			return {
				title:'Test that the ' + _method + ' instance method works correctly',
				test:[
					{
						title:
							'The ' + _method + ' method always sets the value of the specified state property to ' + _isMetTest + ', regardless of the property\'s current value',
						test:function () {
							var _Class = Uize.Class.subclass ();
							_Class.stateProperties ({_myProperty:'myProperty'});
							var
								_instance = _Class (),
								_expectedValues = [],
								_actualValues = []
							;
							Uize.forEach (
								_falsyAndTruthyValues,
								function (_value) {
									_expectedValues.push (_isMetTest);
									_instance.set ({myProperty:_value});
									_instance [_method] ('myProperty');
									_actualValues.push (_instance.get ('myProperty'));
								}
							);
							return this.expect (_expectedValues,_actualValues);
						}
					},
					{
						title:'Test that the ' + _method + ' method works correctly with a state property that has not yet been declared',
						test:function () {
							var
								_Class = Uize.Class.subclass (),
								_instance = _Class ()
							;
							_instance [_method] ('myProperty');
							return this.expect (_isMetTest,_instance.get ('myProperty'));
						}
					}
				]
			}
		}

		function _setMethodTest (_title,_isInstance) {
			return {
				title:_title,
				test:[
					{
						title:
							'Values can be set for multiple properties by calling the set method with a single argument, which is an object containing an arbitrary number of property name to property value mappings',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({
								property1:{},
								property2:{},
								property3:{}
							});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set ({
								property1:'property1Value',
								property2:'property2Value',
								property3:'property3Value'
							});
							return (
								this.expect ('property1Value',_testContext.get ('property1')) &&
								this.expect ('property2Value',_testContext.get ('property2')) &&
								this.expect ('property3Value',_testContext.get ('property3'))
							);
						}
					},
					{
						title:
							'A value can be set for a single property by calling the set method with two arguments, where the first argument is the property\'s name and the second is the property\'s value',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({property1:{}});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set ('property1','property1Value');
							return this.expect ('property1Value',_testContext.get ('property1'));
						}
					},
					{
						title:
							'Values can be set for multiple properties by calling the set method with more than two arguments, where the arguments are property name-value pairs',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({
								property1:{},
								property2:{},
								property3:{}
							});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set (
								'property1','property1Value',
								'property2','property2Value',
								'property3','property3Value'
							);
							return (
								this.expect ('property1Value',_testContext.get ('property1')) &&
								this.expect ('property2Value',_testContext.get ('property2')) &&
								this.expect ('property3Value',_testContext.get ('property3'))
							);
						}
					},
					{
						title:
							'The same value can be set for multiple properties by specifying the names of the properties in an array for the first argument and the value that all the properties should be set to as the second argument',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({
								property1:{},
								property2:{},
								property3:{}
							});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set (['property1','property2','property3'],'valueForAllProperties');
							return (
								this.expect ('valueForAllProperties',_testContext.get ('property1')) &&
								this.expect ('valueForAllProperties',_testContext.get ('property2')) &&
								this.expect ('valueForAllProperties',_testContext.get ('property3'))
							);
						}
					},
					{
						title:
							'When a private name for a state property is different from its publice name, the set method sets a value for a property using the private name of the state property and not its public name',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({_property1:'property1'});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set ('property1','property1Value');
							return (
								this.expect (undefined,_testContext.property1) &&
								this.expect ('property1Value',_testContext._property1)
							);
						}
					},
					{
						title:
							'When a private name for a state property is different from its publice name, a value can be set for the property by specifying its private name when calling the set method',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({_property1:'property1'});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set ({_property1:'property1Value'});
							return this.expect ('property1Value',_testContext._property1);
						}
					}
				]
			};
		}

		function _getMethodTest (_title,_isInstance) {
			return {
				title:_title,
				test:[
					{
						title:
							'The value of a single state property can be obtained by calling the get method with a single string argument, specifying the name of the property',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({
								property1:{value:'property1Value'},
								property2:{value:'property2Value'}
							});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							return this.expect ('property1Value',_testContext.get ('property1'));
						}
					},
					{
						title:
							'Values can be obtained for multiple properties by calling the get method with a single argument, which is a list of property names',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({
								property1:{value:'property1Value'},
								property2:{value:'property2Value'},
								property3:{value:'property3Value'}
							});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							return this.expect (
								{
									property1:'property1Value',
									property2:'property2Value',
									property3:'property3Value'
								},
								_testContext.get (['property1','property2','property3'])
							);
						}
					},
					{
						title:
							'Values can be obtained for multiple properties by calling the get method with a single argument, which is an object whose properties are the properties of the instance whose values should be obtained',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({
								property1:{value:'property1Value'},
								property2:{value:'property2Value'},
								property3:{value:'property3Value'}
							});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							return this.expect (
								{
									property1:'property1Value',
									property2:'property2Value',
									property3:'property3Value'
								},
								_testContext.get ({property1:0,property2:0,property3:0})
							);
						}
					},
					{
						title:
							'Values can be obtained for all properties by calling the get method with no arguments',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({
								property1:{value:'property1Value'},
								property2:{value:'property2Value'},
								property3:{value:'property3Value'}
							});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							return this.expect (
								{
									property1:'property1Value',
									property2:'property2Value',
									property3:'property3Value'
								},
								_testContext.get ()
							);
						}
					},
					{
						title:
							'When a private name for a state property is different from its publice name, the value can be obtained for the property by specifying its private name when calling the get method',
						test:function () {
							var
								_Subclass = Uize.Class.subclass (),
								_properties = {_property1:'property1'}
							;
							for (var _propertyPrivateName in _properties);
							_Subclass.stateProperties (_properties);
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set ('property1','property1Value');
							return this.expect ('property1Value',_testContext.get (_propertyPrivateName));
						}
					},
					{
						title:
							'When a private name for a state property is different from its publice name and its value is set using its private name, the value can be obtained for the property by specifying its public name when calling the get method',
						test:function () {
							var _Subclass = Uize.Class.subclass ();
							_Subclass.stateProperties ({_property1:'property1'});
							var _testContext = _isInstance ? new _Subclass : _Subclass;
							_testContext.set ({_property1:'property1Value'});
							return this.expect ('property1Value',_testContext.get ('property1'));
						}
					}
				]
			};
		}

		return Uize.Test.resolve ({
			title:'Test for Uize Base Class',
			test:[
				Uize.Test.staticMethodsTest ([
					['Uize.Class.fire',[
						// NOTE: this method is thoroughly tested by the event system tests (so, no tests here)
					]],
					['Uize.Class.wire',[
						// NOTE: this method is thoroughly tested by the event system tests (so, no tests here)
					]],
					['Uize.Class.unwire',[
						// NOTE: this method is thoroughly tested by the event system tests (so, no tests here)
					]],
					['Uize.Class.stateProperties',[
						// NOTE: this method is thoroughly tested by the properties system tests (so, no tests here)
					]],
					['Uize.Class.get',[
						// NOTE: this method is thoroughly tested by the properties system tests (so, no tests here)
					]],
					['Uize.Class.set',[
						// NOTE: this method is thoroughly tested by the properties system tests (so, no tests here)
					]],
					['Uize.Class.toggle',[
						// NOTE: this method is thoroughly tested by the properties system tests (so, no tests here)
					]],
					['Uize.Class.instanceMethods',[
						/*** test support for the array wrapper construct for obtaining a reference to former ***/
							{
								title:
									'Methods that are overridden in a subclass can be provided with a reference to the former version of the method taken from the superclass, by using the special array wrapper construct',
								test:function () {
									var
										_Class = Uize.Class.subclass ({
											instanceProperties:{
												delimiter:'-'
											},
											instanceMethods:{
												foo:function () {return this.delimiter + 'foo'}
											}
										}),
										_SubClass = _Class.subclass ({
											instanceMethods:{
												foo:[function (_former) {
													return function () {return _former.call (this) + this.delimiter + 'bar'}
												}]
											}
										}),
										_instance = _SubClass ()
									;
									return this.expect ('-foo-bar',_instance.foo ());
								}
							},
							{
								title:
									'An instance method can be overridden any number of times in a single class, and for each subsequent method override the "former" property of the method function will be set to the former, previously declared version of the method',
								test:function () {
									var
										_Class = Uize.Class.subclass ()
											.declare ({
												instanceProperties:{
													delimiter:'<'
												},
												instanceMethods:{
													foo:function (_arg) {
														return this.delimiter + 'foo' + _arg;
													}
												}
											})
											.declare ({
												instanceMethods:{
													foo:[function (_former) {
														return function (_arg) {
															return _former.call (this,_arg) + this.delimiter + 'bar' + _arg;
														}
													}]
												}
											})
											.declare ({
												instanceMethods:{
													foo:[function (_former) {
														return function (_arg) {
															return _former.call (this,_arg) + this.delimiter + 'baz' + _arg;
														}
													}]
												}
											})
											.declare ({
												instanceMethods:{
													foo:[function (_former) {
														return function (_arg) {
															return _former.call (this,_arg) + this.delimiter + 'qux' + _arg;
														}
													}]
												}
											})
										,
										_instance = _Class ()
									;
									return this.expect ('<foo><bar><baz><qux>',_instance.foo ('>'));
								}
							},

						/*** test support for the "former" property of instance method functions ***/
							{
								title:
									'When an instance method is first declared for a class, the "former" property of the method function is set to a dummy function that performs no operation and returns the value undefined',
								test:function () {
									var
										_Class = Uize.Class.subclass ({
											instanceMethods:{
												foo:function () {return 'foo'}
											}
										}),
										_instance = _Class ()
									;
									return (
										this.expectFunction (_instance.foo.former) &&
										this.expect (undefined,_instance.foo.former.call (_instance))
									);
								}
							},
							{
								title:
									'When an instance method declared in a superclass is overridden in a subclass, the "former" property of the method function in the subclass is set to the former version of the method taken from the superclass',
								test:function () {
									var
										_Class = Uize.Class.subclass ({
											instanceMethods:{
												foo:function () {return 'foo'}
											}
										}),
										_SubClass = _Class.subclass ({
											instanceMethods:{
												foo:[function (_former) {
													return function () {return _former.call (this) + 'bar'}
												}]
											}
										})
									;
									return this.expectSameAs (_Class ().foo,_SubClass ().foo.former);
								}
							}
					]],
					['Uize.Class.subclass',[
						/*
							- test state properties and inheritance
								- test that state properties are inherited by subclasses
						*/
						{
							title:
								'When a state property is defined by a private name in a base class and then is augmented in a subclass with a declaration that uses its public name, onChange handlers added in the subclass\' declaration are executed when the value is set by its private name in the base class',
							test:function () {
								var
									_handlersCalled = [],
									_Class = Uize.Class.subclass ({
										stateProperties:{
											privateName:{
												name:'publicName',
												onChange:function () {_handlersCalled.push ('class')}
											}
										}
									}),
									_SubClass = _Class.subclass ({
										stateProperties:{
											publicName:{
												onChange:function () {_handlersCalled.push ('subclass')}
											}
										}
									}),
									_instance = _SubClass ({privateName:'hello'})
								;
								return this.expect (['class','subclass'],_handlersCalled);
							}
						}
					]],
					['Uize.Class.doMy',[
						{
							title:'Test that the instance method is called correctly when no arguments are passed',
							test:function () {
								var
									_calledWithInstanceAsContext,
									_Class = Uize.Class.subclass ({
										instanceMethods:{
											fooMethod:function () {_calledWithInstanceAsContext = this == _instance}
										}
									}),
									_instance = _Class ()
								;
								_Class.doMy (_instance,'fooMethod');
								return this.expect (true,_calledWithInstanceAsContext);
							}
						},
						{
							title:'When no arguments are passed to the Uize.Class.doMy method, no arguments are passed to the instance method when it is called',
							test:function () {
								var
									_calledWithNoArguments,
									_Class = Uize.Class.subclass ({
										instanceMethods:{
											fooMethod:function () {_calledWithNoArguments = !arguments.length}
										}
									}),
									_instance = _Class ()
								;
								_Class.doMy (_instance,'fooMethod');
								return this.expect (true,_calledWithNoArguments);
							}
						},
						{
							title:'When arguments are passed to the Uize.Class.doMy method, those same arguments are passed to the instance method when it is called',
							test:function () {
								var
									_expectedArgumentsCalledWith = ['foo',3,false,'bar',[4,5,6]],
									_actualArgumentsCalledWith,
									_Class = Uize.Class.subclass ({
										instanceMethods:{
											fooMethod:function () {_actualArgumentsCalledWith = [].slice.call (arguments)}
										}
									}),
									_instance = _Class ()
								;
								_Class.doMy (_instance,'fooMethod',_expectedArgumentsCalledWith);
								return this.expect (_expectedArgumentsCalledWith,_actualArgumentsCalledWith);
							}
						},
						{
							title:'The result returned by the instance method is returned by the Uize.Class.doMy method',
							test:function () {
								var
									_expectedReturnValue = 'foo',
									_actualReturnValue,
									_Class = Uize.Class.subclass ({
										instanceMethods:{
											fooMethod:function () {return _expectedReturnValue}
										}
									}),
									_instance = _Class (),
									_actualReturnValue = _Class.doMy (_instance,'fooMethod')
								;
								;
								return this.expect (_expectedReturnValue,_actualReturnValue);
							}
						}
					]],
					['Uize.Class.singleton',[
						{
							title:'A singleton is an instance of the class on which the static method is called',
							test:function () {
								var _Class = Uize.Class.subclass ();
								return this.expectInstanceOf (_Class,_Class.singleton ());
							}
						},
						{
							title:'All attempts to create a singleton in the default scope produce the same instance',
							test:function () {
								var
									_Class = Uize.Class.subclass (),
									_singletonA = _Class.singleton (),
									_singletonB = _Class.singleton (),
									_singletonC = _Class.singleton ()
								;
								return (
									this.expectSameAs (_singletonA,_singletonB) &&
									this.expectSameAs (_singletonB,_singletonC)
								);
							}
						},
						{
							title:'A singleton created for a class is not inherited by a subclass of that class',
							test:function () {
								var
									_Class = Uize.Class.subclass (),
									_ClassSubclass = _Class.subclass ()
								;
								return this.expect (false,_Class.singleton () === _ClassSubclass.singleton ());
							}
						},
						{
							title:'A singleton can be created in a custom scope and that such a singleton will be a different one from that created in the default scope',
							test:function () {
								var
									_Class = Uize.Class.subclass (),
									_singletonInCustomScope = _Class.singleton ('foo')
								;
								return (
									this.expectInstanceOf (_Class,_singletonInCustomScope) &&
									this.expect (false,_singletonInCustomScope === _Class.singleton ())
								);
							}
						},
						{
							title:'All attempts to create a singleton in a custom scope produce the same instance',
							test:function () {
								var
									_Class = Uize.Class.subclass (),
									_singletonA = _Class.singleton ('foo'),
									_singletonB = _Class.singleton ('foo'),
									_singletonC = _Class.singleton ('foo')
								;
								return (
									this.expectSameAs (_singletonA,_singletonB) &&
									this.expectSameAs (_singletonB,_singletonC)
								);
							}
						},
						{
							title:'Singletons created for different scopes are different instances',
							test:function () {
								var
									_Class = Uize.Class.subclass (),
									_singletonForFooScope = _Class.singleton ('foo'),
									_singletonForBarScope = _Class.singleton ('bar'),
									_singletonForBooScope = _Class.singleton ('boo')
								;
								return (
									this.expect (false,_singletonForFooScope === _singletonForBarScope) &&
									this.expect (false,_singletonForFooScope === _singletonForBooScope) &&
									this.expect (false,_singletonForBarScope === _singletonForBooScope)
								);
							}
						},
						{
							title:'Specifying the empty string scope is equivalent to specifying no scope',
							test:function () {
								var _Class = Uize.Class.subclass ();
								return this.expectSameAs (_Class.singleton (),_Class.singleton (''));
							}
						},
						{
							title:'Specifying the optional properties object will initialize a newly created singleton to the state defined by the properties object',
							test:function () {
								var _singleton = Uize.Class.Value.singleton ('',{value:'foo'});
								return this.expect ('foo',_singleton.get ('value'));
							}
						},
						{
							title:'Specifying the optional properties object when getting a singleton instance that has already been created will update the singleton instance to the state defined by the properties object',
							test:function () {
								var
									_singleton = Uize.Class.Value.singleton (),
									_anotherSingleton = Uize.Class.Value.singleton ('',{value:'foo'})
								;
								return (
									this.expectSameAs (_singleton,_anotherSingleton) &&
									this.expect ('foo',_singleton.get ('value'))
								);
							}
						}
					]]
				]),
				{
					title:'Instances and classes support events',
					test:[
						_eventsSystemTest ('Instances support events',true),
						_eventsSystemTest ('Classes support events',false)
					]
				},
				{
					title:'Classes have a state properties system',
					test:[
						{
							title:'State properties can be declared for classes',
							test:[
								{
									title:'A state property can be declared using the minimal profile syntax',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({_myProperty:'myProperty'});
										var _instance = new _Subclass;
										return this.expect ({myProperty:undefined},_instance.get ());
									}
								},
								{
									title:'A state property can be declared using the complete profile syntax',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({_myProperty:{name:'myProperty'}});
										var _instance = new _Subclass;
										return this.expect ({myProperty:undefined},_instance.get ());
									}
								},
								{
									title:
										'Multiple properties can be declared in a single call to the stateProperties method, and minimal and complete profiles can be combined',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											_myProperty1:'myProperty1',
											_myProperty2:{name:'myProperty2'}
										});
										var _instance = new _Subclass;
										return this.expect ({myProperty1:undefined,myProperty2:undefined},_instance.get ());
									}
								},
								{
									title:
										'The public name of a state property is defaulted when no value is specified for the name property in the property profile',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({myProperty:{}});
										var _instance = new _Subclass;
										return this.expect ({myProperty:undefined},_instance.get ());
									}
								},
								{
									title:
										'Multiple state properties can be declared cumulatively by repeatedly calling the stateProperties method',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({_myProperty1:'myProperty1'});
										_Subclass.stateProperties ({_myProperty2:{name:'myProperty2'}});
										var _instance = new _Subclass;
										return this.expect ({myProperty1:undefined,myProperty2:undefined},_instance.get ());
									}
								},
								{
									title:'When a state property is first declared with private name and later with public name, the definitions are merged'	,
									test:function() {
										var
											_Subclass = Uize.Class.subclass (),
											_called = false
										;
										_Subclass.stateProperties ({_myProperty1:{name:'myProperty1',value:3}});
										_Subclass.stateProperties ({myProperty1:{name:'myProperty1',onChange:function() { _called = true}}});
										var _instance = new _Subclass;
										_instance.set('myProperty1', 5);
										return this.expect (true,_called);
									}
								},
								{
									title:'When a state property is first declared with public name and later with private name, the definitions are merged'	,
									test:function() {
										var
											_Subclass = Uize.Class.subclass (),
											_called = false
										;
										_Subclass.stateProperties ({myProperty1:{name:'myProperty1',onChange:function() { _called = true}}});
										_Subclass.stateProperties ({_myProperty1:{name:'myProperty1',value:3}});
										var _instance = new _Subclass;
										_instance.set('myProperty1', 5);
										return this.expect (true,_called);
									}
								}
							]
						},
						{
							title:'Test setting values for state properties for instances and classes',
							test:[
								_setMethodTest ('Test that the set method works for instances',true),
								_setMethodTest ('Test that the set method works for classes',false)
							]
						},
						{
							title:'Test getting values for state properties for instances and classes',
							test:[
								_getMethodTest ('Test that the get method works for instances',true),
								_getMethodTest ('Test that the get method works for classes',false),
								{
									title:
										'The valueOf method of an instance returns the value of the special value state property for the instance',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											_value:{
												name:'value',
												value:'foo'
											}
										});
										var _instance = new _Subclass;
										return this.expect (_instance.valueOf (),'foo');
									}
								}
							]
						},
						{
							title:'Initial values can be specified when declaring state properties',
							test:[
								{
									title:
										'When no initial value is specified for a state property, the property\'s initial value is undefined',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											myProperty:{}
										});
										var _instance = new _Subclass;
										return this.expect (undefined,_instance.get ('myProperty'));
									}
								},
								{
									title:
										'Specifying a value property in a state property\'s profile when declaring it has the effect of setting the initial value for that property for new instances that are created',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											myProperty:{value:'initial value'}
										});
										var _instance = new _Subclass;
										return this.expect ('initial value',_instance.get ('myProperty'));
									}
								},
								{
									title:
										'The value null is supported as an initial value for a state property and that it is not treated the same as undefined',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											myProperty:{value:null}
										});
										var _instance = new _Subclass;
										return this.expect (null,_instance.get ('myProperty'));
									}
								},
								{
									title:
										'The initial value defined for a property is returned as the result when querying the value of that state property on the class',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											myProperty:{value:'initial value'}
										});
										return this.expect ('initial value',_Subclass.get ('myProperty'));
									}
								},
								{
									title:
										'Setting the value for a state property on the class has the effect of setting the initial value for the property for new instances of the class that are created',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											myProperty:{}
										});
										_Subclass.set ({myProperty:'initial value'});
										var _instance = new _Subclass;
										return this.expect ('initial value',_instance.get ('myProperty'));
									}
								},
								{
									title:
										'Setting the value for a state property on the class does not affect the value of the property for instances that have already been created',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											myProperty:{value:'initial value'}
										});
										var _instance = new _Subclass;
										_Subclass.set ({myProperty:'new initial value'});
										return this.expect ('initial value',_instance.get ('myProperty'));
									}
								}
							]
						},
						{
							title:'Test the onChange handlers mechanism',
							test:[
								{
									title:
										'An onChange handler for a state property is executed on the very first change of the value of that property that occurs during construction of the instance',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeHandlerCount = 0
										;
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:function () {_onChangeHandlerCount++}
											}
										});
										var _instance = new _Subclass;
										return this.expect (1,_onChangeHandlerCount);
									}
								},
								{
									title:
										'An onChange handler for a state property is only executed once upon construction when a value specified for the property in the constructor differs from the property\'s initial value',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeHandlerCount = 0
										;
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:function () {_onChangeHandlerCount++}
											}
										});
										var _instance = new _Subclass ({myProperty:'new value'});
										return this.expect (1,_onChangeHandlerCount);
									}
								},
								{
									title:
										'An onChange handler is only executed when the value of a state property has actually changed as a result of a set - not on non-changing sets',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeCount = 0
										;
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:function () {_onChangeCount++}
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:'initial value'});
										_instance.set ({myProperty:'new value'});
										_instance.set ({myProperty:'new value'});
										return this.expect (2,_onChangeCount);
									}
								},
								{
									title:
										'An onChange handler is called as a method on the instance that owns the state property',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_contextForCallingOnChange
										;
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:function () {_contextForCallingOnChange = this}
											}
										});
										var _instance = new _Subclass;
										return this.expect (_instance,_contextForCallingOnChange);
									}
								},
								{
									title:
										'The value of the state property has already changed by the time that an onChange handler is called',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_valueOfPropertyWhenOnChangeCalled
										;
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:function () {
													_valueOfPropertyWhenOnChangeCalled = this.get ('myProperty');
												}
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:'new value'});
										return this.expect ('new value',_valueOfPropertyWhenOnChangeCalled);
									}
								},
								{
									title:
										'An onChange handler can be specified by a string, where that string specifies the name of a method that must be defined for the instance',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeCount = 0
										;
										_Subclass.prototype.someMethod = function () {_onChangeCount++};
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:'someMethod'
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:'new value'});
										return this.expect (2,_onChangeCount);
									}
								},
								{
									title:
										'An array of multiple onChange handlers can be specified for a state property, and all of them are executed, in the order in which they appear in the array',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = []
										;
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:[
													function () {_coverageAndOrder.push ('onChangeHandler1')},
													function () {_coverageAndOrder.push ('onChangeHandler2')},
													function () {_coverageAndOrder.push ('onChangeHandler3')}
												]
											}
										});
										var _instance = new _Subclass;
										return this.expect (
											'onChangeHandler1,onChangeHandler2,onChangeHandler3',
											_coverageAndOrder + ''
										);
									}
								},
								{
									title:
										'An array of multiple onChange handlers may contain a mix of handlers specified by function reference, handlers specified by method name, and nested lists of handlers',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = []
										;
										_Subclass.prototype.someMethod1 = function () {
											_coverageAndOrder.push ('onChangeHandlerSpecifiedByString1');
										};
										_Subclass.prototype.someMethod2 = function () {
											_coverageAndOrder.push ('onChangeHandlerSpecifiedByString2');
										};
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:[
													function () {_coverageAndOrder.push ('onChangeSpecifiedByFunction1')},
													function () {_coverageAndOrder.push ('onChangeSpecifiedByFunction2')},
													function () {_coverageAndOrder.push ('onChangeSpecifiedByFunction3')},
													'someMethod1',
													[
														function () {_coverageAndOrder.push ('onChangeSpecifiedByFunction4')},
														'someMethod2',
														function () {_coverageAndOrder.push ('onChangeSpecifiedByFunction5')}
													]
												]
											}
										});
										var _instance = new _Subclass;
										return this.expect (
											[
												'onChangeSpecifiedByFunction1',
												'onChangeSpecifiedByFunction2',
												'onChangeSpecifiedByFunction3',
												'onChangeHandlerSpecifiedByString1',
												'onChangeSpecifiedByFunction4',
												'onChangeHandlerSpecifiedByString2',
												'onChangeSpecifiedByFunction5'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:
										'All onChange handlers receive a single argument when they are called, which is an object containing the conformed values for all properties being set (not just those that have changed value)',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_argumentsForBarOnChangeHandler,
											_argumentsForMyPropertyOnChangeHandler1,
											_argumentsForMyPropertyOnChangeHandler2,
											_propertiesBeingSet = {
												foo:'the value of foo',
												bar:'the new value of bar',
												myProperty:'new value'
											}
										;
										_Subclass.stateProperties ({
											foo:{
												value:'the value of foo'
											},
											bar:{
												value:'the value of bar',
												onChange:function () {
													_argumentsForBarOnChangeHandler = Uize.copyList (arguments);
												}
											},
											helloWorld:{
												value:'Hello, world!'
											},
											myProperty:{
												value:'initial value',
												onChange:[
													function () {
														_argumentsForMyPropertyOnChangeHandler1 = Uize.copyList (arguments);
													},
													function () {
														_argumentsForMyPropertyOnChangeHandler2 = Uize.copyList (arguments);
													}
												]
											}
										});
										var _instance = new _Subclass;
										_instance.set (_propertiesBeingSet);
										return (
											this.expect ([_propertiesBeingSet],_argumentsForBarOnChangeHandler) &&
											this.expect ([_propertiesBeingSet],_argumentsForMyPropertyOnChangeHandler1) &&
											this.expect ([_propertiesBeingSet],_argumentsForMyPropertyOnChangeHandler2)
										);
									}
								},
								{
									title:
										'The onChange handlers are called for all state properties that have changed value in the course of the same set call',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeHandlerCountForBar,
											_onChangeHandlerCountForHelloWorld,
											_onChangeHandlerCountForMyProperty,
											_coverageAndOrder = []
										;
										_Subclass.stateProperties ({
											foo:{
												value:'the value of foo'
											},
											bar:{
												value:'the value of bar',
												onChange:function () {_onChangeHandlerCountForBar++}
											},
											helloWorld:{
												value:'Hello, world!',
												onChange:function () {_onChangeHandlerCountForHelloWorld++}
											},
											myProperty:{
												value:'initial value',
												onChange:function () {_onChangeHandlerCountForMyProperty++}
											}
										});
										var _instance = new _Subclass;
										_onChangeHandlerCountForBar = _onChangeHandlerCountForHelloWorld = _onChangeHandlerCountForMyProperty = 0;
										_instance.set ({
											foo:'new value of foo',
											bar:'the new value of bar',
											helloWorld:'Hello, world!',
											myProperty:'new value of myProperty'
										});
										return (
											this.expect (1,_onChangeHandlerCountForBar) &&
											this.expect (0,_onChangeHandlerCountForHelloWorld) &&
											this.expect (1,_onChangeHandlerCountForMyProperty)
										);
									}
								},
								{
									title:
										'An onChange handler is not called for any instances of a class when the value of the state property is set on the class',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeCount = 0
										;
										_Subclass.stateProperties ({
											myProperty:{
												value:'initial value',
												onChange:function () {_onChangeCount++}
											}
										});
										var
											_instance1 = new _Subclass,
											_instance2 = new _Subclass,
											_instance3 = new _Subclass,
											_onChangeCountAfterCreatingInstances = _onChangeCount
										;
										_onChangeCount = 0;
										_Subclass.set ({myProperty:'new initial value'});
										return (
											this.expect (3,_onChangeCountAfterCreatingInstances) &&
											this.expect (0,_onChangeCount)
										);
									}
								},
								{
									title:
										'A state property\'s onChange handler is only called for an instance of the class whose value for the property has changed (i.e. no contamination across instances)',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = []
										;
										_Subclass.stateProperties ({
											_name:'name',
											myProperty:{
												value:'initial value',
												onChange:function () {_coverageAndOrder.push (this.get ('name'))}
											}
										});
										var
											_instance1 = new _Subclass ({name:'instance1'}),
											_instance2 = new _Subclass ({name:'instance2'}),
											_instance3 = new _Subclass ({name:'instance3'})
										;
										_coverageAndOrder = [];
										_instance2.set ({myProperty:'new value'});
										return this.expect (['instance2'],_coverageAndOrder);
									}
								},
								{
									title:
										'An onChange handler is only executed if the value of a state property has changed after being conformed, and not just if the pre-conformed value is different from the current value',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_valuesWhenOnChangeCalled = []
										;
										_Subclass.stateProperties ({
											_name:'name',
											myProperty:{
												value:0,
												conformer:function (_value) {
													return Math.max (Math.min (_value,100),0);
												},
												onChange:function () {
													_valuesWhenOnChangeCalled.push (this.get ('myProperty'));
												}
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:-10});
										_instance.set ({myProperty:10});
										_instance.set ({myProperty:10});
										_instance.set ({myProperty:100});
										_instance.set ({myProperty:200});
										_instance.set ({myProperty:-200});
										_instance.set ({myProperty:0});
										return this.expect ([0,10,100,0],_valuesWhenOnChangeCalled);
									}
								},
								{
									title:
										'When the same onChange handler is registered for multiple state properties, it is only executed once - even if the values of all those properties change during a set',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeHandlerSpecifiedByStringCount = 0,
											_onChangeHandlerSpecifiedByFunctionCount = 0
										;
										_Subclass.prototype.someMethod = function () {_onChangeHandlerSpecifiedByStringCount++};
										function _onChangeHandlerFunction () {_onChangeHandlerSpecifiedByFunctionCount++}
										_Subclass.stateProperties ({
											myProperty1:{
												value:'initial value',
												onChange:[
													'someMethod',
													_onChangeHandlerFunction
												]
											},
											myProperty2:{
												value:'initial value',
												onChange:[
													'someMethod',
													_onChangeHandlerFunction
												]
											},
											myProperty3:{
												value:'initial value',
												onChange:[
													'someMethod',
													_onChangeHandlerFunction
												]
											}
										});
										var _instance = new _Subclass;
										_instance.set ({
											myProperty1:'new value',
											myProperty2:'new value',
											myProperty3:'new value'
										});
										return (
											this.expect (2,_onChangeHandlerSpecifiedByStringCount) &&
											this.expect (2,_onChangeHandlerSpecifiedByFunctionCount)
										);
									}
								},
								{
									title:
										'The execute-once optimization for onChange handlers shared across properties does not prevent an onChange handler from executing on subsequent sets (i.e. cleanup occurs correctly)',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_onChangeHandlerCount = 0,
											_myProperty1NewValue = 0,
											_myProperty2NewValue = 0,
											_myProperty3NewValue = 0
										;
										function _onChangeHandlerFunction () {_onChangeHandlerCount++}
										_Subclass.stateProperties ({
											myProperty1:{onChange:_onChangeHandlerFunction},
											myProperty2:{onChange:_onChangeHandlerFunction},
											myProperty3:{onChange:_onChangeHandlerFunction}
										});
										var _instance = new _Subclass;
										_instance.set ({
											myProperty1:++_myProperty1NewValue,
											myProperty2:++_myProperty2NewValue,
											myProperty3:++_myProperty3NewValue
										});
										_instance.set ({myProperty1:++_myProperty1NewValue});
										_instance.set ({myProperty2:++_myProperty2NewValue});
										_instance.set ({myProperty3:++_myProperty3NewValue});
										return this.expect (4,_onChangeHandlerCount);
									}
								},
								{
									title:
										'The execute-once optimization for onChange handlers shared across properties does not prevent an onChange handler from executing on chain reaction sets, because the redundancy elimination is contained to the scope of a single instance of a set call',
									test:function () {
										function _sharedOnChangeA (_propertiesBeingSet) {
											if ('foo' in _propertiesBeingSet) this.set ({bar:this.get('foo') + 2});
										}
										function _sharedOnChangeB (_propertiesBeingSet) {
											if ('bar' in _propertiesBeingSet) this.set ({baz:this.get('bar') * 2});
										}
										var
											_MyClass = Uize.Class.subclass ({
												stateProperties:{
													foo:{
														value:10,
														onChange:[_sharedOnChangeA,_sharedOnChangeB]
													},
													bar:{
														value:20,
														onChange:[_sharedOnChangeA,_sharedOnChangeB]
													},
													baz:{
														value:3
													}
												}
											}),
											_myInstance = _MyClass ()
										;
										_myInstance.set ({foo:30});

										return this.expect (64,_myInstance.get ('baz'));
									}
								}
							]
						},
						{
							title:'Test the conformer mechanism',
							test:[
								{
									title:
										'A state property\'s conformer function is called as an instance method on the instance for which the property values are being set',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_contextForConformerCall
										;
										_Subclass.stateProperties ({
											myProperty:{
												conformer:function () {_contextForConformerCall = this},
												value:5
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:42});
										return this.expectSameAs (_instance,_contextForConformerCall);
									}
								},
								{
									title:
										'A state property\'s conformer function is called with two arguments, where the first argument is the new value being set for the property, and the second argument is the current value of the property',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_expectedConformerArguments = [42,5],
											_actualConformerArguments
										;
										_Subclass.stateProperties ({
											myProperty:{
												conformer:function (_newValue,_currentValue) {
													_actualConformerArguments = Uize.copyList (arguments);
													return _newValue;
												},
												value:5
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:42});
										return this.expect (_expectedConformerArguments,_actualConformerArguments);
									}
								},
								{
									title:
										'The value returned by a conformer function is treated as the new value to be set for the property',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											myProperty:{
												conformer:function () {return 'foo'},
												value:5
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:42});
										return this.expect ('foo',_instance.get ('myProperty'));
									}
								},
								{
									title:
										'A state property\'s conformer function is executed before the value of the property has changed',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_myPropertyValuesWhenConformerCalled = [],
											_expectedPropertyValuesWhenConformerCalled = [undefined,5]
										;
										_Subclass.stateProperties ({
											myProperty:{
												conformer:function (_newValue) {
													_myPropertyValuesWhenConformerCalled.push (this.get ('myProperty'));
													return _newValue;
												},
												value:5
											}
										});
										var _instance = new _Subclass;
										_instance.set ({myProperty:42});
										return this.expect (
											_expectedPropertyValuesWhenConformerCalled,_myPropertyValuesWhenConformerCalled
										);
									}
								},
								{
									title:
										'A state property\'s conformer function is called before its onChange handlers are called',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_expectedExecutionOrder = ['conformer','onChange'],
											_actualExecutionOrder = []
										;
										_Subclass.stateProperties ({
											myProperty:{
												conformer:function (_newValue) {
													_actualExecutionOrder.push ('conformer');
													return _newValue;
												},
												onChange:function () {_actualExecutionOrder.push ('onChange')},
												value:5
											}
										});
										var _instance = new _Subclass;
										return this.expect (_expectedExecutionOrder,_actualExecutionOrder);
									}
								},
								{
									title:
										'If a state property\'s value does not change as a result of the action of a conformer, then the property\'s onChange handlers are not executed',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_expectedExecutionOrder = ['conformer'],
											_actualExecutionOrder = []
										;
										_Subclass.stateProperties ({
											myProperty:{
												conformer:function (_newValue,_oldValue) {
													_actualExecutionOrder.push ('conformer');
													return _oldValue;
												},
												onChange:function () {_actualExecutionOrder.push ('onChange')},
												value:5
											}
										});
										var _instance = new _Subclass;
										return this.expect (_expectedExecutionOrder,_actualExecutionOrder);
									}
								}
							]
						},
						{
							title:'Test the Changed.[propertyName] event mechanism',
							test:[
								{
									title:
										'The Changed.[propertyName] event for a property is not fired when the property\'s value is set but doesn\'t change value',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_changedEventCount = 0
										;
										_Subclass.stateProperties ({
											myProperty:{value:'initial value'}
										});
										var _instance = new _Subclass;
										_instance.wire ('Changed.myProperty',function () {_changedEventCount++});
										_instance.set ({myProperty:'initial value'});
										return this.expect (0,_changedEventCount);
									}
								},
								{
									title:
										'The Changed.[propertyName] event for a property is fired when the property\'s value changes during a set',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_changedEventCount = 0
										;
										_Subclass.stateProperties ({
											myProperty:{value:'initial value'}
										});
										var _instance = new _Subclass;
										_instance.wire ('Changed.myProperty',function () {_changedEventCount++});
										_instance.set ({myProperty:'new value'});
										return this.expect (1,_changedEventCount);
									}
								},
								{
									title:
										'The event object for a Changed.[propertyName] event contains a newValue property that contains the new value for the property whose value has changed',
									test:function () {
										var
											_Subclass = Uize.Class.subclass ({
												stateProperties:{myProperty:{value:'initial value'}}
											}),
											_instance = new _Subclass,
											_valueOfNewValueProperty
										;
										_instance.wire (
											'Changed.myProperty',
											function (_event) {_valueOfNewValueProperty = _event.newValue}
										);
										_instance.set ({myProperty:'new value'});
										return this.expect ('new value',_valueOfNewValueProperty);
									}
								},
								{
									title:
										'The Changed.[propertyName] events for state properties that have changed value are fired after all the onChange handlers for the properties have been executed',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = []
										;
										_Subclass.stateProperties ({
											myProperty1:{
												value:'myProperty1 initial value',
												onChange:[
													function () {_coverageAndOrder.push ('myProperty1 onChange handler 1')},
													function () {_coverageAndOrder.push ('myProperty1 onChange handler 2')}
												]
											},
											myProperty2:{
												value:'myProperty2 initial value',
												onChange:[
													function () {_coverageAndOrder.push ('myProperty2 onChange handler 1')},
													function () {_coverageAndOrder.push ('myProperty2 onChange handler 2')}
												]
											}
										});
										var _instance = new _Subclass;
										_coverageAndOrder = [];
										_instance.wire (
											'Changed.myProperty1',
											function () {_coverageAndOrder.push ('Changed.myProperty1 handler')}
										);
										_instance.wire (
											'Changed.myProperty2',
											function () {_coverageAndOrder.push ('Changed.myProperty2 handler')}
										);
										_instance.set ({
											myProperty1:'myProperty1 new value',
											myProperty2:'myProperty2 new value'
										});
										return this.expect (
											[
												'myProperty1 onChange handler 1',
												'myProperty1 onChange handler 2',
												'myProperty2 onChange handler 1',
												'myProperty2 onChange handler 2',
												'Changed.myProperty1 handler',
												'Changed.myProperty2 handler'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:
										'The Changed.[propertyName] events for state properties that have changed value are fired in the order in which the properties are set - not the order in which they were declared',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = []
										;
										_Subclass.stateProperties ({
											myProperty1:{value:'myProperty1 initial value'},
											myProperty2:{value:'myProperty2 initial value'}
										});
										var _instance = new _Subclass;
										_instance.wire (
											'Changed.myProperty1',
											function () {_coverageAndOrder.push ('Changed.myProperty1 handler')}
										);
										_instance.wire (
											'Changed.myProperty2',
											function () {_coverageAndOrder.push ('Changed.myProperty2 handler')}
										);
										_instance.set ({
											myProperty2:'myProperty2 new value',
											myProperty1:'myProperty1 new value'
										});
										return this.expect (
											[
												'Changed.myProperty2 handler',
												'Changed.myProperty1 handler'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:
										'Handlers for the special Changed.[propertyName] event can be wired, unwired, and rewired just like any regular event',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = [],
											_newValue = 0
										;
										_Subclass.stateProperties ({myProperty:{}});
										var _instance = new _Subclass;

										function _makeHandler (_handlerNo) {
											return function () {
												_coverageAndOrder.push (
													'handler ' + _handlerNo + ', value = ' + _instance.get ('myProperty')
												);
											}
										}
										var
											_handler1 = _makeHandler (1),
											_handler2 = _makeHandler (2)
										;
										_instance.wire ('Changed.myProperty',_handler1);
										_instance.wire ('Changed.myProperty',_handler2);
										_instance.set ('myProperty',++_newValue);
										_instance.unwire ('Changed.myProperty',_handler1);
										_instance.set ('myProperty',++_newValue);
										_instance.wire ('Changed.myProperty',_handler1);
										_instance.set ('myProperty',++_newValue);
										_instance.unwire ('Changed.myProperty');
										_instance.set ('myProperty',++_newValue);

										return this.expect (
											[
												'handler 1, value = 1',
												'handler 2, value = 1',
												'handler 2, value = 2',
												'handler 2, value = 3',
												'handler 1, value = 3'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:'Test premature wiring of a Changed.[propertyName] event',
									test:[
										{
											title:
												'Wiring a handler for a Changed.[propertyName] event for a property that has not been declared does not produce a JavaScript error',
											test:function () {
												var
													_Subclass = Uize.Class.subclass (),
													_instance = new _Subclass
												;
												_instance.wire ('Changed.nonExistentProperty',Uize.nop);
												return true;
											}
										},
										{
											title:
												'A handler can be wired for a Changed.[propertyName] event for a property that is not yet declared, and it will get executed when the property is later declared and its value changes',
											test:function () {
												var
													_Subclass = Uize.Class.subclass (),
													_instance = new _Subclass,
													_changedHandlerCount = 0
												;
												_instance.wire (
													'Changed.myProperty',
													function () {_changedHandlerCount++}
												);
												_Subclass.stateProperties ({myProperty:{}});
												_instance.set ({myProperty:'foo'});
												return this.expect (1,_changedHandlerCount);
											}
										},
										{
											title:
												'A handler can be wired for a Changed.[propertyName] event for a property that is not yet declared, and it will get executed if the property is created in an ad hoc fashion by setting its value',
											test:function () {
												var
													_Subclass = Uize.Class.subclass (),
													_instance = new _Subclass,
													_changedHandlerCount = 0
												;
												_instance.wire (
													'Changed.myProperty',
													function () {_changedHandlerCount++}
												);
												_instance.set ({myProperty:'foo'});
												return this.expect (1,_changedHandlerCount);
											}
										}
									]
								}
							]
						},
						{
							title:'Test the Changed.* event mechanism',
							test:[
								{
									title:
										'The Changed.* event is not fired if no state properties have changed value during a set',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_changedDotStarHandlerCount = 0
										;
										_Subclass.stateProperties ({
											myProperty1:{value:'initial value'},
											myProperty2:{value:'initial value'},
											myProperty3:{value:'initial value'}
										});
										var _instance = new _Subclass;
										_instance.wire ('Changed.*',function () {_changedDotStarHandlerCount++});
										_instance.set ({
											myProperty1:'initial value',
											myProperty2:'initial value',
											myProperty3:'initial value'
										});
										return this.expect (0,_changedDotStarHandlerCount);
									}
								},
								{
									title:'The Changed.* event is fired if any state property has changed value during a set',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_changedDotStarHandlerCount = 0
										;
										_Subclass.stateProperties ({
											myProperty1:{value:'initial value'},
											myProperty2:{value:'initial value'},
											myProperty3:{value:'initial value'}
										});
										var _instance = new _Subclass;
										_instance.wire ('Changed.*',function () {_changedDotStarHandlerCount++});
										_instance.set ('myProperty1','new value');
										_instance.set ('myProperty2','new value');
										_instance.set ('myProperty3','new value');
										return this.expect (3,_changedDotStarHandlerCount);
									}
								},
								{
									title:
										'The Changed.* event is fired only once when multiple state properties have changed value',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_changedDotStarHandlerCount = 0
										;
										_Subclass.stateProperties ({
											myProperty1:{value:'initial value'},
											myProperty2:{value:'initial value'},
											myProperty3:{value:'initial value'}
										});
										var _instance = new _Subclass;
										_instance.wire ('Changed.*',function () {_changedDotStarHandlerCount++});
										_instance.set ({
											myProperty1:'new value',
											myProperty2:'new value',
											myProperty3:'new value'
										});
										return this.expect (1,_changedDotStarHandlerCount);
									}
								},
								{
									title:
										'The event object for the Changed.* event contains a properties property, which is an object containing values for only those properties that have changed value',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_eventObjectPropertiesProperty
										;
										_Subclass.stateProperties ({
											myProperty1:{value:'initial value'},
											myProperty2:{value:'initial value'},
											myProperty3:{value:'initial value'}
										});
										var _instance = new _Subclass;
										_instance.wire (
											'Changed.*',
											function (_event) {_eventObjectPropertiesProperty = _event.properties}
										);
										_instance.set ({
											myProperty2:'initial value',
											myProperty3:'new value'
										});
										return this.expect ({myProperty3:'new value'},_eventObjectPropertiesProperty);
									}
								},
								{
									title:
										'The Changed.* event is fired after all the onChange handlers for state properties that have changed value have been executed, but before handlers for the Changed.[propertyName] events for individual properties are executed',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = []
										;
										_Subclass.stateProperties ({
											myProperty1:{
												value:'myProperty1 initial value',
												onChange:[
													function () {_coverageAndOrder.push ('myProperty1 onChange handler 1')},
													function () {_coverageAndOrder.push ('myProperty1 onChange handler 2')}
												]
											},
											myProperty2:{
												value:'myProperty2 initial value',
												onChange:[
													function () {_coverageAndOrder.push ('myProperty2 onChange handler 1')},
													function () {_coverageAndOrder.push ('myProperty2 onChange handler 2')}
												]
											}
										});
										var _instance = new _Subclass;
										_coverageAndOrder = [];
										_instance.wire ({
											'Changed.myProperty1':
												function () {_coverageAndOrder.push ('Changed.myProperty1 handler')},
											'Changed.myProperty2':
												function () {_coverageAndOrder.push ('Changed.myProperty2 handler')},
											'Changed.*':
												function () {_coverageAndOrder.push ('Changed.* handler')}
										});
										_instance.set ({
											myProperty1:'myProperty1 new value',
											myProperty2:'myProperty2 new value'
										});
										return this.expect (
											[
												'myProperty1 onChange handler 1',
												'myProperty1 onChange handler 2',
												'myProperty2 onChange handler 1',
												'myProperty2 onChange handler 2',
												'Changed.* handler',
												'Changed.myProperty1 handler',
												'Changed.myProperty2 handler'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:
										'Handlers for the special Changed.* event can be wired, unwired, and rewired just like any regular event',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = [],
											_newValue = 0
										;
										_Subclass.stateProperties ({myProperty:{}});
										var _instance = new _Subclass;

										function _makeHandler (_handlerNo) {
											return function () {
												_coverageAndOrder.push (
													'handler ' + _handlerNo + ', value = ' + _instance.get ('myProperty')
												);
											}
										}
										var
											_handler1 = _makeHandler (1),
											_handler2 = _makeHandler (2)
										;
										_instance.wire ('Changed.*',_handler1);
										_instance.wire ('Changed.*',_handler2);
										_instance.set ('myProperty',++_newValue);
										_instance.unwire ('Changed.*',_handler1);
										_instance.set ('myProperty',++_newValue);
										_instance.wire ('Changed.*',_handler1);
										_instance.set ('myProperty',++_newValue);
										_instance.unwire ('Changed.*');
										_instance.set ('myProperty',++_newValue);

										return this.expect (
											[
												'handler 1, value = 1',
												'handler 2, value = 1',
												'handler 2, value = 2',
												'handler 2, value = 3',
												'handler 1, value = 3'
											],
											_coverageAndOrder
										);
									}
								}
							]
						},
						{
							title:'State properties can have aliases',
							test:[
								{
									title:
										'A state property can have multiple aliases, and its value can be set through any of those aliases',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_valueAfterSetUsingCanonicalName,
											_valueAfterSetUsingAlias1,
											_valueAfterSetUsingAlias2
										;
										_Subclass.stateProperties ({
											_myProperty:{name:'myProperty|myPropertyAlias1|myPropertyAlias2'}
										});
										var _instance = new _Subclass;
										_instance.set ('myProperty','value set using canonical name');
										_valueAfterSetUsingCanonicalName = _instance.get ('myProperty');
										_instance.set ('myPropertyAlias1','value set using alias 1');
										_valueAfterSetUsingAlias1 = _instance.get ('myProperty');
										_instance.set ('myPropertyAlias2','value set using alias 2');
										_valueAfterSetUsingAlias2 = _instance.get ('myProperty');
										return (
											this.expect ('value set using canonical name',_valueAfterSetUsingCanonicalName) &&
											this.expect ('value set using alias 1',_valueAfterSetUsingAlias1) &&
											this.expect ('value set using alias 2',_valueAfterSetUsingAlias2)
										);
									}
								},
								{
									title:
										'Getting the values for all state properties results in the values of state properties with aliases being reported only through their canonical (non-alias) names',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											_myProperty1:'myProperty1',
											_myProperty2:'myProperty2|myProperty2Alias1',
											_myProperty3:'myProperty3|myProperty3Alias1|myProperty3Alias2'
										});
										var _instance = new _Subclass;
										return this.expect (
											{
												myProperty1:undefined,
												myProperty2:undefined,
												myProperty3:undefined
											},
											_instance.get ()
										);
									}
								},
								{
									title:
										'Aliases can be specified using the minimal profile syntax as well as the complete profile syntax',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											_myProperty1:'myProperty1|myProperty1Alias',
											_myProperty2:{name:'myProperty2|myProperty2Alias'}
										});
										var _instance = new _Subclass;
										_instance.set ({
											myProperty1Alias:'myProperty1 value',
											myProperty2Alias:'myProperty2 value'
										});
										return this.expect (
											{myProperty1:'myProperty1 value',myProperty2:'myProperty2 value'},
											_instance.get ()
										);
									}
								},
								{
									title:
										'A value can be set for a state property using any of its aliases in the constructor when creating an instance',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											_myProperty1:'myProperty1|myProperty1Alias1|myProperty1Alias2',
											_myProperty2:'myProperty2|myProperty2Alias1|myProperty2Alias2',
											_myProperty3:'myProperty3|myProperty3Alias1|myProperty3Alias2'
										});
										var _instance = new _Subclass ({
											myProperty1:'myProperty1 value',
											myProperty2Alias1:'myProperty2 value',
											myProperty3Alias2:'myProperty3 value'
										});
										return this.expect (
											{
												myProperty1:'myProperty1 value',
												myProperty2:'myProperty2 value',
												myProperty3:'myProperty3 value'
											},
											_instance.get ()
										);
									}
								},
								{
									title:'A state property\'s value can be accessed using any of its declared aliases',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.stateProperties ({
											_myProperty:{
												name:'myProperty|myPropertyAlias1|myPropertyAlias2',
												value:'myProperty value'
											}
										});
										var _instance = new _Subclass;
										return (
											this.expect ('myProperty value',_instance.get ('myProperty')) &&
											this.expect ('myProperty value',_instance.get ('myPropertyAlias1')) &&
											this.expect ('myProperty value',_instance.get ('myPropertyAlias2'))
										);
									}
								},
								{
									title:
										'Handlers can be wired for the Changed.[propertyName] event of a state property, using any one of its alias names or its canonical name',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = []
										;
										_Subclass.stateProperties ({
											_myProperty:'myProperty|myPropertyAlias1|myPropertyAlias2'
										});
										var _instance = new _Subclass;
										_instance.wire (
											'Changed.myProperty',
											function () {_coverageAndOrder.push ('handler for Changed.myProperty')}
										);
										_instance.wire (
											'Changed.myPropertyAlias1',
											function () {_coverageAndOrder.push ('handler for Changed.myPropertyAlias1')}
										);
										_instance.wire (
											'Changed.myPropertyAlias2',
											function () {_coverageAndOrder.push ('handler for Changed.myPropertyAlias2')}
										);
										_instance.set ({myProperty:'foo'});
										return this.expect (
											[
												'handler for Changed.myProperty',
												'handler for Changed.myPropertyAlias1',
												'handler for Changed.myPropertyAlias2'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:
										'Handlers can be unwired for the Changed.[propertyName] event of a state property, using any one of its alias names or its canonical name',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = [],
											_newValue = 0
										;
										_Subclass.stateProperties ({
											_myProperty:'myProperty|myPropertyAlias1|myPropertyAlias2'
										});
										var _instance = new _Subclass;

										function _changedHandler1 () {_coverageAndOrder.push ('changed handler 1')}
										function _changedHandler2 () {_coverageAndOrder.push ('changed handler 2')}
										function _changedHandler3 () {_coverageAndOrder.push ('changed handler 3')}

										_instance.wire ('Changed.myProperty',_changedHandler1);
										_instance.wire ('Changed.myProperty',_changedHandler2);
										_instance.wire ('Changed.myProperty',_changedHandler3);

										_instance.set ('myProperty',++_newValue);
										_instance.unwire ('Changed.myProperty',_changedHandler1);
										_instance.set ('myProperty',++_newValue);
										_instance.unwire ('Changed.myPropertyAlias1',_changedHandler2);
										_instance.set ('myProperty',++_newValue);
										_instance.unwire ('Changed.myPropertyAlias2',_changedHandler3);
										_instance.set ('myProperty',++_newValue);

										return this.expect (
											[
												'changed handler 1',
												'changed handler 2',
												'changed handler 3',
												'changed handler 2',
												'changed handler 3',
												'changed handler 3'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:
										'The canonical name of a state property is used for the name of the Changed.[propertyName] event that is fired when the property\'s value is changed, regardless of which alias is used when setting the property\'s value',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_coverageAndOrder = [],
											_newValue = 0
										;
										_Subclass.stateProperties ({
											_myProperty:'myProperty|myPropertyAlias1|myPropertyAlias2'
										});
										var _instance = new _Subclass;

										function _changedHandler1 () {_coverageAndOrder.push ('changed handler 1')}
										function _changedHandler2 () {_coverageAndOrder.push ('changed handler 2')}
										function _changedHandler3 () {_coverageAndOrder.push ('changed handler 3')}

										_instance.wire ('Changed.myProperty',_changedHandler1);
										_instance.wire ('Changed.myPropertyAlias1',_changedHandler2);
										_instance.wire ('Changed.myPropertyAlias2',_changedHandler3);

										_instance.set ('myProperty',++_newValue);
										_instance.set ('myPropertyAlias1',++_newValue);
										_instance.set ('myPropertyAlias2',++_newValue);

										return this.expect (
											[
												'changed handler 1','changed handler 2','changed handler 3',
												'changed handler 1','changed handler 2','changed handler 3',
												'changed handler 1','changed handler 2','changed handler 3'
											],
											_coverageAndOrder
										);
									}
								},
								{
									title:
										'The canonical name of a state property is used for the properties-being-set object that is passed as a parameter to an onChange handler for the state property',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_propertiesBeingSetLog = [],
											_newValue = 0
										;
										_Subclass.stateProperties ({
											_myProperty:{
												name:'myProperty|myPropertyAlias1|myPropertyAlias2',
												onChange:function (_propertiesBeingSet) {
													_propertiesBeingSetLog.push (_propertiesBeingSet);
												}
											}
										});
										var _instance = new _Subclass;

										_instance.set ('myProperty',++_newValue);
										_instance.set ('myPropertyAlias1',++_newValue);
										_instance.set ('myPropertyAlias2',++_newValue);

										return this.expect (
											[
												{myProperty:1},
												{myProperty:2},
												{myProperty:3}
											],
											_propertiesBeingSetLog
										);
									}
								},
								{
									title:
										'The canonical names of state properties are used for the properties object that is provided in the event object for Changed.* events',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_changedDotStarEventObjectPropertiesLog = [],
											_newValue = 0
										;
										_Subclass.stateProperties ({
											_myProperty:'myProperty|myPropertyAlias1|myPropertyAlias2'
										});
										var _instance = new _Subclass;

										_instance.wire (
											'Changed.*',
											function (_event) {_changedDotStarEventObjectPropertiesLog.push (_event.properties)}
										);

										_instance.set ('myProperty',++_newValue);
										_instance.set ('myPropertyAlias1',++_newValue);
										_instance.set ('myPropertyAlias2',++_newValue);

										return this.expect (
											[
												{myProperty:1},
												{myProperty:2},
												{myProperty:3}
											],
											_changedDotStarEventObjectPropertiesLog
										);
									}
								}
							]
						},
						{
							title:'The values specified for state properties when calling a class\' constructor are respected',
							test:function () {
								var _Subclass = Uize.Class.subclass ();
								_Subclass.stateProperties ({
									_myProperty1:{
										name:'myProperty1',
										value:'myProperty1 initial value'
									},
									_myProperty2:{
										name:'myProperty2',
										value:'myProperty2 initial value'
									},
									_myProperty3:{
										name:'myProperty3',
										value:'myProperty3 initial value'
									}
								});
								var _instance = new _Subclass ({
									myProperty1:'myProperty1 new value',
									_myProperty2:'myProperty2 new value'
								});
								return (
									this.expect ('myProperty1 new value',_instance._myProperty1) &&
									this.expect ('myProperty2 new value',_instance._myProperty2) &&
									this.expect ('myProperty3 initial value',_instance._myProperty3)
								);
							}
						},
						{
							title:'State properties can be created in an ad hoc fashion',
							test:[
								{
									title:
										'State properties can be created in an ad hoc fashion, by setting values for undeclared properties using the set static method',
									test:function () {
										var _Subclass = Uize.Class.subclass ();
										_Subclass.set ({foo:'bar'});
										var _instance = new _Subclass;
										return this.expect ({foo:'bar'},_instance.get ());
									}
								},
								{
									title:
										'When properties are created for an instance in an ad hoc fashion, by setting values for the undeclared properties using the set instance method, those instance ad hoc properties are not declared on the class',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_instance1 = new _Subclass
										;
										_instance1.set ({foo:'bar'});
										var _instance2 = new _Subclass;
										return (
											this.expect ({},_Subclass.get ()) &&
											this.expect ({},_instance2.get ())
										);
									}
								},
								{
									title:
										'When properties are created for an instance in an ad hoc fashion, by specifying values for undeclared properties when calling the constructor, those instance ad hoc properties are not declared on the class',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_instance1 = new _Subclass ({foo:'bar'}),
											_instance2 = new _Subclass
										;
										return (
											this.expect ({},_Subclass.get ()) &&
											this.expect ({},_instance2.get ())
										);
									}
								},
								{
									title:
										'For properties that are created for an instance in an ad hoc fashion, the values are contained in the object that is returned by the form of the get instance method that takes no parameters',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_instance = new _Subclass
										;
										_instance.set ({foo:'bar'});
										return this.expect ({foo:'bar'},_instance.get ());
									}
								},
								{
									title:
										'The special Changed.* event is fired for instance properties that are created in an ad hoc fashion, by setting values for undeclared properties using the set instance method',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_instance = new _Subclass,
											_changedEventWasFired,
											_eventObjectPropertiesProperty,
											_adHocProperties = {
												foo:'bar',
												hello:'world'
											}
										;
										_instance.wire (
											'Changed.*',
											function (_event) {
												_changedEventWasFired = true;
												_eventObjectPropertiesProperty = _event.properties;
											}
										);
										_instance.set (_adHocProperties);
										return (
											this.expect (true,_changedEventWasFired) &&
											this.expect (_adHocProperties,_eventObjectPropertiesProperty)
										);
									}
								}
							]
						}
					]
				},
				{
					title:'Instances provide methods for a conditions mechanism',
					test:[
						{
							title:'Test that the is instance method works correctly',
							test:[
								{
									title:'The value false is returned when the specified condition property is not declared',
									test:function () {
										var
											_Subclass = Uize.Class.subclass (),
											_instance = new _Subclass
										;
										return this.expect (false,_instance.is ('nonExistentProperty'));
									}
								},
								{
									title:'The value true is returned for all truthy values of the specified condition property, while the value false is returned for all falsy values of the property',
									test:function () {
										var _Class = Uize.Class.subclass ();
										_Class.stateProperties ({myProperty:{}});
										var _instance = _Class ();
										return this.expect (
											Uize.map (_falsyAndTruthyValues,'!!value'),
											Uize.map (
												_falsyAndTruthyValues,
												function (_value) {
													_instance.set ({myProperty:_value});
													return _instance.is ('myProperty');
												}
											)
										);
									}
								}
							]
						},
						_metUnmetMethodTest (true),
						_metUnmetMethodTest (false),
						{
							title:'Test support for compound conditions',
							test:[
								{
									title:'Test that the once instance method works correctly',
									test:[
										_onceMethodTest (false),
										_onceMethodTest (true),
										{
											title:'Test that specifying an array of property names for the condition is handled correctly',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													phase1Done:{value:false},
													phase2Done:{value:false},
													phase3Done:{value:false}
												});
												var
													_instance = _Class (),
													_valuesPassedToHandler = []
												;
												_instance.once (
													['phase1Done','phase2Done','phase3Done'],
													function () {_valuesPassedToHandler.push ([].slice.call (arguments))}
												);
												_instance.set ({phase1Done:1});
												_instance.set ({phase2Done:true});
												_instance.set ({phase3Done:'foo'});
												return this.expect ([[1,true,'foo']],_valuesPassedToHandler);
											}
										},
										{
											title:'When specifying an array of property names for the condition, prefixing some property names with a "!" to not their value is handled correctly',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													ready:{value:false},
													empty:{value:true}
												});
												var
													_instance = _Class (),
													_valuesPassedToHandler = []
												;
												_instance.once (
													['ready','!empty'],
													function () {_valuesPassedToHandler.push ([].slice.call (arguments))}
												);
												_instance.set ({ready:true});
												_instance.set ({empty:false});
												return this.expect ([[true,false]],_valuesPassedToHandler);
											}
										},
										{
											title:'When specifying an array of property names for the condition, property names may contain spaces and special characters',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													'property name with spaces':{value:false},
													'~@#$%^&*(){}[]:;<>,.?/':{value:false}
												});
												var
													_instance = _Class (),
													_valuesPassedToHandler = []
												;
												_instance.once (
													['property name with spaces','~@#$%^&*(){}[]:;<>,.?/'],
													function () {_valuesPassedToHandler.push ([].slice.call (arguments))}
												);
												_instance.set ({'property name with spaces':42});
												_instance.set ({'~@#$%^&*(){}[]:;<>,.?/':'forty two'});
												return this.expect ([[42,'forty two']],_valuesPassedToHandler);
											}
										},
										{
											title:'Test that specifying a comma-separated list of property names for the condition is handled correctly',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													phase1Done:{value:false},
													phase2Done:{value:false},
													phase3Done:{value:false}
												});
												var
													_instance = _Class (),
													_valuesPassedToHandler = []
												;
												_instance.once (
													'phase1Done, phase2Done, phase3Done',
													function () {_valuesPassedToHandler.push ([].slice.call (arguments))}
												);
												_instance.set ({phase1Done:1});
												_instance.set ({phase2Done:true});
												_instance.set ({phase3Done:'foo'});
												return this.expect ([[1,true,'foo']],_valuesPassedToHandler);
											}
										},
										{
											title:'When specifying a comma-separated list of property names for the condition, prefixing some property names with a "!" to not their value is handled correctly',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													ready:{value:false},
													empty:{value:true}
												});
												var
													_instance = _Class (),
													_valuesPassedToHandler = []
												;
												_instance.once (
													'ready, !empty',
													function () {_valuesPassedToHandler.push ([].slice.call (arguments))}
												);
												_instance.set ({ready:true});
												_instance.set ({empty:false});
												return this.expect ([[true,false]],_valuesPassedToHandler);
											}
										},
										{
											title:'Test that a compound condition specified as a string, consisting of a properties list and a condition evaluator expression, is handled correctly',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													width:{value:0},
													height:{value:0},
													depth:{value:0}
												});
												var
													_instance = _Class (),
													_valuesPassedToHandler = []
												;
												_instance.once (
													'width, height, depth: width * height * depth > 1000',
													function () {_valuesPassedToHandler.push ([].slice.call (arguments))}
												);
												_instance.set ({width:10});
												_instance.set ({height:11});
												_instance.set ({depth:12});
												return this.expect ([[10,11,12]],_valuesPassedToHandler);
											}
										},
										{
											title:'Test that a compound condition specified as a function is handled correctly',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													width:{value:0},
													height:{value:0},
													depth:{value:0}
												});
												var
													_instance = _Class (),
													_valuesPassedToHandler = []
												;
												_instance.once (
													function (width,height,depth) {return width * height * depth > 1000},
													function () {_valuesPassedToHandler.push ([].slice.call (arguments))}
												);
												_instance.set ({width:10});
												_instance.set ({height:11});
												_instance.set ({depth:12});
												return this.expect ([[10,11,12]],_valuesPassedToHandler);
											}
										},
										{
											title:'A wirings object is returned, that contains wirings for the Changed.[propertyName] event of every property',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													phase1Done:{value:false},
													phase2Done:{value:false},
													phase3Done:{value:false}
												});
												var
													_instance = _Class (),
													_wirings = _instance.once (
														['phase1Done','phase2Done','phase3Done'],
														Uize.nop
													)
												;
												return (
													this.expect (
														['Changed.phase1Done','Changed.phase2Done','Changed.phase3Done'],
														Uize.keys (_wirings)
													) &&
													this.expectType ('function',_wirings ['Changed.phase1Done']) &&
													this.expectType ('function',_wirings ['Changed.phase2Done']) &&
													this.expectType ('function',_wirings ['Changed.phase3Done'])
												);
											}
										},
										{
											title:'Unwiring the event wirings for a compound condition before it is met results in the handler for the condition not being executed',
											test:function () {
												var _Class = Uize.Class.subclass ();
												_Class.stateProperties ({
													phase1Done:{value:false},
													phase2Done:{value:false},
													phase3Done:{value:false}
												});
												var
													_instance = _Class (),
													_handlerCalled = false
												;
												_instance.unwire (
													_instance.once (
														'phase1Done, phase2Done, phase3Done',
														function () {_handlerCalled = true}
													)
												);
												_instance.set ({phase1Done:true,phase2Done:true,phase3Done:true});
												return this.expect (false,_handlerCalled);
											}
										},
										{
											title:'The handler receives the values of all the determinants are arguments',
											test:function () {
												var
													_Class = Uize.Class.subclass ({
														stateProperties:{
															propertyA:{value:false},
															propertyB:{value:0},
															propertyC:{value:''},
															propertyD:{value:null}
														}
													}),
													_actualHandlerArguments,
													_instance = _Class ()
												;
												_instance.once (
													function (propertyA,propertyB,propertyC,propertyD) {
														return propertyA || propertyB || propertyC || propertyD;
													},
													function () {_actualHandlerArguments = Uize.copyList (arguments)}
												);
												_instance.set ({
													propertyA:true,
													propertyB:42,
													propertyC:'hello',
													propertyD:[]
												});
												return this.expect ([true,42,'hello',[]],_actualHandlerArguments);
											}
										}
									]
								}
							]
						},
						{
							title:'Test the onChange instance method',
							test:[
								{
									title:'The handler is executed once upon registering a change handler',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													width:{value:9},
													height:{value:11}
												}
											}),
											_coverageAndOrder = [],
											_instance = _Class ()
										;
										_instance.onChange (
											function (width,height) {return width * height},
											function (_area) {_coverageAndOrder.push (_area)}
										);
										return this.expect ([99],_coverageAndOrder);
									}
								},
								{
									title:'The handler is only executed when the computed value actually changes, not every time the determinants change',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													width:{value:9},
													height:{value:11}
												}
											}),
											_coverageAndOrder = [],
											_instance = _Class ()
										;
										_instance.onChange (
											function (width,height) {return width * height},
											function (_area) {_coverageAndOrder.push (_area)}
										);
										_instance.set ({width:11,height:9});
										_instance.set ({width:10,height:20});
										_instance.set ({width:20,height:10});
										_instance.set ({width:5,height:40});
										_instance.set ({width:5,height:50});
										return this.expect ([99,200,250],_coverageAndOrder);
									}
								},
								{
									title:'A wirings object is returned that allows the change handler to be fully unwired',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													width:{value:9},
													height:{value:11}
												}
											}),
											_coverageAndOrder = [],
											_instance = _Class (),
											_wirings = _instance.onChange (
												function (width,height) {return width * height},
												function (_area) {_coverageAndOrder.push (_area)}
											)
										;
										_instance.unwire (_wirings);
										_instance.set ({width:10,height:20});
										return (
											this.expect ([99],_coverageAndOrder) &&
											this.expect (['Changed.width','Changed.height'],Uize.keys (_wirings))
										);
									}
								},
								{
									title:'The handler receives two arguments, being the derived value and an array containing the values of the determinants',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													width:{value:9},
													height:{value:11}
												}
											}),
											_actualHandlerArguments,
											_instance = _Class ()
										;
										_instance.onChange (
											function (width,height) {return width * height},
											function () {_actualHandlerArguments = Uize.copyList (arguments)}
										);
										return this.expect ([99,[9,11]],_actualHandlerArguments);
									}
								},
								{
									title:'Test that various types of derivation specifiers are supported correctly',
									test:Uize.map (
										[
											{
												title:'Test that a function derivation is supported correctly',
												properties:{width:9,height:11},
												derivation:function (width,height) {return width * height},
												expectedDerivedValue:99
											},
											{
												title:'Test that a string derivation expression is supported correctly',
												properties:{width:9,height:11},
												derivation:'width, height : width * height',
												expectedDerivedValue:99
											},
											{
												title:'Test that a properties array boolean derivation is supported correctly',
												properties:{isSolid:true,isRound:false},
												derivation:['isSolid','isRound'],
												expectedDerivedValue:false
											},
											{
												title:'Test that a properties array boolean derivation, with some inverted properties, is supported correctly',
												properties:{isSolid:true,isRound:false},
												derivation:['isSolid','!isRound'],
												expectedDerivedValue:true
											},
											{
												title:'Test that a properties list string boolean derivation is supported correctly',
												properties:{isSolid:true,isRound:false},
												derivation:'isSolid, isRound',
												expectedDerivedValue:false
											},
											{
												title:'Test that a properties list string boolean derivation, with some inverted properties, is supported correctly',
												properties:{isSolid:true,isRound:false},
												derivation:'isSolid, !isRound',
												expectedDerivedValue:true
											},
											{
												title:'Test that a string property name derivation is supported correctly',
												properties:{LTUAE:42},
												derivation:'LTUAE',
												expectedDerivedValue:42
											},
											{
												title:'Test that a string property name derivation, with inversion, is supported correctly',
												properties:{isSolid:true},
												derivation:'!isSolid',
												expectedDerivedValue:false
											}
										],
										function (_testInfo) {
											return {
												title:_testInfo.title,
												test:function () {
													var
														_actualDerivedValue,
														_Class = Uize.Class.subclass ({set:_testInfo.properties}),
														_instance = _Class ()
													;
													_instance.onChange (
														_testInfo.derivation,
														function (_derivedValue) {_actualDerivedValue = _derivedValue}
													);
													return this.expect (_testInfo.expectedDerivedValue,_actualDerivedValue);
												}
											}
										}
									)
								}
							]
						},
						{
							title:'Test the whenever instance method',
							test:[
								{
									title:'The handler is not executed upon registering a whenever handler if the derivation is not truthy at the time',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													propertyA:{value:false},
													propertyB:{value:true}
												}
											}),
											_instance = _Class (),
											_handlerCalled = false
										;
										_instance.whenever (
											function (propertyA,propertyB) {return propertyA && propertyB},
											function () {_handlerCalled = true}
										);
										return this.expect (false,_handlerCalled);
									}
								},
								{
									title:'The handler is executed immediately upon registering a whenever handler if the derivation is truthy at the time',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													propertyA:{value:true},
													propertyB:{value:true}
												}
											}),
											_instance = _Class (),
											_handlerCalled = false
										;
										_instance.whenever (
											function (propertyA,propertyB) {return propertyA && propertyB},
											function () {_handlerCalled = true}
										);
										return this.expect (true,_handlerCalled);
									}
								},
								{
									title:'The handler is only executed when the computed value actually becomes truthy, not every time the determinants change',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													propertyA:{value:false},
													propertyB:{value:false}
												}
											}),
											_handlerCalled,
											_handlerCalledHistory = [],
											_instance = _Class ()
										;

										_handlerCalled = false;
										_instance.whenever (
											function (propertyA,propertyB) {return propertyA || propertyB},
											function () {_handlerCalled = true}
										);
										_handlerCalledHistory.push (_handlerCalled);

										_handlerCalled = false;
										_instance.set ({propertyA:false,propertyB:true});
										_handlerCalledHistory.push (_handlerCalled);

										_handlerCalled = false;
										_instance.set ({propertyA:true,propertyB:false});
										_handlerCalledHistory.push (_handlerCalled);

										_handlerCalled = false;
										_instance.set ({propertyA:true,propertyB:true});
										_handlerCalledHistory.push (_handlerCalled);

										_handlerCalled = false;
										_instance.set ({propertyA:false,propertyB:false});
										_handlerCalledHistory.push (_handlerCalled);

										return this.expect ([false,true,false,false,false],_handlerCalledHistory);
									}
								},
								{
									title:'A wirings object is returned that allows the whenever handler to be fully unwired',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													propertyA:{value:false},
													propertyB:{value:false}
												}
											}),
											_handlerCalled = false,
											_instance = _Class (),
											_wirings = _instance.whenever (
												function (propertyA,propertyB) {return propertyA || propertyB},
												function () {_handlerCalled = true}
											)
										;
										_instance.unwire (_wirings);
										_instance.set ({propertyA:true,propertyB:true});
										return this.expect (false,_handlerCalled);
									}
								},
								{
									title:'The handler receives the values of all the determinants are arguments',
									test:function () {
										var
											_Class = Uize.Class.subclass ({
												stateProperties:{
													propertyA:{value:false},
													propertyB:{value:0},
													propertyC:{value:''},
													propertyD:{value:null}
												}
											}),
											_actualHandlerArguments,
											_instance = _Class ()
										;
										_instance.whenever (
											function (propertyA,propertyB,propertyC,propertyD) {
												return propertyA || propertyB || propertyC || propertyD;
											},
											function () {_actualHandlerArguments = Uize.copyList (arguments)}
										);
										_instance.set ({
											propertyA:true,
											propertyB:42,
											propertyC:'hello',
											propertyD:[]
										});
										return this.expect ([true,42,'hello',[]],_actualHandlerArguments);
									}
								},
								{
									title:'Test that various types of derivation specifiers are supported correctly',
									test:Uize.map (
										[
											{
												title:'Test that a function derivation is supported correctly',
												derivation:function (propertyA,propertyB) {return propertyA && propertyB},
												falseExpected:{propertyA:false,propertyB:true},
												trueExpected:{propertyA:true,propertyB:true}
											},
											{
												title:'Test that a string derivation expression is supported correctly',
												derivation:'propertyA, propertyB : propertyA && propertyB',
												falseExpected:{propertyA:false,propertyB:true},
												trueExpected:{propertyA:true,propertyB:true}
											},
											{
												title:'Test that a properties array boolean derivation is supported correctly',
												derivation:['propertyA', 'propertyB'],
												falseExpected:{propertyA:false,propertyB:true},
												trueExpected:{propertyA:true,propertyB:true}
											},
											{
												title:'Test that a properties array boolean derivation, with some inverted properties, is supported correctly',
												derivation:['propertyA', '!propertyB'],
												falseExpected:{propertyA:true,propertyB:true},
												trueExpected:{propertyA:true,propertyB:false}
											},
											{
												title:'Test that a properties list string boolean derivation is supported correctly',
												derivation:'propertyA, propertyB',
												falseExpected:{propertyA:false,propertyB:true},
												trueExpected:{propertyA:true,propertyB:true}
											},
											{
												title:'Test that a properties list string boolean derivation, with some inverted properties, is supported correctly',
												derivation:'propertyA, !propertyB',
												falseExpected:{propertyA:true,propertyB:true},
												trueExpected:{propertyA:true,propertyB:false}
											},
											{
												title:'Test that a string property name derivation is supported correctly',
												derivation:'property',
												falseExpected:{property:false},
												trueExpected:{property:true}
											},
											{
												title:'Test that a string property name derivation, with inversion, is supported correctly',
												derivation:'!property',
												falseExpected:{property:true},
												trueExpected:{property:false}
											}
										],
										function (_testInfo) {
											return {
												title:_testInfo.title,
												test:function () {
													var
														_Class = Uize.Class.subclass (),
														_instance = _Class (),
														_handlerCalled = false,
														_handlerCalledAfterFirstSet = false
													;
													_instance.set (_testInfo.falseExpected);
													_instance.whenever (_testInfo.derivation,function () {_handlerCalled = true});
													_handlerCalledAfterFirstSet = _handlerCalled;
													_instance.set (_testInfo.trueExpected);
													return (
														this.expect (false,_handlerCalledAfterFirstSet) &&
														this.expect (true,_handlerCalled)
													);
												}
											}
										}
									)
								}
							]
						}
					]
				}
			]
		});
	}
});

