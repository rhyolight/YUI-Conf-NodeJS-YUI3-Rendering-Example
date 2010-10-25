Y.on('all-modules-loaded', function() {
	var $docNodes = Y.all('.doctor');

	$docNodes.each(function($docNode) {
		var $h2 = $docNode.one('h2'),
			id = $docNode.get('id').split('-')[1];
		$h2.on('click', function(evt) {
			evt.halt();
			$detailNode = Y.one('#doctorDetail-container');
			var old = Y.one('#doctorDetail');
			if (old) {
				old.remove();
			};
			Y.YUICONF.loadModule('doctorDetail', $detailNode, function(markup) {
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
			}, {id: id, renderOnNode: true});
		});
	});			
});