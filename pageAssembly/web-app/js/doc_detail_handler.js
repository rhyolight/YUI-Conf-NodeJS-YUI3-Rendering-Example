YUI().add('doc-detail-handler', function(Y) {
    
    /* This code add eventing handling to the Doctor Who H2 nodes. 
     * it must be executed after that module has been loaded on the page,
     * so we listen for a global event that all modules have been loaded
     * before attempting to attach any event handlers. */
    Y.Global.on('all-modules-loaded', function() {

        /* for each doctor li node, we grab the id to pass to the backend, which
         * identifies the domain object associated with the doctor. Each H2 gets
         * a click handler, which ignores the default action and makes an call
         * to load yet another module called 'doctorDetail'.
         */
    	Y.all('.doctor').each(function($docNode) {
    		var $h2 = $docNode.one('h2'),
    		    // doctor domain object id for backend
    			id = $docNode.get('id').split('-')[1];

    		$h2.on('click', function(evt) {
    			var params = {id: id, renderOnNode: true},
    			    moduleType = 'doctorDetail',
    				old = Y.one('#' + moduleType),
    				$detailNode = Y.one('#' + moduleType + '-container'),
    				// user can specify this for this code demo
    				renderOnNode = Y.one('#renderDialogOnServer').get('checked'),
    				// need to send the domain id to backend so it knows which
    				// doctor to get detailed data for
    				params = {id: id, renderOnNode: renderOnNode};

    			evt.halt();

                // subsequent loads will replace the entire node, so if there is
                // an old node, just remove it from the DOM
    			if (old) {
    				old.remove();
    			};

				var $moduleNode = Y.one('#' + moduleType + '-container');
				Y.YUICONF.loadModule(moduleType, $moduleNode, onModuleLoad, params);

                /* This callback is called after the module's data has been loaded,
                 * any rendering scripts have been loaded, and the DOM has been 
                 * updated (if the reponse was meant to be rendered on the client).
                 * If the view was rendered on the server, this function will be
                 * passed a string of markup, which we set into the outer DOM node. */
    			function onModuleLoad(opts) {
    			    var moduleType = opts.moduleType,
    			        markup = opts.markup;
    				$moduleNode.removeClass('loading ' + moduleType);
    				// if we were passed markup, the view was rendered on the server,
    				// so we only need to set it into our node
    				if (markup) {
    					$detailNode.set('innerHTML', markup);
    				}
    				Y.log('docDetails loaded');
    				var docDetailOverlay = new Y.Overlay({
    				    srcNode:"#doctorDetail",
    				    width:"50em",
    				    height:"22em",
    				    xy:[60,60]
    				});
    				docDetailOverlay.render();
    				
                    docDetailOverlay.show();
    				
    				// close the docDetailOverlay on click
    				$detailNode.on('click', function() {
    				    docDetailOverlay.hide();
    				});
    			}

    		});
    	});			
    });
    
}, '0.1', {requires:['event-custom', 'node', 'ajax-module-loader', 'overlay']});