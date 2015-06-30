/* jDog is way of organizing javascript based apps of small to immense complexity.
* Works great across pages, or in single page apps, extensions, etc etc.
* Can replace or work with other libraries like require.js and jQuery
* Small by design.
* SEE https://jdog.io
* Created by Justin Kempton
*
* MIT License
*/
;(function( und, o, jQ, ci ) {

	var global = global || this

	/*
	* the point of jDog is to be able to simplify development of javascript with the chrome console.
	* Specifically by organizing everything into one common easily accessible global variable called J.
	*
	* For convenience (global.J, and global.jDog are interchangeable.
	*
	* SEE https://jdog.io for all documentation
	*/

	var emptyFunction = new Function()
		, preset = global.jdog_preset || {}
		, JDog = function(){}                          // base constructor
		, dog = JDog.prototype = { } // base prototype
		, puppy = new JDog()                           // base instance
		, speedOfInterval = preset.speedOfInterval || 100 // speed of interval called during waiting
		, limit = preset.limit || 500
		, d = global.document

	// all existential queries are run through here, this is the foundation of the whole thing
	function exists (path, base, alternate) {
		if (typeof path === und || typeof path === o) return

		if (path.search(/window\./) === 0 || path.search(/global\./) === 0)
			base = global

		var arr = path.split(".")
			, x = 0
			, obj = base || puppy // if you want to export this function, change puppy to any default

		if (arr.length < 1) return alternate

		while (x < arr.length) {
			obj = obj[arr[x]]
			if (obj === undefined || obj === null) return alternate
			x++
		}
		if (typeof obj !== und)
			return obj
		else
			return alternate
	}


	// all waiting is done here
	function waitExists (/* path, base, func, sourcePath */) {
		var thing
			, arg = arguments
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

		thing = exists(path, base)

		if (thing) {
			;(func || emptyFunction)(thing)
			return puppy
		}
		interval = setInterval(function() {
			count++
			if (count > limit) {

				global.console && console.warn(source + " could not find " + path)

				ci(interval)
				return
			}
			var thing = exists(path,base)
			if (thing) {
				;(func || emptyFunction)(thing)
				ci(interval)
			}
		}, speedOfInterval)
		return puppy
	}


	// this is the main method, split by the arguments
	function wait (/* path, path2, path3, refObj, callback */) {
		var map = mapArguments(arguments)
			, ref = {}
			, fun

		if (!map.Fun) 
			return
		else
			fun = map.Fun[0]
		
		if (map.Obj) ref = map.Obj[0]
		if (map.Str && map.Str.length === 1 && !map.Obj) return waitExists.apply(this, arguments)
		if (map.Arr) return batchWaitRef(map.Arr, ref, fun)
		if (map.Str) return batchWaitRef(map.Str, ref, fun)
	}


	// internal function to load array elements
	function batchWaitRef (arr, ref, callback, source) {

		source = getFuncName(source, arguments)

		var count = 0
			, ref = ref || {}

		ref.J = puppy

		if (!arr.length) {
			(callback || emptyFunction)(ref)
			return puppy
		}

		for (var x = 0; x < arr.length; x++)
		(function(index, arr) {
			waitExists(arr[index], function(f) {
				count += 1
				var name = arr[index].split(".").reverse()[0]
				// adding long pathname for avoiding namespace collision
				ref[arr[index]] = f

				// only adds the short name if it's not already there
				if (!ref[name])
					ref[name] = f
				if (count >= arr.length)
					(callback || emptyFunction)(ref)
			}, source)
		}(x, arr))

		return puppy
	}


	// split out items from arguments into array
	// function batchWait (/* str, str2, str3, obj, callback */) {

	// 	var arr = []
	// 		, ref = {}
	// 		, map = mapArguments(arguments)
	// 		, source = getFuncName("", arguments, map)
	// 		, callback

	// 	if (map.Fun) callback = map.Fun[0]
	// 	if (map.Str) arr = map.Str
	// 	if (map.Obj) ref = map.Obj[0]
	// 	if (map.Arr) arr.concat(map.Str)

	// 	ref.J = puppy

	// 	batchWaitRef(arr, ref, callback, source)
	// 	return puppy
	// }

	// all adding is done using this
	function add (path, thing, base, silent) {

		var defaultBase

		if (path.substr(0,1) === "~") {
			defaultBase = dog
			path = path.substr(1)
		} else {
			defaultBase = puppy
		}

		if (typeof path === und || typeof path === o) return
		var arr = path.split(".")
			, x = 0
			, obj = base || defaultBase // again, for exporting this function change puppy

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


	// gather all of the required libraries in an array, push them into object, then callback( obj -- ref )
	function addWait (path, arrayOfRequiredLibraries, fun) {

		var ref = { 
			J : puppy
		}

		batchWaitRef(arrayOfRequiredLibraries, ref, function(ref) {
			add(path, fun(ref), puppy, true)
		}, path)
		return puppy
	}


	// gather all of the required libraries in an array, push them into the anonymous function
	function addWait$(path, arrayOfRequiredLibraries, fun) {

		var args = arguments

		waitExists(jQ, global, function(jQQ) {
			jQQ.ready(function() {
				addWait.apply(this, args)
			})
		})

		return puppy

	}

	// get the type of anything. Common types are shortened
	function getType (thing) {
		var shorten = "StringBooleanArrayObjectNumberFunction"
			, ret
    if(thing===null) return "Null"
		if(typeof thing === o && global[jQ] && thing instanceof global[jQ]) return jQ
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
	function mapArguments (args) {
		var map = {}

		for(var y = 0; y < args.length; y++)
			pushInObj(getType(args[y]), args[y], map)

		return map
	}

	// extend jDog
	function extend(callback) {
		;(callback || emptyFunction)(puppy, dog)
		return puppy
	}


	// used to log the function names used to load libraries
	// we are using callee.caller here, this feature is being pushed out of javascript in ES5. What a shame when smart people take away cool features
	function getFuncName(source, args, map) {
		map = map || mapArguments(args)
		source = source
			|| exists("callee.caller.name", args)
			|| exists("callee.caller.caller.name", args)
			|| exists("Fun.1.name", map)
			|| exists("Fun.0.name", map)
			|| "anonymous"
		return source
	}

	if (d)
		d.addEventListener("DOMContentLoaded", function(event) {
			dog.DomContentLoaded = true
		})

	dog.version = "tiny3.2.0"
	dog.exists = exists
	dog.waitExists = waitExists
	dog.wait = wait
	dog.add = add
	dog.addWait = addWait
	dog.addWait$ = addWait$
	dog.getType = getType
	dog.mapArguments = mapArguments
	dog.extend = extend

	if (typeof module !== und && module.exports)
		module.exports = puppy

	global.J = puppy

}( "undefined", "object", "jQuery", clearInterval ))


