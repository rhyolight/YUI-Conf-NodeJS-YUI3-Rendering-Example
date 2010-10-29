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
        Y.log('loading module "' + moduleType + '"...');
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
        function renderingCallbackWrapper(data) {
		    var opts = {moduleType: moduleType};
		    if (Y.Lang.isString(data)) {
		        Y.log('setting markup directly into DOM');
		        opts.markup = data;
		    } else {
		        opts.data = data;
		        Y.log('calling renderer to update DOM');
		        RENDERERS[moduleType]({node:$node, data: data, Y:Y, source:getUserAgentString()});
		    }
			cb(opts);
		}
		
		loadResponseData(data, renderingCallbackWrapper);
	};
	
	/* Does the actual Y.IO call, loading any JS render it finds in the
	 * response. Then calls the given callback with either the JS object
	 * it parsed from the JSON response or the responseText.
	 */
	function loadResponseData(data, renderingCallback) {
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
        
        /* If the reponse contains JSON, this callback will parse it and 
         * ensure the proper renderer script is loaded before calling the
         * callback sent into this function, which will then use the loaded
         * renderer to update the DOM.
         */
        function scriptLoadingCallbackWrapper(id, resp) {
            Y.log('received module response from server');
            // if this is JSON data, load the JS and render data to HTML
            if (isJSON(resp)) {
                Y.log('parsing JSON from response');
                var json = Y.JSON.parse(resp.responseText),
                    rendererUrl = json.renderer;
                Y.log('loading JS renderer: ' + rendererUrl);
                Y.Get.script(rendererUrl, {
                    onSuccess: function() {
                        Y.log(rendererUrl + ' is loaded');
                        renderingCallback(json.data);
                    },
                    onFailure: function(o) {
                        Y.log('failed to load renderer: ' + rendererUrl, 'warn');
                    }
                });
            } 
            // this is just a markup string (or something else) so we just
            // pass the string back to the rendering callback and tell it
            // to skip the rendering
            else {
                Y.log('got string back from response');
                renderingCallback(resp.responseText);
            }
        };
        
        Y.log('IO call to ' + url);
        Y.io(url, ioOptions);
    }
    
    function isJSON(resp) {
	    return resp.getResponseHeader('Content-Type')
	               .indexOf('application/json') === 0;
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
    
}, '0.1', {requires: ['io', 'oop', 'querystring-stringify', 'json-parse']});