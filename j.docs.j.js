J.add("Docs.J", {

	"jDog" : "version 3.0.0"

	, "Methods" : [


		{
			"Name" : "J"
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Tags" : ["about", "loader"]
			, "Description" : [

				"jDog or simply J, is the single global variable from which all of your project code should spring from. By stuffing everything into one explorable variable, J, you can dramatically simplifies the process of building and debugging your project. Functions and Constructors can be easily tested in the console. If you haven't worked on the project in awhile, as often happens, having a single variable helps familiarize yourself with the overall structure of your javascript."
				, "Load jdog.js first with either inline or external script. By design it is very small, 4k uncompressed minified."
				, "<hr>"
				, "jDog differs from AMD style loading, jDog is superior to AMD!"
				, "Bold claim? For backend javascript development using require() syntax makes sense. But in front end development where different modules or functions or constructors may load at different times, and with different payloads, and themselves require other libraries, writing require('nameOfLibrary') does not make sense at all."
				, "Require.js tackles this problem, but it does it in a way that makes bundling difficult. Bundling scripts for those who do not know, is a process of grouping scripts into a single minified and compressed file to increase speed of the page. Most developers who use require.js for front end developement skip the step of bundling their javascript, costing a 40% or greater increase in bandwidth, not to mention speed."
				, "The weakness is that AMD, ie Require.js assumes that a module is only a single file, with some kind of imports and exports. Even the modern ES6 uses a similar scheme, much closer to the Node way, but still, absent the power to bundle and save bandwidth. Why not just fix the problem? If you could name your Modules, add them to a namespace, then the file loading part can be done through the bundle or as script tags. That is what jDog does."

			]

			, "Definitions" : {
				"jdog.js" : "Primary source for the J object and functionality"
				, "window.J or J" : "How to access and explor the jDog object"
				, "window.PAGE or PAGE" : "Same as window.J"
				, "J.add" : "Add a path to J object or to the object passed in."
				, "J.exists" : "Checks if a path exists against J or the object passed in"
				, "J.wait" : "Waits for a path to exist, or paths, passing them into an object and callback."
				, "J.addWait" : "Wait for some paths to exists, then add this new thing to J, or object you pass in."
				, "J.getType" : "Utility to get the type of anything passed in, see below."
				, "J.mapArguments" : "Utility to group all like arguments from an arguments object."
				, "J.extend" : "Extend or overwrite J functionality itself."
				, "_" : "Place to stash other notable logs and things like it"
				, "_.logs.waitQue" : "Lists all of the 'Modules' being waited for and their state"
				, "_.logs.waitList" : "Lists all of the 'Modules' being waited for and their state"
			}

			, "Examples" : [
				"// put this towards the top of the page, in the head \n&#x3c;script src=\"jdog.js\"&#x3e;&#x3c;/script&#x3e;"
			]
		}

		, {
			"Name" : "add"
			, "Usage" : [
					[ "string Path", "expression Thing" ]
					, [ "string Path", "expression Thing", "optional string TestFile+" ]
				]
			, "Tags" : [ "spawn", "test", "synchronous" ]
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"J.add('Constructors.Login', function( $root, options ){  \n   var exports = {\n     $root : $root\n     , options : options\n   }\n\n  function privateFunction() {\n  }\n\n  exports.publicFunction = function() {\n  }\n\n   return exports \n })"
				, "// assuming Select2 was defined in the same file above\nJ.add('Lib.Select2', Select2)"
				, "J.add('Modules.home', (function(){  ...  }()))"
				, "J.add('Properties.UserId', 12345)"
				, "J.add('BaseClass', BaseClass(1234))"
				, "J.add('BaseClass.ticker', new Ticker('tickerDiv'))"
				, "// example returning \nvar ticker = J.add('BaseClass.ticker', new Ticker('tickerDiv'))"
				, "J.add(\"Constructors.Login\", function($form, options) {\n\n options.showError = options.showError || false\n\n var dog = {\n  $form : $form\n  , $html : undefined // see below\n  , options : options\n }\n , ref = dog.ref = { }\n\n // employs the J events extension \n J.ext.events(dog, {\n  Success : []\n  , Fail : []\n })\n\n function build() {\n  var html = ''\n\n  html += \"&#x3c;div class='pad'&#x3e;\"\n  html += \"&#x3c;div class='row'&#x3e;\"\n  html += \"&#x3c;input type='text' name='UserName' /&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n  html += \"&#x3c;div class='row'&#x3e;\"\n  html += \"&#x3c;input type='text' name='Password' /&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n  html += \"&#x3c;div class='row'&#x3e;\"\n  html += \"&#x3c;button&#x3e;Submit&#x3c;/button&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n\n  dog.$form.empty()\n  dog.$html = $(html).appendTo(dog.$form)\n }\n\n function events() {\n\n  ref.Validation(dog.$form, function success(data) {\n   dog.triggerEvent(\"Success\", data.id, data.name)\n  }, function fail(msg, err) {\n   dog.triggerEvent(\"Fail\", msg, err)\n  })\n\n }\n \n function init() {\n  build()\n  events()\n }\n\n J.wait(\n  \"Modules.dataService.read\"\n  , \"Constructors.Validation\"\n  , ref\n  , init)\n\n return dog\n\n})\n"
			]
			, "Description" : "This is the foundation of adding new items into the global name space. It's mean't to be extremely fast and flexible to add. If you have existing code for example, you can always add it after the fact as many of the following examples will demonstrate."
			, "Definitions" : {
				"Path" : "Path of the item added, example 'Constructors.YourConstructor'"
				, "Thing" : "Any expression, ie code that resolves to a value"
				, "TestFile" : "This is totally optional and only used if page.test.js has been loaded"
			}
			, "Returns" : "Thing"
		}


		, {
			"Name" : "addWait"
			, "Usage" : [
					[ "string Path", "array WaitList", "function Callback" ]
				]
			, "Tags" : [ "wait", "module pattern", "asynchronous" ]
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"J.addWait( \n  'Modules.homePage' // path of thing being added \n  , [\n      'ajax'\n      , 'ready'\n      , 'Constructors.APIMethods'\n  ]\n  , function(ref) {\n \n   var exports = { \n     apiMethods : undefined // see below\n   }\n\n   exports.loadPage = function() {\n     ref.ajax(\"/pathToSomething\", {}, function(data) {\n       // ... lots of your code here\n       exports.apiMethods = ref.APIMethods(data)\n     })\n   }\n \n   return exports \n \n  })"
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
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"J.addWait$(\n 'Modules.jdogAPI'\n , [\n  'ajax'\n  , 'ready'\n  , 'Constructors.APIMethod'\n ],\n function(ref){ ... }))"
				, "J.addWait$(\n \"Modules.home\"\n , [\n  \"Constructors.Validation\"\n  , \"Modules.tracking\"\n ]\n , function(ref) {\n\n  var dog = {\n   $loginForm : $(\"#LoginForm\")\n   , $submit : $(\"#LoginForm button.Submit\")\n  }\n\n  function events() {\n\n   dog.validation = ref.Validation(\n    $(\"#LoginForm\")\n    , function success(data) {\n     ref.tracking.track(\n      \"Submit Success\"\n      , data\n      , function() { window.location = \"/dashboard\" })\n    }\n    , function fail() {\n     ref.tracking.track(\"Submit Failed\") \n    })\n\n   dog.$loginForm.submit(function() {\n    ref.tracking.track(\"Submit\") \n   })\n\n  }\n\n  events()\n\n  return dog\n\n })\n"
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
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"J.extend(function(puppy, dog, log) {})"
				, "J.extend(function(inst, proto, log) {})"
				, "J.extend(function(inst, proto, log) {\n\n J.spawn(\"ext.events\", function(dog, eventMap) {\n\n  eventMap = eventMap || { }\n\n  dog.events = eventMap\n\n  dog._uniqueEventMap = { }\n\n  // name of event, function to be called on triggerEvent(name)\n  // events are unique, checking both the string of the function, \n  // and the callee.caller string as a key\n  dog.addEvent = function(name, func) {\n   var index\n   , key = func.toString() + arguments.callee.caller.toString()\n\n   // if the event type does not exist yet, create it\n   if (!dog.events[name]) dog.events[name] = []\n\n   if (!dog._uniqueEventMap[name]) dog._uniqueEventMap[name] = {}\n\n   // get the index from the array if there, otherwise undefined\n   index = dog._uniqueEventMap[name][key]\n\n   if (index !== undefined) {\n    // adds the function to the array, replacing the older one\n    dog.events[name].splice(index, 1, func)\n    return dog\n   } else {\n    index = dog.events[name].push(func)\n   }\n\n   // now add the index to the key\n   dog._uniqueEventMap[name][key] = (index-1)\n   return dog\n  }\n\n  dog.emptyEvent = function(name) {\n   if (!dog.events[name]) return\n   dog.events[name].length = 0\n  }\n\n  // triggers the functions within the named event array\n  dog.triggerEvent = function(name, args) {\n\n   if (!dog.events[name]) return\n   var events = dog.events[name]\n\n   // args = args || []\n   args = Array.prototype.slice.call(arguments)\n   args.splice(0,1)\n\n   if (events.length) {\n    for (var x in events) \n      (typeof events[x] === \"function\" && events[x].apply(this, args ))\n   }\n   return dog\n  }\n\n\n}, proto)\n\n})"
			]
			, "Description" : "This is a function to extend the jDog library. Within the callback are three objects which allow you to overwrite or extend the functionality of jDog itself. Many extensions have already been created, and we hope many more will be made in the future."
			, "Definitions" : {
				"J" : "J is a global variable with both instance properties and prototype properties"
				, "Puppy" : "These are the instance properties (which can also access prototype)"
				, "Dog" : "This is the prototype for J itself"
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
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"J.add$('Modules.login', ( function(){\n\n  var dog = {\n    $root : $(\"#API\")\n    , $links : $(\"#API .sideBar a\")\n  }\n  , ref = dog.ref = { }\n\n  function init() {\n    // do something usefull with these\n    ref.LocalStorage\n    ref.dataService\n  }\n\n  J.wait(\n    \"Constructors.LocalStorage\"\n    , \"Modules.dataService\"\n    , ref\n    , init)\n\n  return dog\n\n}()))"
			]
			, "Description" : [
				"Combines the functionality of 'add' with jQuery ready. This is a very useful feature for jQuery users as it signals it's safe to call the $ (jQuery) variable. However, notice that unlike J.add, add$ returns undefined."
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
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"// checks J.Properties.User\nvar user = J.exists('Properties.User')"
				, "// checks window.Properties.User\nvar user = J.exists('Properties.User', window)"
				, "// checks J.Properties.User, \n// return User if it's there, otherwise the alternative object\nvar user = J.exists('Properties.User', J, { Name : 'John Doe' })"
				, "// checks J.Modules.login.submit, \n// return submit if it's there, otherwise the alternative function\nJ.exists('Modules.login.submit', J, function(){})()"
				, "// using exists as boolean check\nif (!J.exists('Properties.User.IsSubscribed')) { ... }"
				, "// adds a property using exists\nJ.exists('Properties.User', J, {}).LoggedIn = true"
			]
			, "Description" : "Checks to see if this path exists inside the global J variable, or, alternatively, a specific object. Can be very powerful for preventing null reference errors."
			, "Definitions" : {
				"Path" : "Path of the item added, example 'Constructors.YourConstructor'"
				, "Base" : "optional - Object to search in, defaults to J"
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
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"J.waitExists('Properties.User', function(User) { ... })"
				, "J.waitExists('Properties.User', window, function(User) { ... })"
			]
			, "Description" : "Waits for one item to load, then triggers callback. Base is optional"
			, "Definitions" : {
				"Path" : "Path of the item, example 'Constructors.YourConstructor'"
				, "Base" : "optional - Object to search in, defaults to J"
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
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"\n var dog = new Number()\n undefined\n J.getType(dog)\n \"Num\"\n "
				, "var elem = document.createElement(\"div\")\n// undefined\nJ.getType(elem)\n// \"HTMLDivElement\""
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
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [

				" function test() { \n  var map = J.mapArguments(arguments) \n  console.log(map) \n } \n \n test(1234, 'Hello World', 513, {}, [], document.createElement('div')) \n\n Object \n Arr: Array[1] \n HTMLDivElement: Array[1] \n Num: Array[2] \n Obj: Array[1] \n Str: Array[1]\n "

			]
			, "Description" : "This is an internal utility that is exposed for those who need it. It outputs all of the arguments passed in grouped by their type. Primary types are output as 3 characters. Array - Arr. String - Str. Object - Obj. Boolean - Boo. Number - Num."
			, "Definitions" : {
				"arguments" : "The special arguments variable inside a function"
			}
			, "Returns" : "Object with arrays grouped by their type name"
		}

	]

})
