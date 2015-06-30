var fs = require("fs")
	, J = require("../jdog.js") // creates global J
	, text = ""

require("./j.constructors.buildDocMethod.js")
require("./j.docs.j_page.js")
require("./j.docs.j.js")

buildAllSections([
	"Docs.jDog"
	, "Docs.J"
])

function buildAllSections(arr) {
	arr.forEach(createSection)
}

function createSection(path) {
	var data = J.exists(path)
	data.Methods.forEach(build)
}

function build(item, index, arr) {
	text += J.Constructors.BuildDocMethod(item)
}

fs.writeFileSync("../README.md", text)
