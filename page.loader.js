/* jDog is way of organizing javascript based apps. 
* Works great across pages, or in single page apps, extensions, etc etc.
* Can replace or work with libraries like require.js
* Works great with other libraries like jQuery.
* Small by design.
* SEE https://jdog.io
* Created by Justin Kempton
*
* MIT License
*/
;(function() {

	/* 
	* the point of jDog is to be able to simplify development of javascript with the console.
	* Specifically by organizing everything into one common easily accessible global variable.
	* 
	* For convenience (window.PAGE, window.J, and window.jDog are interchangeable.
	*
	* SEE https://jdog.io for all documentation
	*/

	var JDog = function(){}                  // base constructor
		, dog = JDog.prototype = { logs : {} } // base prototype
		, puppy = new JDog()                   // base instance
		, speedOfInterval = 50                 // speed of interval
		, finishedCallbacks = []               // array of callbacks to run when everything is loaded
		, done = dog.done = function(func) {   // method to add to finished callback
			finishedCallbacks.push(func)
		}
		, emptyFunction = new Function()
		, loadList = dog.logs.loaded  = { }    // list all loaded libraries (and where they were used)
		, waitList = dog.logs.waitQue = { }    // show the loading que, unloaded show as false
		, waitMap = dog.logs.waitMap  = { }    // reverse look at logs.loaded
		, scriptNumber = 0


	// all existential queries are run through here, this is the foundation of the whole thing
	var ex = dog.exists = function (path, base, alternate) {
		if (typeof path === "undefined" || typeof path === "object") return

		if (path.search(/window\./) === 0)
			base = window

		var arr = path.split(".")
			, x = 0
			, obj = base || puppy // if you want to export this function, change puppy to any default 

		if (arr.length < 1) return alternate

		while (x < arr.length) {
			obj = obj[arr[x]]
			if (obj === undefined || obj === null) return alternate
			x++
		}
		if (typeof obj !== "undefined") 
			return obj
		else
			return alternate
	}


	// all waiting is done here
	var waitExists = dog.waitExists = function(/* path, base, func, sourcePath */) {
		var thing
			, arg = arguments
			, limit = 100
			, count = 0
			, interval
			, base, func, sourcePath
			, path = arg[0]

		// no base defined
		if (typeof arg[1] === "function") {
			func = arg[1]
			sourcePath = arguments[2]
			base = undefined
		} else {
			base = arg[1]
			func = arg[2]
			sourcePath = arg[3]
		}

		var source = getFuncName(sourcePath, arg)

		thing = ex(path, base)

		// adding it to the load list
		if (!waitMap[source])
			waitMap[source] = []

		// adding it to the load list
		if (!loadList[path])
			loadList[path] = []

		loadList[path].push(source)
		waitMap[source].push(path)

		waitList[path] = false

		if (thing) {
			;(func || emptyFunction)(thing)
			waitList[path] = true
			runFinishedCallbacks()
			return puppy
		}
		interval = setInterval(function() {
			count++
			if (count > limit) {
				console.trace("could not find " + path)
				// console.error("could not find " + path)
				clearInterval(interval)
				return
			}
			var thing = ex(path,base)
			if (thing) {
				;(func || emptyFunction)(thing)
				waitList[path] = true
				clearInterval(interval)
				runFinishedCallbacks()
			}
		}, speedOfInterval)
		return puppy
	}


	// this is the main method, split by the arguments
	dog.wait = function(/* path, path2, path3, refObj, callback */) {
		var map = mapArguments(arguments)
		if (map.Arr && map.Obj) return batchWaitRef.apply((this), arguments)
		if (map.Str && map.Obj && !map.Arr) return batchWait.apply(this, arguments)
		else return waitExists.apply(this, arguments)
	}


	// internal function to load array elements
	var batchWaitRef = function(arr, ref, callback, source) {

		var source = getFuncName(source, arguments)
			, count = 0
			, ref = ref || {}

		if (!arr.length)
			(callback || emptyFunction)(ref)

		for (var x = 0; x < arr.length; x++)
		(function(index, arr) {
			waitExists(arr[index], function(f) {
				count += 1
				var name = arr[index].split(".").reverse()[0]
				ref[name] = f
				if (count >= arr.length)
					(callback || emptyFunction)(ref)
			}, source)
		}(x, arr))

		ref.jDog = ref.J = puppy

		return puppy
	}


	// split out items from arguments into array
	var batchWait = function(/* str, str2, str3, obj, callback */) {

		var arr = [] 
			, ref = {}
			, map = mapArguments(arguments)
			, source = getFuncName("", arguments, map)
			, callback

		if (map.Fun) callback = map.Fun[0]
		if (map.Str) arr = map.Str
		if (map.Obj) ref = map.Obj[0]
		if (map.Arr) arr.concat(map.Str)

		batchWaitRef(arr, ref, callback, source)
		return puppy
	}


	// all adding is done using this
	dog.add = function (path, thing, base) {

		if (typeof path === "undefined" || typeof path === "object") return
		var arr = path.split(".")
			, x = 0
			, obj = base || puppy // again, for exporting this function change puppy

		if (arr.length < 1) return

		while (x < arr.length) {

			if (x === arr.length - 1) {
				obj[arr[x]] = thing
				return thing
			} else {
				if (obj[arr[x]] === undefined) {
					obj = obj[arr[x]] = { }
				} else {
					obj = obj[arr[x]]
				}
			}
			x++
		}
	}


	// add, for jQuery fans
	dog.add$ = function(path, thing) {
		var args = arguments

		dog.waitExists("jQuery", window, function jQueryLoaded () {
			window.jQuery(document).ready(function documentReady () {
				dog.add.apply(thing, args)
			})
		})

		return thing
	}


	// gather all of the required libraries in an array, push them into object, then callback( obj -- ref )
	dog.addWait = function(path, arrayOfRequiredLibraries, fun) {
		batchWaitRef(arrayOfRequiredLibraries, {}, function(ref) {
			dog.add(path, fun(ref))
		}, path)
		return puppy
	}


	// gather all of the required libraries in an array, push them into the anonymous function
	dog.addWait$ = function(path, arrayOfRequiredLibraries, fun) {

		dog.waitExists("jQuery", window, function() {
			window.jQuery(document).ready(function() {
				batchWaitRef(arrayOfRequiredLibraries, {}, function(ref) {
					dog.add(path, fun(ref))
				}, path)
			})
		})

		return puppy

	}


	// get the type of anything. Common types are shortened
	var getType = dog.getType = function(thing){
		var shorten = "StringBooleanArrayObjectNumberFunction"
			, ret
    if(thing===null) return "Null"
		if(typeof thing === "object" && window.jQuery && thing instanceof window.jQuery) return "jQuery"
    ret = Object.prototype.toString.call(thing).slice(8, -1)
		if (shorten.indexOf(ret) > -1)
			return ret.substr(0,3)
		else
			return ret
	}


	// internal function to add to array
	function pushInObj(name, item, obj) {
		if (!obj[name]) obj[name] = []
		obj[name].push(item)
	}


	// create a hash of arguments sorted by type
	var mapArguments = dog.mapArguments = function(args) {
		var map = {}

		for(var y = 0; y < args.length; y++)
			pushInObj(getType(args[y]), args[y], map)

		return map
	}


	// method for loading files, currently not used for waiting
	var loadFile = dog.loadFile = function loadFile (/* pathToFile, allowCache */) {

		var map = dog.mapArguments(arguments)
			, allowCache = map.Boo ? map.Boo[0] : false

		if (!map.Str) return puppy
		if (map.Str.length > 1) {
			for (var x in map.Str) loadFile(map.Str[x], allowCache)
			return puppy
		}

		var pathToFile = map.Str[0]
			, type = pathToFile.slice(-3).toLowerCase()
			, fileId = pathToFile.replace(/\./g,"_").replace(/\//g, "_").replace(":","")
			, existingElm = document.getElementById(fileId)
			, increment = allowCache ? scriptNumber++ : String((Math.random() * 1000)).replace(/\./,"")
			, fileref = document.createElement( type === "css" ? 'link' : "script"  )

		if (type === "css") {
			fileref.rel = "stylesheet"
			fileref.type = "text/css"
			fileref.href = pathToFile.replace(/^~/,"") + "?" + increment // increment or randomize
		} else {
			fileref.type = "text/javascript"
			fileref.src = pathToFile.replace(/^~/,"") + "?" + increment // increment or randomize
		}

		fileref.id =  fileId

		if (existingElm)
			existingElm.parentElement.removeChild(existingElm)

		document.getElementsByTagName("head")[0].appendChild(fileref)

		return puppy

	}


	// extend jDog
	dog.extend = function extend(callback) {
		;(callback || emptyFunction)(puppy, dog)
		return puppy
	}


	// internal function calling all done callbacks when everything is finished loading
	function runFinishedCallbacks() {
		if (checkWaitingList()) return
		for (var x in finishedCallbacks) finishedCallbacks[x](puppy, dog)
	}


	// used to log the function names used to load libraries
	// we are using callee.caller here, this feature is being pushed out of javascript in ES5. What a shame when smart people take away cool features
	function getFuncName(source, args, map) {
		map = map || mapArguments(args)
		source = source 
			|| ex("callee.caller.name", args) 
			|| ex("callee.caller.caller.name", args) 
			|| ex("Fun.1.name", map) 
			|| ex("Fun.0.name", map) 
			|| "anonymous"
		return source
	}


	// methods for checking if finished loading to run finished callback(s)
	function checkWaitingList() {
		var count = 0
		for(var x in waitList) if (!waitList[x]) count++
		return count
	}


	// store jQuery for instanceof, in case it gets overriden by some other code
	// this is used by getType, jQuery is so common it needs it's own type!
	dog.jQuery = window.jQuery

	document.addEventListener("DOMContentLoaded", function(event) {
		dog.ready = true
  })

	dog.version = "3.0.0"

	// jDog and J are psynonymous
	window.PAGE = window.J = window.jDog = puppy

}())

