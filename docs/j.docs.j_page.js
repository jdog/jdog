J.add("Docs.jDog", {
	"jDog" : "version 3.0.0"
	, "Methods" : [
		{
			"Name" : "Why"
			, "Source" : [ "//github.com/jdog/jdog" ]
			, "Parent" : [ "Base" ]
			, "Tags" : ["about", "loader"]
			, "Description" : [

				"jDog or simply J creates a single global variable from which all project code can spring. "
				+ " By stuffing everything into one explorable variable J, it dramatically simplifies the process "
				+ " of building and debugging your project. Functions can be easily tested in the console, "
				+ " Properties checked, documentation created etc."

				, "Load jdog.js either inline or as an external script. By design it is very small, "
				+ " 4k uncompressed minified for lightning fast client side javascript."

				, "<h4>The front end JavaScript module loading landscape</h4>"

				, "AMD module style loading is close to being the standard for client side javascript "
				+ " (think RequireJS). This might change when ES6 becomes the standard."
				+ " But that does not mean a more refined and elegant approach is not possible or even needed for the front end landscape."

				, "jDog differs from the AMD style in many ways that make it superior for development and production."

				, "<h4>That sure is a bold claim!</h4>"

				, "For nodeJS synchronous style require() syntax makes sense. Everything is loaded ahead of time. "
				+ " But in front end development where different objects or functions or properties of "
				+ " objects may load at different times, and with different payloads, blocking the UI to "
				+ " wait for files to load is a bad practice."

				, "RequireJS (AMD) tackles this with define, where you map the 'file path' to the name of the module. "
				+ " Generally this works great but there are some significant issues."
				+ " Files are assumed to contain only one module. But this slows down the speed at which"
				+ " a page will load. Google Page speed recommends minifying and concatinating your javascript into bundles."

				, " In addition the library being loaded must conform to the AMD pattern. "
				+ " Many libraries not written this way simply wont work or must be adapted to work."

				, "<h4>jDog is better because it's more loose</h4>"
				, "JDOG splits the problem in two. Loading the module is different from waiting for the module to load. "
				+ " Inside jDog is a tiny but powerful object traversing engine that allows you to retrieve deeply "
				+ " nested properties."

				, "All files, scripts etc etc need to add themselves somewhere within the window object. "
				+ " Even requireJs stores named modules into a deeply nested object. JDog can find if they exist. "
				+ " It can also wait until they exist to fire a callback. "
				+ " With that simple and powerful technique much of the complexity of asynchronous loading can be avoided."

				, "And for production code, when everything is bundled together and minified, it just works!"

				, "There are many other ways in which jDog greatly improves and takes the javascript "
				+ " module loading pattern to the next level see examples below."

			]
		}
	]

})
