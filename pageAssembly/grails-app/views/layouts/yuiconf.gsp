<html>
    <head>
        <title><g:layoutTitle default="Grails" /></title>
        <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/combo?3.2.0/build/cssfonts/fonts-min.css">
        
		<style type="text/css" media="screen">
			body {
				font-family: Helvetica;
				font-size: 12pt;
			}
			ul {
				margin: 0px;
				padding: 0px;
			}
			li {
				margin: 0px;
				padding: 0px;
			}
			#doctors-container {
				float:right;
			}
			#enemies, .enemies{
				border: solid black 1px;
				width: 300px;
			}
			#doctors, .doctors {
				border: solid black 1px;
				width: 400px;
			}
			.who li img {
				width: 100px;
				float:left;
				margin: 0px 20px;
			}
			.who li {
				clear: left;
				list-style: none;
				margin: 20px 0px;
				padding-top: 20px;
			}
			#doctors li img {
				height: auto;
				float: right;
			}
			#doctors li {
				clear: right;
			}
			.who h2 {
				padding-left: 20px;
				font-size: 14pt;
			}
			.loading {
				background-image: url("${createLinkTo(dir:'images', file:'ajax-loader.gif')}");
				background-position: center;
				background-repeat: no-repeat;
				height: 100px;
				width: 100px;
			}
			.actions {
				position: absolute;
				top: 80px;
				left: 340px;
				padding-top: 20px;
				width: 200px;
				
			}
			.notice {
				position: absolute;
				top: 260px;
				left: 340px;
				color: white;
				background-color: #BE1B34;
				width: 200px;
			}
			.rounded {
				border: solid black 2px;
				-moz-border-radius: 15px;
				-webkit-border-radius: 15px;
				padding: 10px;
			}
			.orange {
				background-color: #F4A31F;
			}
			.source {
				color: grey;
				font-size: 11pt;
			}
			#doctorDetail {
				background-color: #fdf3cd;
				overflow: auto;
				padding: 20px;
				border: solid black 2px;
			}
			#doctorDetail img {
				float:right;
				height: 16em;
			}
        </style>
        <g:layoutHead />
        <g:javascript library="application" />
    </head>
    <body>
		<h1>Browser & Client Side Rendering Prototype</h1>
		<div class="actions rounded orange">
			<h3>Ways to Render</h3>
			<g:link params="[renderOnServer:true]">Render on WebApp Server (via Template Engine)</g:link><br/><br/>
			<g:link>Render on Client (JS)</g:link><br/><br/>
			<g:link params="[renderOnNode:true]">Render on NodeJS (JS)</g:link>
		</div>
        <g:layoutBody />
    </body>
</html>