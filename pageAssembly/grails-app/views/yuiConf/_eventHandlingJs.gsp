Y.on('all-modules-loaded', function() {
	var $docNodes = Y.all('.doctor');

	$docNodes.each(function($docNode) {
		var $h2 = $docNode.one('h2'),
			id = $docNode.get('id').split('-')[1];
		$h2.on('click', function(evt) {

			var params = {id: id, renderOnNode: true},
				old = Y.one('#doctorDetail'),
				$detailNode = Y.one('#doctorDetail-container'),
				renderOnNode = Y.one('#renderDialogOnServer').get('checked'),
				params = {id: id, renderOnNode: true, renderOnNode: renderOnNode};

			evt.halt();

			if (old) {
				old.remove();
			};
			
			loadModule('doctorDetail', onModuleLoad, params);
			
			function onModuleLoad(moduleType, markup) {
				var $moduleNode = Y.one('#' + moduleType + '-container');
				$moduleNode.removeClass('loading ' + moduleType);
				if (markup) {
					$detailNode.append(markup);
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