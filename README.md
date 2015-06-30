
#Why

jDog or simply J creates a single global variable from which all project code can spring.  By stuffing everything into one explorable variable J dramatically simplifies the process  of building and debugging your project. Functions can be easily tested in the console,  Properties checked, documentation created etc.
Load jdog.js either inline or as an external script. By design it is very small,  4k uncompressed minified for lightning fast client side javascript.

#####The front end JavaScript module loading landscape

AMD module style loading is close to being the standard for client side javascript  (think RequireJS), well until ES6 becomes the standard. But that does not mean a more refined and elegant approach is not possible or even needed.
jDog differs from the AMD style in many ways that make it superior for development and production.

#####That is a bold claim!

For nodeJS require() syntax makes sense. Everything is loaded ahead of time.  But in front end development where different objects or functions or properties of  objects may load at different times, and with different payloads, blocking the UI to  wait for files to load is a bad practice.
RequireJS tackles this with define, where you map the path to the name.  Generally this works, but it does it in a way that makes bundling difficult. 
In addition the library being loaded must conform to the AMD pattern.  Many libraries not written this way simply wont work or must be adapted to work.

#####jDog is better because it's more loose

JDOG splits the problem in two. Loading the module is different from waiting for the module to load.  Inside jDog is a tiny but powerful object traversing engine that allows you to retrieve deeply  nested properties.
All files, scripts etc etc need to add themselves somewhere within the window object.  Even requireJs stores named modules into a deeply nested object. JDog can find if they exist.  It can also wait until they exist to fire a callback.  With that simple and powerful technique much of the complexity of asynchronous loading can be avoided.
And for production code, when everything is bundled together and minified, it just works!
There are many other ways in which jDog greatly improves and takes the javascript  module loading pattern to the next level see examples below.

#exists



```javascript
J.exists(Path) 
J.exists(string Path, any Base) 
J.exists(string Path, any Base, any Alternative) 
```
Checks to see if this path exists inside the global J variable, or, alternatively, a specific object. Can be very powerful for preventing null reference errors.


####Definitions:
- *Path* : Path of the item added, example 'Constructors.YourConstructor'
- *Base* : optional - Object to search in, defaults to J
- *Alternate* : optional - if it's empty, then return this instead


####Returns:
the item of the path, or undefined, or alternative

####Examples:

```javascript
// checks J.Properties.User
var user = J.exists('Properties.User')

// checks window.Properties.User
var user = J.exists('Properties.User', window)

// checks J.Properties.User, 
// return User if it's there, otherwise the alternative object
var user = J.exists('Properties.User', J, { Name : 'John Doe' })

// checks J.Modules.login.submit, 
// return submit if it's there, otherwise the alternative function
J.exists('Modules.login.submit', J, function(){})()

// using exists as boolean check
if (!J.exists('Properties.User.IsSubscribed')) { ... }

// adds a property using exists
J.exists('Properties.User', J, {}).LoggedIn = true

```

#waitExists



```javascript
J.waitExists(Path) 
J.waitExists(string Path, function Callback) 
J.waitExists(string Path, any Base, function Callback) 
```
Waits for one item to load, then triggers callback. Base is optional


####Definitions:
- *Path* : Path of the item, example 'Constructors.YourConstructor'
- *Base* : optional - Object to search in, defaults to J
- *Callback* : Function to call when all is loaded


####Returns:
J

####Examples:

```javascript
J.waitExists('Properties.User', function(User) { ... })

J.waitExists('Properties.User', window, function(User) { ... })

```

#wait



```javascript
J.wait(string Path, function Callback) 
J.wait(string Path+, object Ref, function Callback) 
```
This is the foundation of waiting until 'path' or 'paths' have loaded before launching callback. Notice the Ref object. Unlike requirejs which puts items into the callback's arguments, jDog modifies the reference object. Library items get added into this object as keys based on the name allowing code within the callback and beyond to access them.


####Definitions:
- *Path* : Path of the library item required, example 'Constructors.YourConstructor'
- *Ref* : Reference Object to pass all library items into
- *Callback* : Function to call when all is loaded


####Returns:
J

####Examples:

```javascript
var ref = {}

J.wait(
 'Modules.dataService.read'
 , 'Constructors.LocalStorage'
 , ref
 , function(){

   // now I have access to Modules.dataService.read
   ref.read()

   // and I have access to Constructors.LocalStorage
   var ls = ref.LocalStorage("helloWorld")

})

function init(ref) {
  alert('finished loading')
  console.log(ref)
}

J.wait( 
  'Modules.dataService' 
  , 'window.dropDown' 
  , 'Constructors.Login' 
  , { }
  , init)

function init1(ref) {
// awesome code here
}
function init2(ref) {
// awesome code here
}
function init3(ref) {
// awesome code here
}

var ref = {}

J.wait('Modules.dataService.readDocuments', ref, init1)
 .wait('Modules.dataService.readClasses', ref, init2)
 .wait('DomContentLoaded', ref, init3)

```

#add



```javascript
J.add(string Path, expression Thing, object Base) 
```
This is the foundation of adding new items into the global name space. It's mean't to be extremely fast and flexible to add. If you have existing code for example, you can always add it after the fact as many of the following examples will demonstrate.


####Definitions:
- *Path* : Path of the item added, example 'Constructors.YourConstructor'
- *Thing* : Any expression, ie code that resolves to a value
- *Base* : (optional) Base object to add to


####Returns:
Thing

####Examples:

```javascript
J.add('Constructors.Login', function( $root, options ){  
   var exports = {
     $root : $root
     , options : options
   }

  function privateFunction() {
  }

  exports.publicFunction = function() {
  }

   return exports 
 })

// assuming Select2 was defined in the same file above
J.add('Lib.Select2', Select2)

J.add('Modules.home', (function(){  ...  }()))

J.add('Properties.UserId', 12345)

J.add('BaseClass', BaseClass(1234))

J.add('BaseClass.ticker', new Ticker('tickerDiv'))

// example returning 
var ticker = J.add('BaseClass.ticker', new Ticker('tickerDiv'))

J.add("Constructors.Login", function($form, options) {

 options.showError = options.showError || false

 var dog = {
  $form : $form
  , $html : undefined // see below
  , options : options
 }
 , ref = dog.ref = { }

 // employs the J events extension 
 J.ext.events(dog, {
  Success : []
  , Fail : []
 })

 function build() {
  var html = ''

  html += "&#x3c;div class='pad'&#x3e;"
  html += "&#x3c;div class='row'&#x3e;"
  html += "&#x3c;input type='text' name='UserName' /&#x3e;"
  html += "&#x3c;/div&#x3e;"
  html += "&#x3c;div class='row'&#x3e;"
  html += "&#x3c;input type='text' name='Password' /&#x3e;"
  html += "&#x3c;/div&#x3e;"
  html += "&#x3c;div class='row'&#x3e;"
  html += "&#x3c;button&#x3e;Submit&#x3c;/button&#x3e;"
  html += "&#x3c;/div&#x3e;"
  html += "&#x3c;/div&#x3e;"

  dog.$form.empty()
  dog.$html = $(html).appendTo(dog.$form)
 }

 function events() {

  ref.Validation(dog.$form, function success(data) {
   dog.triggerEvent("Success", data.id, data.name)
  }, function fail(msg, err) {
   dog.triggerEvent("Fail", msg, err)
  })

 }
 
 function init() {
  build()
  events()
 }

 J.wait(
  "Modules.dataService.read"
  , "Constructors.Validation"
  , ref
  , init)

 return dog

})


```

#addWait



```javascript
J.addWait(string Path, array WaitList, function Callback) 
```
Combines the functionality of add and wait into one function. This is useful for creating modules. For those familiar with requirejs this has an almost identical format, with the exception that the callback returns a single object instead of a list of arguments. This format is superior in many ways, as it is nolonger necessary to keep track of the order of arguments.


####Definitions:
- *Path* : String - Path of the library item required, example 'Constructors.YourConstructor'
- *WaitList* : Array - list of other libraries required before callback is called
- *Callback* : Function to call when all is loaded


####Returns:
J

####Examples:

```javascript
J.addWait( 
  'Modules.homePage' // path of thing being added 
  , [
      'ajax'
      , 'ready'
      , 'Constructors.APIMethods'
  ]
  , function(ref) {
 
   var exports = { 
     apiMethods : undefined // see below
   }

   exports.loadPage = function() {
     ref.ajax("/pathToSomething", {}, function(data) {
       // ... lots of your code here
       exports.apiMethods = ref.APIMethods(data)
     })
   }
 
   return exports 
 
  })

```

#addWait$



```javascript
J.addWait$(string Path, array WaitList, function Callback) 
```
Combines the functionality of addWait with jQuery's document.ready. This is a useful function for creating modules with jQuery support.


####Definitions:
- *Path* : String - Path of the library item required, example 'Constructors.YourConstructor'
- *WaitList* : Array - list of other libraries required before callback is called
- *Callback* : Function to call when all is loaded


####Returns:
J

####Examples:

```javascript
J.addWait$(
 'Modules.jdogAPI'
 , [
  'ajax'
  , 'ready'
  , 'Constructors.APIMethod'
 ],
 function(ref){ ... }))

J.addWait$(
 "Modules.home"
 , [
  "Constructors.Validation"
  , "Modules.tracking"
 ]
 , function(ref) {

  var dog = {
   $loginForm : $("#LoginForm")
   , $submit : $("#LoginForm button.Submit")
  }

  function events() {

   dog.validation = ref.Validation(
    $("#LoginForm")
    , function success(data) {
     ref.tracking.track(
      "Submit Success"
      , data
      , function() { window.location = "/dashboard" })
    }
    , function fail() {
     ref.tracking.track("Submit Failed") 
    })

   dog.$loginForm.submit(function() {
    ref.tracking.track("Submit") 
   })

  }

  events()

  return dog

 })


```

#extend



```javascript
J.extend(function( puppy, dog ) { ... }) 
J.extend(function( instance, proto ) { ... }) 
```
This is a function to extend the jDog library itself. Within the callback are the instance and prototype of J which allow you to overwrite or extend the functionality of jDog. By convention extensions have been named, J.ext.events for example.


####Definitions:
- *J* : J is a global variable with both instance properties and prototype properties
- *Puppy* : These are the instance properties (which can also access prototype)
- *Dog* : This is the prototype for J itself


####Returns:
J

####Examples:

```javascript
J.extend(function(puppy, dog) {})

J.extend(function(inst, proto) {})

J.extend(function(inst, proto) {

 J.add("ext.events", function(dog, eventMap) {

  eventMap = eventMap || { }

  dog.events = eventMap

  dog._uniqueEventMap = { }

  // name of event, function to be called on triggerEvent(name)
  // events are unique, checking both the string of the function, 
  // and the callee.caller string as a key
  dog.addEvent = function(name, func) {
   var index
   , key = func.toString() + arguments.callee.caller.toString()

   // if the event type does not exist yet, create it
   if (!dog.events[name]) dog.events[name] = []

   if (!dog._uniqueEventMap[name]) dog._uniqueEventMap[name] = {}

   // get the index from the array if there, otherwise undefined
   index = dog._uniqueEventMap[name][key]

   if (index !== undefined) {
    // adds the function to the array, replacing the older one
    dog.events[name].splice(index, 1, func)
    return dog
   } else {
    index = dog.events[name].push(func)
   }

   // now add the index to the key
   dog._uniqueEventMap[name][key] = (index-1)
   return dog
  }

  dog.emptyEvent = function(name) {
   if (!dog.events[name]) return
   dog.events[name].length = 0
  }

  // triggers the functions within the named event array
  dog.triggerEvent = function(name, args) {

   if (!dog.events[name]) return
   var events = dog.events[name]

   // args = args || []
   args = Array.prototype.slice.call(arguments)
   args.splice(0,1)

   if (events.length) {
    for (var x in events) 
      (typeof events[x] === "function" && events[x].apply(this, args ))
   }
   return dog
  }


}, proto)

})

```

#getType



```javascript
J.getType(Thing) 
```
This is an exposed internal utility that outputs the type of any kind of thing passed into it. Useful for Array vs Object, or all the kinds of HTML elements. Also has a special type for jQuery. If one of the major types, Array, String, Object, Boolean, Number, then it outputs as a 3 character string. Array - Arr. String - Str. Object - Obj. Boolean - Boo. Number - Num.


####Definitions:
- *Thing* : Any variable or literal


####Returns:
String

####Examples:

```javascript

 var dog = new Number()
 undefined
 J.getType(dog)
 "Num"
 

var elem = document.createElement("div")
// undefined
J.getType(elem)
// "HTMLDivElement"

```

#mapArguments



```javascript
J.mapArguments(arguments) 
```
This is an internal utility that is exposed for those who need it. It outputs all of the arguments passed in grouped by their type. Primary types are output as 3 characters. Array - Arr. String - Str. Object - Obj. Boolean - Boo. Number - Num.


####Definitions:
- *arguments* : The special arguments variable inside a function


####Returns:
Object with arrays grouped by their type name

####Examples:

```javascript
 function test() { 
  var map = J.mapArguments(arguments) 
  console.log(map) 
 } 
 
 test(1234, 'Hello World', 513, {}, [], document.createElement('div')) 

 Object 
 Arr: Array[1] 
 HTMLDivElement: Array[1] 
 Num: Array[2] 
 Obj: Array[1] 
 Str: Array[1]
 

```
