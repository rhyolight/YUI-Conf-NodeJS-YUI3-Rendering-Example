YUI().add('ajax-module-loader', function(Y) {
    
    Y.namespace('YUICONF');
    /* Makes an AJAX call to the server to load a module. 
     * moduleType: String identifier
     * $node: Y.Node the dom node that will be updated with results by the
     *          JavaScript renderer script. This may be null if the response
     *          contains only markup (meaning the rendering was done on the
     *          server)
     * cb: Function called after IO completion. May be passed JS object
     *      representing server response data or a markup string if the
     *      module was rendered on the server
     * params: object with data to be sent with request
     */
    Y.YUICONF.loadModule = function(moduleType, $node, cb, params) {
        // default meta data to tell server how to process ajax call
        var data = {meta: {context: 'yuiConf', action: moduleType}};
        // allows users to add more data to the call if they need to
		if (params) {
		    data = Y.mix(data, params);
		}
		
		/* Called after the rendering script is loaded. Will run the response
		 * data through the rendering script to updated the DOM node if
		 * the response data is a JS object. Otherwise, it assumes it is a
		 * markup string and just returns it to the original user-defined
		 * callback. 
		 */
        function renderingCallbackWrapper(data, skipRender) {
		    var opts = {moduleType: moduleType};
		    if (Y.Lang.isString(data)) {
		        opts.markup = data;
		    } else {
		        opts.data = data;
		    }
		    if (!skipRender) {
				RENDERERS[moduleType]({node:$node, data: data, Y:Y, source:getUserAgentString()});
		    }
			cb(opts);
		}
		
		getRenderingData(data, renderingCallbackWrapper);
	};
	
	function isJSON(resp) {
	    return resp.getResponseHeader('Content-Type').indexOf('application/json') === 0;
	}
	
	function getUserAgentString() {
	    var ua = '', patform = '';
        
	    Y.each(Y.UA, function(v, k) {
            var info = k + ': ' + v;

            if (v) {
                if (Y.Lang.isNumber(v)) {
                    ua = info;
                } else {
                    platform = v;
                }
            }
        });
        return ua + ', ' + platform;
	}
    
    function getRenderingData(data, cb) {
        var url = '/pageAssembly/ajp',
            ioOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
        
        ioOptions.on = {
            success: scriptLoadingCallbackWrapper
        };
        
        function scriptLoadingCallbackWrapper(id, resp) {
            // if this is JSON data, load the JS and render data to HTML
            if (isJSON(resp)) {
                var json = Y.JSON.parse(resp.responseText),
                    rendererUrl = json.renderer;
                Y.Get.script(rendererUrl, {
                    onSuccess: function() {
                        cb(json.data);
                    },
                    onFailure: function(o) {
                        Y.log('failed to load renderer: ' + rendererUrl);
                    }
                });                
            } else {
                cb(resp.responseText, true);
            }
        };
        
        Y.io(url, ioOptions);
    }
    
}, '0.1', {requires: ['io', 'oop', 'querystring-stringify', 'json-parse']});