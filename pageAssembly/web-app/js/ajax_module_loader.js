YUI().add('ajax-module-loader', function(Y) {
    
    Y.namespace('YUICONF');
    
    Y.YUICONF.loadModule = function(moduleType, $node, cb, params) {
        var ioOptions = {
			data: {
				meta: {
					context: 'yuiConf',
					action: moduleType
				}
			},
			on: {
				success: function(data, skipRender) {
				    if (!skipRender) {
    					RENDERERS[moduleType]({node:$node, data: data, Y:Y, source:getUserAgentString()});
				    }
					cb(moduleType, data);
				}
			}
		};
		if (params) {
		    Y.mix(ioOptions.data, params);
		}
        
		getRenderingData(ioOptions);
	};
	
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
                }
            },
            cfg = Y.merge(defaults, opts);
        
        if (cfg.data && !cfg.data.meta) {
            cfg.data.meta = {
                context: 'default',
                action: 'status'
            };
        }
        
        var successCb = cfg.on.success;
        
        var successWrapper = function(id, resp) {
            // if this is JSON data, load the JS and render to HTML
            if (resp.getResponseHeader('Content-Type').indexOf('text/plain') < 0) {
                var json = Y.JSON.parse(resp.responseText),
                    rendererUrl = json.renderer;
                Y.Get.script(rendererUrl, {
                    onSuccess: function() {
                        successCb(json.data);
                    },
                    onFailure: function(o) {
                        Y.log('failed to load render: ' + rendererUrl);
                    }
                });                
            } else {
                successCb(resp.responseText, true);
            }
        };
        
        if (!cfg.on) { cfg.on = {}; };
        
        cfg.on.success = successWrapper;
        
        Y.io(url, cfg);
    }
    
}, '0.1', {requires: ['io', 'oop', 'querystring-stringify', 'json-parse']});