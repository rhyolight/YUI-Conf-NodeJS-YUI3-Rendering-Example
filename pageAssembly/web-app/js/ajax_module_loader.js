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
        var ioOptions = {
			data: {
			    // meta data identifies to the server what controller/action to 
			    // execute
				meta: {
					context: 'yuiConf',
					action: moduleType
				}
			},
			on: {
				success: function(data, skipRender) {
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
			}
		};
		if (params) {
		    Y.mix(ioOptions.data, params);
		}
        
		getRenderingData(ioOptions);
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
    
    function getRenderingData(opts) {
        var url = '/pageAssembly/ajp',
            defaults = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                on: {}
            },
            cfg = Y.merge(defaults, opts);
        
        if (cfg.data && !cfg.data.meta) {
            cfg.data.meta = {
                context: 'default',
                action: 'status'
            };
        }
        
        var successCb = cfg.on.success;
        
        cfg.on.success = function(id, resp) {
            // if this is JSON data, load the JS and render data to HTML
            if (isJSON(resp)) {
                var json = Y.JSON.parse(resp.responseText),
                    rendererUrl = json.renderer;
                Y.Get.script(rendererUrl, {
                    onSuccess: function() {
                        successCb(json.data);
                    },
                    onFailure: function(o) {
                        Y.log('failed to load renderer: ' + rendererUrl);
                    }
                });                
            } else {
                successCb(resp.responseText, true);
            }
        };
        
        Y.io(url, cfg);
    }
    
}, '0.1', {requires: ['io', 'oop', 'querystring-stringify', 'json-parse']});