PAGE.add("Docs.jDog", {
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
				, "AMD module loading is close to being the standard for client side javascript (Requirejs). ES6 will ship with import and export functionality. But that does not mean a more refined and elegant approach is not possible, or even needed."
				, "jDog differs from AMD style loading in many ways that make it superior. So superior in fact, it's worth checking it out to see for yourself."
				, "<h4>Bold claim?</h4>"
				, "For nodejs development require() syntax makes sense. Everything is loaded ahead of time. But in front end development where different modules or functions or constructors may load at different times, and with different payloads, blocking the UI to wait for files to load is a bad practice."
				, "Require.js tackles this problem well with it's callback of required items, but it does it in a way that makes bundling difficult. In addition the library being loaded must conform to the AMD pattern. Many jQuery plugins or similar code not written this way simply wont work, or must be adapted to work."
				, "<h4>require loads, jdog waits</h4>"
				, "jDog takes a different approach. Instead of the main benefit being loading of modules, JDog waits for things to be loaded within objects."
				, "<h4>traversing objects made easy</h4>"
				, "<code>J.exists('window.long.path.to.property')</code>"
				, "All files, scripts etc etc need to add themselves somewhere within the window object. JDog can find if they exist. It can also wait until they exist then fire a callback. That's in nutshell how it all works."
				, "There are many other ways in which jDog greatly improves and takes the javascript module loading pattern to the next level."

			]
		}
	]

})
