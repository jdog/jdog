PAGE.add("Docs.loader_PAGE", {

	"jDog" : "version 3.0.0"
	, "Methods" : [
		{
			"Name" : "PAGE || J"
			, "Source" : [ "page.loader.js" ]
			, "Parent" : [ "Base" ]
			, "Tags" : ["about", "loader"]
			, "Description" : [

				"PAGE is the single global variable from which all of your projects code springs from. By stuffing everything into one explorable variable, PAGE, it dramatically simplifies the process of building and debugging your project. Functions and Constructors can be easily tested in the console. If you haven't worked on the project in awhile, as often happens, having a single variable helps familiarize yourself with the overall structure of your javascript."
				, "jDog aka PAGE aka J is a javascript library to organize and structure your scripts. It is also a pattern for developing code with consistant structure. As a growing body of scripts which interact with each other consistently it also is a way of modularizing your workflow."
				, "<b>page.loader.js</b> is the first file to load for all other jDog scripts to work correctly. It must load before <i>page.base.js</i> and all other extensions. By design it is very small, 4k uncompressed minified. This code can be added inline to the HTML itself."
			]

			, "Definitions" : {
				"page.loader.js" : "Primary source for the PAGE object and functionality"
				, "Extensions" : "Add functionality to PAGE itself"
				, "Constructors" : "Functions that generate stateful Objects"
				, "Modules" : "Singleton stateful objects within the PAGE namespace"
				, "Functions" : "Stateless scripts"
			}

			, "Examples" : [
				"// put this towards the top of the page, in the head \n&#x3c;script src=\"page.loader.js\"&#x3e;&#x3c;/script&#x3e;"
			]
		}
	]

})
