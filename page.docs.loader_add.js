PAGE.add("Docs.loader_add", {

	"jDog" : "version 1.0"
	, "Methods" : [
		{
			"Name" : "add"
			, "Usage" : [
					[ "string Path", "expression Thing" ]
					, [ "string Path", "expression Thing", "optional string TestFile+" ]
				]
			, "Tags" : [ "spawn", "test", "synchronous" ]
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Examples" : [
				"PAGE.add('Constructors.Login', function( $root, options ){  \n   var exports = {\n     $root : $root\n     , options : options\n   }\n\n  function privateFunction() {\n  }\n\n  exports.publicFunction = function() {\n  }\n\n   return exports \n })"
				, "// assuming Select2 was defined in the same file above\nPAGE.add('Lib.Select2', Select2)"
				, "PAGE.add('Modules.home', (function(){  ...  }()))"
				, "PAGE.add('Properties.UserId', 12345)"
				, "PAGE.add('BaseClass', BaseClass(1234))"
				, "PAGE.add('BaseClass.ticker', new Ticker('tickerDiv'))"
				, "// example returning \nvar ticker = PAGE.add('BaseClass.ticker', new Ticker('tickerDiv'))"
				, "PAGE.add(\"Constructors.Login\", function($form, options) {\n\n options.showError = options.showError || false\n\n var dog = {\n  $form : $form\n  , $html : undefined // see below\n  , options : options\n }\n , ref = dog.ref = { }\n\n // employs the PAGE events extension \n PAGE.ext.events(dog, {\n  Success : []\n  , Fail : []\n })\n\n function build() {\n  var html = ''\n\n  html += \"&#x3c;div class='pad'&#x3e;\"\n  html += \"&#x3c;div class='row'&#x3e;\"\n  html += \"&#x3c;input type='text' name='UserName' /&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n  html += \"&#x3c;div class='row'&#x3e;\"\n  html += \"&#x3c;input type='text' name='Password' /&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n  html += \"&#x3c;div class='row'&#x3e;\"\n  html += \"&#x3c;button&#x3e;Submit&#x3c;/button&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n  html += \"&#x3c;/div&#x3e;\"\n\n  dog.$form.empty()\n  dog.$html = $(html).appendTo(dog.$form)\n }\n\n function events() {\n\n  ref.Validation(dog.$form, function success(data) {\n   dog.triggerEvent(\"Success\", data.id, data.name)\n  }, function fail(msg, err) {\n   dog.triggerEvent(\"Fail\", msg, err)\n  })\n\n }\n \n function init() {\n  build()\n  events()\n }\n\n PAGE.wait(\n  \"Modules.dataService.read\"\n  , \"Constructors.Validation\"\n  , ref\n  , init)\n\n return dog\n\n})\n"
			]
			, "Description" : "This is the foundation of adding new items into the global name space. It's mean't to be extremely fast and flexible to add. If you have existing code for example, you can always add it after the fact as many of the following examples will demonstrate."
			, "Definitions" : {
				"Path" : "Path of the item added, example 'Constructors.YourConstructor'"
				, "Thing" : "Any expression, ie code that resolves to a value"
				, "TestFile" : "This is totally optional and only used if page.test.js has been loaded"
			}
			, "Returns" : "Thing"
		}
	]

})
