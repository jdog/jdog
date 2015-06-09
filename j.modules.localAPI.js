J.addWait(
	"Modules.localAPI_jDog"
	, [ "Modules.remoteAPI" ] // local inherits from remote
	, function(ref) {

		var dog = ref.remoteAPI
			, root = location.host === "jdog.github.io" ? "//jdog.github.io/jdog/" : ""

		PAGE.load(
			root + "j.docs.j_page.js"
			, root + "j.docs.j.js"
		)

		dog.buildAllSections([
			"Docs.jDog"
			, "Docs.J"
		])

		return dog

	})
