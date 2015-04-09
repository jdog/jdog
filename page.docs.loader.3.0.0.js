PAGE.add("Docs.loader", {

	"jDog" : "version 3.0.0"

	, "Methods" : [
		{
			"Name" : "addWait"
			, "Usage" : [
					[ "string Path", "array WaitList", "function Callback" ]
				]
			, "Tags" : [ "wait", "module pattern", "asynchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"PAGE.addWait( \n  'Modules.homePage' // path of thing being added \n  , [\n      'ajax'\n      , 'ready'\n      , 'Constructors.APIMethods'\n  ]\n  , function(ref) {\n \n   var exports = { \n     apiMethods : undefined // see below\n   }\n\n   exports.loadPage = function() {\n     ref.ajax(\"/pathToSomething\", {}, function(data) {\n       // ... lots of your code here\n       exports.apiMethods = ref.APIMethods(data)\n     })\n   }\n \n   return exports \n \n  })"
			]
			, "Description" : "Combines the functionality of add and wait into one function. This is useful for creating modules. For those familiar with requirejs this has an almost identical format, with the exception that the callback returns a single object instead of a list of arguments. This format is superior in many ways, as it is nolonger necessary to duplicate the names, or keep track of the order of arguments."
			, "Definitions" : {
				"Path" : "String - Path of the library item required, example 'Constructors.YourConstructor'"
				, "WaitList" : "Array - list of other libraries required before callback is called"
				, "Callback" : "Function to call when all is loaded"
			}
			, "Returns" : "Undefined"
		}

		, {
			"Name" : "addWait$"
			, "Usage" : [
					[ "string Path", "array WaitList", "function Callback" ]
				]
			, "Tags" : [ "wait", "module pattern", "jQuery", "asynchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"PAGE.addWait$(\n 'Modules.jdogAPI'\n , [\n  'ajax'\n  , 'ready'\n  , 'Constructors.APIMethod'\n ],\n function(ref){ ... }))"
				, "PAGE.addWait$(\n \"Modules.home\"\n , [\n  \"Constructors.Validation\"\n  , \"Modules.tracking\"\n ]\n , function(ref) {\n\n  var dog = {\n   $loginForm : $(\"#LoginForm\")\n   , $submit : $(\"#LoginForm button.Submit\")\n  }\n\n  function events() {\n\n   dog.validation = ref.Validation(\n    $(\"#LoginForm\")\n    , function success(data) {\n     ref.tracking.track(\n      \"Submit Success\"\n      , data\n      , function() { window.location = \"/dashboard\" })\n    }\n    , function fail() {\n     ref.tracking.track(\"Submit Failed\") \n    })\n\n   dog.$loginForm.submit(function() {\n    ref.tracking.track(\"Submit\") \n   })\n\n  }\n\n  events()\n\n  return dog\n\n })\n"
			]
			, "Description" : "Combines the functionality of addWait with jQuery's document.ready. This is a useful function for creating modules with jQuery support."
			, "Definitions" : {
				"Path" : "String - Path of the library item required, example 'Constructors.YourConstructor'"
				, "WaitList" : "Array - list of other libraries required before callback is called"
				, "Callback" : "Function to call when all is loaded"
			}
			, "Returns" : "Undefined"
		}

		, {
			"Name" : "extend"
			, "Usage" : [
					[ "function( puppy, dog, log ) { ... }" ]
				]
			, "Tags" : [ "extend", "module pattern", "extensions", "asynchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"PAGE.extend(function(puppy, dog, log) {})"
				, "PAGE.extend(function(inst, proto, log) {})"
				, "PAGE.extend(function(inst, proto, log) {\n\n PAGE.spawn(\"ext.events\", function(dog, eventMap) {\n\n  eventMap = eventMap || { }\n\n  dog.events = eventMap\n\n  dog._uniqueEventMap = { }\n\n  // name of event, function to be called on triggerEvent(name)\n  // events are unique, checking both the string of the function, \n  // and the callee.caller string as a key\n  dog.addEvent = function(name, func) {\n   var index\n   , key = func.toString() + arguments.callee.caller.toString()\n\n   // if the event type does not exist yet, create it\n   if (!dog.events[name]) dog.events[name] = []\n\n   if (!dog._uniqueEventMap[name]) dog._uniqueEventMap[name] = {}\n\n   // get the index from the array if there, otherwise undefined\n   index = dog._uniqueEventMap[name][key]\n\n   if (index !== undefined) {\n    // adds the function to the array, replacing the older one\n    dog.events[name].splice(index, 1, func)\n    return dog\n   } else {\n    index = dog.events[name].push(func)\n   }\n\n   // now add the index to the key\n   dog._uniqueEventMap[name][key] = (index-1)\n   return dog\n  }\n\n  dog.emptyEvent = function(name) {\n   if (!dog.events[name]) return\n   dog.events[name].length = 0\n  }\n\n  // triggers the functions within the named event array\n  dog.triggerEvent = function(name, args) {\n\n   if (!dog.events[name]) return\n   var events = dog.events[name]\n\n   // args = args || []\n   args = Array.prototype.slice.call(arguments)\n   args.splice(0,1)\n\n   if (events.length) {\n    for (var x in events) \n      (typeof events[x] === \"function\" && events[x].apply(this, args ))\n   }\n   return dog\n  }\n\n\n}, proto)\n\n})"
			]
			, "Description" : "This is a function to extend the jDog library. Within the callback are three objects which allow you to overwrite or extend the functionality of jDog itself. Many extensions have already been created, and we hope many more will be made in the future."
			, "Definitions" : {
				"PAGE" : "PAGE is a global variable with both instance properties and prototype properties"
				, "Puppy" : "These are the instance properties (which can also access prototype)"
				, "Dog" : "This is the prototype for PAGE itself"
				, "Log" : "Console logging functionaity"
			}
			, "Returns" : "Undefined"
		}

		, {
			"Name" : "add$"
			, "Usage" : [
					[ "Path", "Thing" ]
				]
			, "Tags" : [ "spawn", "test", "asynchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"PAGE.add$('Modules.login', ( function(){\n\n  var dog = {\n    $root : $(\"#API\")\n    , $links : $(\"#API .sideBar a\")\n  }\n  , ref = dog.ref = { }\n\n  function init() {\n    // do something usefull with these\n    ref.LocalStorage\n    ref.dataService\n  }\n\n  PAGE.wait(\n    \"Constructors.LocalStorage\"\n    , \"Modules.dataService\"\n    , ref\n    , init)\n\n  return dog\n\n}()))"
			]
			, "Description" : [
				"Combines the functionality of 'add' with jQuery ready. This is a very useful feature for jQuery users as it signals it's safe to call the $ (jQuery) variable. However, notice that unlike PAGE.add, add$ returns undefined."
				, "add$ departs from the AMD style of first waiting for required items before running the callback. It does instead the lazy dog style of creating itself and then modifying itself once external libraries are ready."
			]
			, "Definitions" : {
				"Path" : "Path of the item added, example 'Constructors.YourConstructor'"
				, "Thing" : "Any variable or literal"
			}
			, "Returns" : "undefined"
		}

		, {
			"Name" : "exists"
			, "Usage" : [
					[ "Path" ]
					, [ "Path", "Base" ]
					, [ "Path", "Base", "Alternative" ]
				]
			, "Tags" : [ "exists", "synchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"// checks PAGE.Properties.User\nvar user = PAGE.exists('Properties.User')"
				, "// checks window.Properties.User\nvar user = PAGE.exists('Properties.User', window)"
				, "// checks PAGE.Properties.User, \n// return User if it's there, otherwise the alternative object\nvar user = PAGE.exists('Properties.User', PAGE, { Name : 'John Doe' })"
				, "// checks PAGE.Modules.login.submit, \n// return submit if it's there, otherwise the alternative function\nPAGE.exists('Modules.login.submit', PAGE, function(){})()"
				, "// using exists as boolean check\nif (!PAGE.exists('Properties.User.IsSubscribed')) { ... }"
				, "// adds a property using exists\nPAGE.exists('Properties.User', PAGE, {}).LoggedIn = true"
			]
			, "Description" : "Checks to see if this path exists inside the global PAGE variable, or, alternatively, a specific object. Can be very powerful for preventing null reference errors."
			, "Definitions" : {
				"Path" : "Path of the item added, example 'Constructors.YourConstructor'"
				, "Base" : "optional - Object to search in, defaults to PAGE"
				, "Alternate" : "optional - if it's empty, then return this instead"
			}
			, "Returns" : "the item of the path, or undefined, or alternative"
		}

		, {
			"Name" : "waitExists"
			, "Usage" : [
					[ "Path" ]
					, [ "Path", "Callback" ]
					, [ "Path", "Base", "Callback" ]
				]
			, "Tags" : [ "exists", "asynchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"PAGE.waitExists('Properties.User', function(User) { ... })"
				, "PAGE.waitExists('Properties.User', window, function(User) { ... })"
			]
			, "Description" : "Waits for one item to load, then triggers callback. Base is optional"
			, "Definitions" : {
				"Path" : "Path of the item, example 'Constructors.YourConstructor'"
				, "Base" : "optional - Object to search in, defaults to PAGE"
				, "Callback" : "Function to call when all is loaded"
			}
			, "Returns" : "undefined"
		}

		, {
			"Name" : "getType"
			, "Usage" : [
					[ "Thing" ]
				]
			, "Tags" : [ "utility", "synchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"\n var dog = new Number()\n undefined\n PAGE.getType(dog)\n \"Num\"\n "
				, "var elem = document.createElement(\"div\")\n// undefined\nPAGE.getType(elem)\n// \"HTMLDivElement\""
			]
			, "Description" : "This is an exposed internal utility that outputs the type of any kind of thing passed into it. Useful for Array vs Object, or all the kinds of HTML elements. Also has a special type for jQuery. If one of the major types, Array, String, Object, Boolean, Number, then it outputs as a 3 character string. Array - Arr. String - Str. Object - Obj. Boolean - Boo. Number - Num."
			, "Definitions" : {
				"Thing" : "Any variable or literal"
			}
			, "Returns" : "String"
		}
		, {
			"Name" : "mapArguments"
			, "Usage" : [
					[ "arguments" ]
				]
			, "Tags" : [ "utility", "synchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [

				" function test() { \n  var map = PAGE.mapArguments(arguments) \n  console.log(map) \n } \n \n test(1234, 'Hello World', 513, {}, [], document.createElement('div')) \n\n Object \n Arr: Array[1] \n HTMLDivElement: Array[1] \n Num: Array[2] \n Obj: Array[1] \n Str: Array[1]\n "

			]
			, "Description" : "This is an internal utility that is exposed for those who need it. It outputs all of the arguments passed in grouped by their type. Primary types are output as 3 characters. Array - Arr. String - Str. Object - Obj. Boolean - Boo. Number - Num."
			, "Definitions" : {
				"arguments" : "The special arguments variable inside a function"
			}
			, "Returns" : "Object with arrays grouped by their type name"
		}

	]

})
