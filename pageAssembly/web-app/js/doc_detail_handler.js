YUI().add('doc-detail-handler', function(Y) {
    
    Y.Global.on('all-modules-loaded', function() {
    	var $docNodes = Y.all('.doctor');

    	$docNodes.each(function($docNode) {
    		var $h2 = $docNode.one('h2'),
    			id = $docNode.get('id').split('-')[1];
    		$h2.on('click', function(evt) {

    			var params = {id: id, renderOnNode: true},
    			    moduleType = 'doctorDetail',
    				old = Y.one('#' + moduleType),
    				$detailNode = Y.one('#' + moduleType + '-container'),
    				renderOnNode = Y.one('#renderDialogOnServer').get('checked'),
    				params = {id: id, renderOnNode: true, renderOnNode: renderOnNode};

    			evt.halt();

    			if (old) {
    				old.remove();
    			};

				var $moduleNode = Y.one('#' + moduleType + '-container');
				Y.YUICONF.loadModule(moduleType, $moduleNode, onModuleLoad, params);

    			function onModuleLoad(opts) {
    			    var moduleType = opts.moduleType,
    			        markup = opts.markup;
    				$moduleNode.removeClass('loading ' + moduleType);
    				if (markup) {
    					$detailNode.set('innerHTML', markup);
    				}
    				Y.log('docDetails loaded');
    				var overlay = new Y.Overlay({
    				    srcNode:"#doctorDetail",
    				    width:"50em",
    				    height:"22em",
    				    xy:[60,60]
    				});
    				overlay.render();
    				$detailNode.setStyle('display', 'block');
    				$detailNode.on('click', function() {
    					$detailNode.setStyle('display', 'none');
    				});
    			}

    		});
    	});			
    });
    
}, '0.1', {requires:['event-custom', 'node']});