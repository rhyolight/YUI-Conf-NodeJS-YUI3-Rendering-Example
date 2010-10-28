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
		
			YUI({filter: 'raw'}).use(
					'node', 
					'event-custom', 
					'overlay', 
					'ajax-module-loader', 
					'doc-detail-handler', 
			function(Y) {
				
				var dynamicallyLoadedModules = ${modulesAsJSON},
					loaded = 0;
					
				function onModuleLoad(opts) {
					var moduleType = opts.moduleType;
					var $moduleNode = Y.one('#' + moduleType + '-container');
					$moduleNode.removeClass('loading ' + moduleType);
					loaded++;
					if (loaded === dynamicallyLoadedModules.length) {
						Y.Global.fire('all-modules-loaded');
					}
				}
					
				Y.Array.each(dynamicallyLoadedModules, function(moduleType) {
					var $moduleNode = Y.one('#' + moduleType + '-container');
					$moduleNode.addClass('loading ' + moduleType);
					Y.YUICONF.loadModule(moduleType, $moduleNode, onModuleLoad);
				});

				Y.one('body').prepend('<h1 class="notice rounded">Rendered with YUI3 on Client</h1>');
			});
		
		</script>
    </body>
</html>
