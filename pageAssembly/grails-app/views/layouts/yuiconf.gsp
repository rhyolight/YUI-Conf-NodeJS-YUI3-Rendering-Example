<html>
    <head>
        <title><g:layoutTitle default="Grails" /></title>
        <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/combo?3.2.0/build/cssfonts/fonts-min.css">
		<link rel="stylesheet" type="text/css" href="${resource(dir:'css', file:'yuiconf.css')}">
        
        <g:layoutHead />
        <g:javascript library="application" />
    </head>
    <body>
		<h1>Browser & Client Side Rendering Prototype</h1>
		<div class="actions rounded orange">
			<h3>Ways to Render</h3>
			<ul>
			<li><g:link>Render on Server (GSP)</g:link></li>
			<li><g:link params="[renderOnClient:true]">Render on Client (JS)</g:link></li>
			<li><g:link params="[renderOnNode:true]">Render on NodeJS (JS)</g:link></li>
			<li><input id="renderDialogOnServer" type='checkbox' CHECKED><label for="renderDialogOnServer">Render Dialog on Server</li>
			</ul>
		</div>
        <g:layoutBody />
    </body>
</html>