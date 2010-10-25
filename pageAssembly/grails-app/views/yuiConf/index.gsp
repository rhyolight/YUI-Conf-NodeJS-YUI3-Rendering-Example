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
		
		<script>
		
			YUI({filter: 'raw'}).use('node', 'event', 'overlay', 'ajax-module-loader', function(Y) {
				
				<g:render template="eventHandlingJs"/>
				
				var dynamicallyLoadedModules = ${modulesAsJSON},
					loaded = 0;
					
				function onModuleLoad(moduleType) {
					var $moduleNode = Y.one('#' + moduleType + '-container');
					$moduleNode.removeClass('loading ' + moduleType);
					loaded++;
					if (loaded === dynamicallyLoadedModules.length) {
						Y.fire('all-modules-loaded');
					}
				}
				
				function loadModule(moduleType, cb, params) {
					var $moduleNode = Y.one('#' + moduleType + '-container');
					$moduleNode.addClass('loading ' + moduleType);
					Y.YUICONF.loadModule(moduleType, $moduleNode, cb, params);
				}
					
				Y.Array.each(dynamicallyLoadedModules, function(type) {
					loadModule(type, onModuleLoad);
				});

				Y.one('body').prepend('<h1 class="notice rounded">Rendered with YUI3 on Client</h1>');
			});
		
		</script>
    </body>
</html>
