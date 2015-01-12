PAGE.addWait(
	"Modules.localAPI"

	, [
		"ajax"
		, "Constructors.APIMethod" 
		, "BatchCallback" 
		, "Modules.dom"
		, "ready" // dom is loaded
		, "Modules.remoteAPI" // local inherits from this
	]

	, function(ref) {

		var dog = ref.remoteAPI

		dog.buildAllSections([
			"Docs.loader_add"
			, "Docs.loader_PAGE"
			, "Docs.loader"
		])

		return dog

	})
