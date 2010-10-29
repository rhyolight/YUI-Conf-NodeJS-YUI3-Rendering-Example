<html>
    <head>
        <title>YUIConf Rendering Demo</title>
        <meta name="layout" content="yuiconf" />

    </head>
    <body class="yui3-skin-sam  yui-skin-sam">
        
		<div class="who">
			<g:each in="${modules}">
				<div id="${it}-container"></div>
			</g:each>
		</div>
		
		<div id="doctorDetail-container"></div>
		
		<noscript>
			<h2>Well, Crap!</h2>
			<p>Looks like you don't have JavaScript enabled. Please click the link below.</p>
			<g:link params="[renderOnNode:true]">Render on NodeJS (JS)</g:link>
		</noscript>

		<script type="text/javascript" src="http://yui.yahooapis.com/combo?3.2.0/build/yui/yui.js"></script>
		<g:javascript src="ajax_module_loader.js"/>
		<g:javascript src="doc_detail_handler.js"/>
		
		<script>
		
			YUI().use('node', 'event-custom', 'ajax-module-loader', 
					  'doc-detail-handler', function(Y) {
				
				var dynamicallyLoadedModules = ${modulesAsJSON},
					loaded = 0;
				
				/* Called after each module has been loaded and renderered. We are
				 * using this to keep track of what modules are loaded, and to turn
				 * off the 'ajax-loading' graphic. Once all modules have been loaded,
				 * we fire a global event to notify other scripts that might need to
				 * operate upon them. */
				function onModuleLoad(opts) {
					var moduleType = opts.moduleType;
					var $moduleNode = Y.one('#' + moduleType + '-container');
					$moduleNode.removeClass('loading ' + moduleType);
					loaded++;
					if (loaded === dynamicallyLoadedModules.length) {
						// all modules are loaded, fire the torpedo!
						Y.Global.fire('all-modules-loaded');
					}
				}
				
				// each module will be loaded by an individual AJAX call
				Y.Array.each(dynamicallyLoadedModules, function(moduleType) {
					var $moduleNode = Y.one('#' + moduleType + '-container');
					$moduleNode.addClass('loading ' + moduleType);
					// We pass the moduleType to identify what kind of module is
					// being loaded, a Y.Node representing the DOM node the view will
					// be rendered to, and an optional callback function
					Y.YUICONF.loadModule(moduleType, $moduleNode, onModuleLoad);
				});

				Y.one('body').prepend('<h1 class="notice rounded">Rendered with YUI3 on Client</h1>');
			});
		
		</script>
    </body>
</html>
