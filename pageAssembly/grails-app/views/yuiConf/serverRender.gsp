<html>
    <head>
        <title>YUIConf Rendering Demo</title>
        <meta name="layout" content="yuiconf" />

    </head>
    <body class="yui3-skin-sam  yui-skin-sam">
        
		<h1 class="notice rounded">Rendered with a Template Engine on WebApp Server</h1>

		<div class="who">
			<div id="doctors-container">
			<div class="source">rendered by Grails GSP</div>
			<ul id="doctors">
				<g:each in="${doctors}" var="doc" status="i">
					<li class="doctor-${i+1}">
						<a href="${doc.link}"><img src="${doc.image}"></a>
						<h2>${doc.name} (Doctor #${i+1})</h2>
					</li>
				</g:each>
			</ul>
			</div>
			
			<div id="enemies-container">
			<div class="source">rendered by Grails GSP</div>
			<ul id="enemies">
				<g:each in="${enemies}" var="enemy">
					<li>
						<h2>${enemy.name}</h2>
						<img src="${enemy.image}">
						<p>${enemy.desc}</p>
					</li>
				</g:each>
			</ul>
			</div>
		</div>
	
    </body>
</html>
