<html>
    <head>
        <title><g:layoutTitle default="Grails" /></title>
        <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/combo?3.2.0/build/cssfonts/fonts-min.css">
		<link rel="stylesheet" type="text/css" href="${resource(dir:'css', file:'yuiconf.css')}">
        
        <g:layoutHead />
    </head>
    <body>
		<h1>Browser & Client Side Rendering Prototype</h1>
		<div class="actions rounded orange">
			<h3>Ways to Render</h3>
			<ul>
			<li><g:link>Render on Server (GSP)</g:link></li>
			<li class="render-link"><g:link params="[renderOnClient:true]" elementId='renderOnClientLink'>Render on Client (JS)</g:link></li>
			<li class="render-link"><g:link params="[renderOnNode:true]" elementId='renderOnNodeLink'>Render on NodeJS (JS)</g:link></li>
			<li><input id="renderDialogOnServer" type='checkbox'><label for="renderDialogOnServer">Render Dialog on Server</li>
			<li><input id="logit" type='checkbox' ${logit ? 'CHECKED' : ''}><label for="logit">Turn on Logs</li>
			<li><input id="blockit" type='checkbox' ${blockit ? 'CHECKED' : ''}><label for="blockit">Blocking Logs</li>
			</ul>
		</div>
        <g:layoutBody />
    </body>
</html>