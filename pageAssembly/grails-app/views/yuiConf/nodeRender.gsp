<html>
    <head>
        <title>YUIConf Rendering Demo</title>
        <meta name="layout" content="yuiconf" />

    </head>
    <body class="yui3-skin-sam  yui-skin-sam">

		<h1 class="notice rounded">Rendered with YUI3 on NodeJS</h1>

		<div class="who">
			
			<g:each in="${markups}">
			
				<div id="${it.key}-container">
					${it.value}
				</div>
			
			</g:each>
			
		</div>
		
		<div id="doctorDetail-container"></div>
	
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
				Y.Global.fire('all-modules-loaded');
			});
		
		</script>
	
    </body>
</html>
