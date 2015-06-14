J.add("Docs.jDog", {
	"jDog" : "version 3.0.0"
	, "Methods" : [
		{
			"Name" : "Why"
			, "Source" : [ "jdog.js" ]
			, "Parent" : [ "Base" ]
			, "Tags" : ["about", "loader"]
			, "Description" : [

				"jDog or simply J creates a single global variable from which all project code can spring. By stuffing everything into one explorable variable, J dramatically simplifies the process of building and debugging your project. Functions can be easily tested in the console, Properties checked, documentation created etc."
				, "<code>Open your console, take a look right now!</code>"
				, "Load jdog.js either inline or as an external script. By design it is very small, 4k uncompressed minified for lightning fast client side javascript."
				, "<h4>Front end JavaScript module loading landscape</h4>"
				, "AMD module style loading is close to being the standard for client side javascript (think RequireJS). ES6 will ship with import and export functionality. But that does not mean a more refined and elegant approach is not possible or even needed."
				, "jDog differs from AMD style loading in many ways that make it superior for development and production."
				, "<h4>Bold claim?</h4>"
				, "For nodeJS require() syntax makes sense. Everything is loaded ahead of time. But in front end development where different objects or functions or properties of objects may load at different times, and with different payloads, blocking the UI to wait for files to load is a bad practice."
				, "RequireJS tackles this with define, where you map the path to the name. Generally this works, but it does it in a way that makes bundling difficult."
				, "In addition the library being loaded must conform to the AMD pattern. Many libraries not written this way simply wont work or must be adapted to work."
				, "<h4>jDog is better</h4>"
				, "JDOG splits the problem in two. Loading the module is different from waiting for the module load. Inside jDog is a tiny but powerful object traversing engine that allows you to retrieve deeply nested properties."
				, "All files, scripts etc etc need to add themselves somewhere within the window object. Even requireJs stores named modules into a deeply nested object. JDog can find if they exist. It can also wait until they exist to fire a callback. With that simple and powerful technique much of the complexity of asynchronous loading can be resolved."
				, "And for production code, when everything is bundled together, it just works!"
				, "There are many other ways in which jDog greatly improves and takes the javascript module loading pattern to the next level see examples below."

			]
		}
	]

})
