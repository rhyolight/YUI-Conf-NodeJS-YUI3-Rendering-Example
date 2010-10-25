class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(controller:"yuiConf")
		"/ajp"(controller:"yuiConf", action:"dispatch")
		"500"(view:'/error')
	}
}
