YUI3 & NodeJS JavaScript View Rendering Examples
================================================

The Components
--------------

### NodeJS Server

This acts as a web service, and accepts requests with JSON data and a URL to a JavaScript renderer script. It returns a string of HTML as the response, or an error message.

In order for this component to work properly, you must install the [nodejs-yui3](http://github.com/davglass/nodejs-yui3 "Dav Glass's NodeJS YUI3 Module") module. Once that is done, `cd` into the [`renderingServer`](http://github.com/rhyolight/YUI-Conf-NodeJS-YUI3-Rendering-Example/tree/master/renderingServer) directory start the server like this:

	node server.js

### Grails Web Server

Grails is used as the page assembly component. It delivers content to the browser and hosts the JavaScript renderer scripts. It acts as the AJAX dispatcher, and calls the NodeJS server to render data to HTML.

To use this, you must first follow the [Grails installation](http://grails.org/Installation "Grails Installation Instructions") instructions to install [Grails 1.3.5](http://grails.org/Download "Grails Download Page"). Once complete, `cd` into the [`pageAssembly`](http://github.com/rhyolight/YUI-Conf-NodeJS-YUI3-Rendering-Example/tree/master/pageAssembly) directory and start the web server like this:

	grails run-app

### Browser JavaScript

There is some logic on the browser that helps enable all this. In addition to the JavaScript renderer scripts that might be loaded into the browser by the Grails web server, there is also an AJAX Module Loader component that is used to request and load modules from the web server by accepting JSON data and using the provided renderer scripts to transform the local DOM.

No installation is required for this component. The JavaScript is server to both the browser and the NodeJS server by the Grails Web App.

Now What?
---------

Once you have both servers started up, just go to http://localhost:8080/pageAssembly/ to view the demo.

What is Going on Here?
----------------------

I'll try to explain later. ;)