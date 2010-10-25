YUI3 & NodeJS JavaScript View Rendering Examples
================================================

The Components
--------------

### NodeJS Server

This acts as a web service, and accepts requests with JSON data and a URL to a JavaScript renderer script. It returns a string of HTML as the response, or an error message.

### Grails Web Server

I used this as the page assembly component. It delivers content to the browser and hosts the JavaScript renderer scripts. It acts as the AJAX dispatcher, and calls the NodeJS server to render data to HTML.

### Browser JavaScript

There is some logic on the browser that helps enable all this. In addition to the JavaScript renderer scripts that might be loaded into the browser by the Grails web server, there is also an AJAX Module Loader component that is used to request and load modules from the web server by accepting JSON data and using the provided renderer scripts to transform the local DOM.