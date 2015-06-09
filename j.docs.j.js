J.add("Docs.J", {

	"jDog" : "version 3.0.0"

	, "Methods" : [

		{
			"Name" : "exists"
			, "Usage" : [
					[ "Path" ]
					, [ "Path", "Base" ]
					, [ "Path", "Base", "Alternative" ]
				]
			, "Tags" : [ "synchronous" ]
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
			, "Tags" : [ "asynchronous" ]
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
			, "Returns" : "J"
		}


		, {
			"Name" : "wait"
			, "Usage" : [
					[ "string Path", "function Callback" ]
					, [ "string Path+", "object Ref", "function Callback" ]
				]
			, "Tags" : [ "asynchronous" ]
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"var ref = {}\n\nJ.wait(\n 'Modules.dataService.read'\n , 'Constructors.LocalStorage'\n , ref\n , function(){\n\n   // now I have access to Modules.dataService.read\n   ref.read()\n\n   // and I have access to Constructors.LocalStorage\n   var ls = ref.LocalStorage(\"helloWorld\")\n\n})"
				, "function init(ref) {\n  alert('finished loading')\n  console.log(ref)\n}\n\nJ.wait( \n  'Modules.dataService' \n  , 'window.dropDown' \n  , 'Constructors.Login' \n  , { }\n  , init)"
				, "function init1(ref) {\n// awesome code here\n}\nfunction init2(ref) {\n// awesome code here\n}\nfunction init3(ref) {\n// awesome code here\n}\n\nvar ref = {}\n\nJ.wait('Modules.dataService.readDocuments', ref, init1)\n .wait('Modules.dataService.readClasses', ref, init2)\n .wait('DomContentLoaded', ref, init3)"
			]
			, "Description" : "This is the foundation of waiting until 'path' or 'paths' have loaded before launching callback. Notice the Ref object. Unlike requirejs which puts items into the callback's arguments, jDog modifies the reference object. Library items get added into this object as keys based on the name allowing code within the callback and beyond to access them." 
			, "Definitions" : {
				"Path" : "Path of the library item required, example 'Constructors.YourConstructor'"
				, "Ref" : "Reference Object to pass all library items into"
				, "Callback" : "Function to call when all is loaded"
			}
			, "Returns" : "J"
		}

		, {
			"Name" : "add"
			, "Usage" : [
					[ "string Path", "expression Thing", "object Base"  ]
				]
			, "Tags" : [ "synchronous" ]
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
				, "Base" : "(optional) Base object to add to"
			}
			, "Returns" : "Thing"
		}

		, {
			"Name" : "addWait"
			, "Usage" : [
					[ "string Path", "array WaitList", "function Callback" ]
				]
			, "Tags" : [ "module pattern", "asynchronous" ]
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"J.addWait( \n  'Modules.homePage' // path of thing being added \n  , [\n      'ajax'\n      , 'ready'\n      , 'Constructors.APIMethods'\n  ]\n  , function(ref) {\n \n   var exports = { \n     apiMethods : undefined // see below\n   }\n\n   exports.loadPage = function() {\n     ref.ajax(\"/pathToSomething\", {}, function(data) {\n       // ... lots of your code here\n       exports.apiMethods = ref.APIMethods(data)\n     })\n   }\n \n   return exports \n \n  })"
			]
			, "Description" : "Combines the functionality of add and wait into one function. This is useful for creating modules. For those familiar with requirejs this has an almost identical format, with the exception that the callback returns a single object instead of a list of arguments. This format is superior in many ways, as it is nolonger necessary to keep track of the order of arguments."
			, "Definitions" : {
				"Path" : "String - Path of the library item required, example 'Constructors.YourConstructor'"
				, "WaitList" : "Array - list of other libraries required before callback is called"
				, "Callback" : "Function to call when all is loaded"
			}
			, "Returns" : "J"
		}

		, {
			"Name" : "addWait$"
			, "Usage" : [
					[ "string Path", "array WaitList", "function Callback" ]
				]
			, "Tags" : [ "module pattern", "jQuery", "asynchronous" ]
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
			, "Returns" : "J"
		}

		, {
			"Name" : "extend"
			, "Usage" : [
					[ "function( puppy, dog ) { ... }" ]
					, [ "function( instance, proto ) { ... }" ]
				]
			, "Tags" : [ "module pattern", "extensions" ]
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Description" : "This is a function to extend the jDog library itself. Within the callback are the instance and prototype of J which allow you to overwrite or extend the functionality of jDog. By convention extensions have been named, J.ext.events for example."
			, "Examples" : [
				"J.extend(function(puppy, dog) {})"
				, "J.extend(function(inst, proto) {})"
				, "J.extend(function(inst, proto) {\n\n J.add(\"ext.events\", function(dog, eventMap) {\n\n  eventMap = eventMap || { }\n\n  dog.events = eventMap\n\n  dog._uniqueEventMap = { }\n\n  // name of event, function to be called on triggerEvent(name)\n  // events are unique, checking both the string of the function, \n  // and the callee.caller string as a key\n  dog.addEvent = function(name, func) {\n   var index\n   , key = func.toString() + arguments.callee.caller.toString()\n\n   // if the event type does not exist yet, create it\n   if (!dog.events[name]) dog.events[name] = []\n\n   if (!dog._uniqueEventMap[name]) dog._uniqueEventMap[name] = {}\n\n   // get the index from the array if there, otherwise undefined\n   index = dog._uniqueEventMap[name][key]\n\n   if (index !== undefined) {\n    // adds the function to the array, replacing the older one\n    dog.events[name].splice(index, 1, func)\n    return dog\n   } else {\n    index = dog.events[name].push(func)\n   }\n\n   // now add the index to the key\n   dog._uniqueEventMap[name][key] = (index-1)\n   return dog\n  }\n\n  dog.emptyEvent = function(name) {\n   if (!dog.events[name]) return\n   dog.events[name].length = 0\n  }\n\n  // triggers the functions within the named event array\n  dog.triggerEvent = function(name, args) {\n\n   if (!dog.events[name]) return\n   var events = dog.events[name]\n\n   // args = args || []\n   args = Array.prototype.slice.call(arguments)\n   args.splice(0,1)\n\n   if (events.length) {\n    for (var x in events) \n      (typeof events[x] === \"function\" && events[x].apply(this, args ))\n   }\n   return dog\n  }\n\n\n}, proto)\n\n})"
			]
			, "Definitions" : {
				"J" : "J is a global variable with both instance properties and prototype properties"
				, "Puppy" : "These are the instance properties (which can also access prototype)"
				, "Dog" : "This is the prototype for J itself"
			}
			, "Returns" : "J"
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
