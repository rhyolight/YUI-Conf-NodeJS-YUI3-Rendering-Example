var l = require('./logger'),
	arr = require('./array'),
	http = require('http'),
	rendererCache = [];

function loadJS(url, cb, force) {
	var jsfilename, rendererFn, alreadyCached = false;

	getUrlContents(url, function(js) {
		jsfilename = getJSFileName(url);
		l.log('js file name: ' + jsfilename);
		alreadyCached = (arr.findIndex(rendererCache, function(it) {
			return (it.name === jsfilename);
		}) > -1);
		l.log(jsfilename + ' cached? : ' + alreadyCached);
		if (!force && alreadyCached) {
			l.log('using cached renderer originally loaded from "' + url.href + '"');
			cb(RENDERERS[jsfilename]);
			return;
		}
		try {
			if (alreadyCached) {
				l.log('forcing refresh for renderer: ' + jsfilename);
				deleteRendererFromCache(url);
			}
			l.log('Evil() renderer...');
			eval(js);
			l.log('JS has evil()ed... pushing "' + url.href + '" to cache.');
			cacheTheRenderer(url);
			cb(RENDERERS[jsfilename]);
		} catch (err) {
			cb(errorFunctionCreator(err, url.href));
		}
	});
}

function cacheTheRenderer(url) {
	var name = getJSFileName(url),
		obj = {
			href: url.href,
			name: name,
			remove: function() {
				l.log('removing cache for ' + name);
				l.log('before removal, RENDERERS.' + name + ' is:\n' + RENDERERS[name]);
				delete RENDERERS[name];
				l.log('after removal, RENDERERS.' + name + ' is:\n' + RENDERERS[name]);
			}
		};
	rendererCache.push(obj);
	l.log('cache complete for ' + url.href + '. cache has ' + rendererCache.length + ' items.');
}

function deleteRendererFromCache(url) {
	var name = getJSFileName(url),
		cacheIndex = arr.findIndex(rendererCache, function(it) {
			l.log('checking ' + it.name + ' vs ' + name);
			return (it.name === name);
		}),
		cache = rendererCache[cacheIndex];
	cache.remove();
	arr.remove(rendererCache, cacheIndex);
	l.log('cache delete complete for ' + url.href + '. cache has ' + rendererCache.length + ' items.');
}

function getJSFileName(url) {
	var parts = url.pathname.split('/');
	var file = parts[parts.length-1];
	return file.split('.')[0];
}

function getUrlContents(url, cb) {
	l.log('processing url: ' + url.href);
	var result = '';
	var host = url.host;
	if (url.host.indexOf(':') > 0) {
	    host = url.host.split(':')[0];
	}
	var client = http.createClient(url.port || 80, host);
	var request = client.request(
		url.method || 'GET', 
		url.pathname,
		{ 'host': url.host }
	);
	request.end();
	request.on('response', function(resp) {
		resp.on('data', function(chunk) {
			result = result + chunk;
		}).on('end', function() {
			cb(result);
		});
	});
}

function errorFunctionCreator(err, url) {
	return function() {
		var msg = "There was an error within the renderer at " + url + ":\n" + err + "\n";
		l.log(msg);
		return msg;
	};
}

exports.render = function(data, url, Page, cb, force) {
	var force = force || false;

	l.log('rendering... force refresh is ' + force);

	loadJS(url, function(renderFn) {
		// l.log(data);
		Page.log = l.log;
		var opts = {
			node: Page.one('body'), 
			source: 'NodeJS',
			data: data,
			Y:Page
		};
		cb(renderFn(opts));
	}, force);
	
};
