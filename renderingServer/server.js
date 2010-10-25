#!/usr/bin/env node

var sys = require('sys'),
	l = require('./lib/logger'),
    http = require('http'),
    fs = require('fs'),
	renderer = require('./lib/renderer'),
	querystring = require('querystring'),
	url = require('url'),
	startRequest,
	startRender,
    YUI = require("yui3").YUI;

require("assert").equal( global.YUI, undefined, "global yui created");

var DEBUG = true;

YUI({ debug: DEBUG }).use('base', 'nodejs-dom', 'node', 'gallery-yql', 'json-stringify', function(Y) {
    
    var docType = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">' + "\n";

	function returnError(res, err) {
		l.log("There was an error prepping for render: " + err + "\n");
        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.write(msg);
        res.end();
	}

    http.createServer(function (req, res) {
		startRequest = new Date().getTime();
		var POST = '';

		req.on('data', function(chunk) {
			POST = POST + chunk;
		}).on('end', function() {
			var data = querystring.parse(POST);
			
	        YUI({ debug: DEBUG }).use('nodejs-dom', 'node', 'json-stringify', function(Page) {
				var node, forceRefreshRenderer = false;
				
				// request might have a markup string to be transformed by the renderer
				if (data.html && (typeof data.html !== 'string') && data.html.length > 0) {
    				// set the markup send in the request into our mocked DOM as the body's innerHTML
    				Page.one('body').set('innerHTML', data.html);
				}
				
                // request may specify a selector identifying the node within the markup
                // to be used as the view node
				if (data.selector) {
					node = Page.one(data.selector);
				} else {
	            	node = Page.one('body');
				}

                // extract the URL of the JavaScript renderer, or err of there is none
				var myUrl = url.parse(req.url, true);
				if (!myUrl.query || myUrl.query.js === null) {
					returnError(res, "No 'js' parameter in URL");
					return;
				}
				var jsUrl = url.parse(decodeURIComponent(myUrl.query.js), true);

                // Allow clients to force renderer refresh
				if (myUrl.query.force && myUrl.query.force === 'true') {
					forceRefreshRenderer = true;
				}
	
				startRender = new Date().getTime();
				
				data = JSON.parse(decodeURIComponent(data.data));
				
				// call the renderer module with the data and URL to the rendering script,
				// when finished, write out response and end
                renderer.render(data, jsUrl, Page, function(markup) {
                    var timeDiff = new Date().getTime() - startRender;
                    out = markup;
		            res.writeHead(200, {
		                'Content-Type': 'text/html'
		            });
		            res.write(out);
		            res.end();
                    l.log('request done, took ' + (new Date().getTime() - startRequest) + 'ms');
				}, forceRefreshRenderer);
	
	        });

		});

    }).listen(8088);

    Y.log('Server running at http://127.0.0.1:8088/');

});
