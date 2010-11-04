if (typeof RENDERERS === 'undefined') { RENDERERS = {}; };

RENDERERS.doctorDetail = function(opts) {
    var $node = opts.node, 
        data = opts.data, 
        Y = opts.Y,
        $docDetailOverlay, $hd, $bd, $ft, $desc, $img;
    
    Y.log('"doctorDetail" data being rendered into <strong>' + $node.getAttribute('id') + '</strong> node.', 'info');

    $hd = Y.Node.create('<div class="yui3-widget-hd"><h3>' + data.name + '</h3></div>');
    
    $bd = Y.Node.create('<div class="yui3-widget-bd"></div>');
    $desc = Y.Node.create('<div class="desc">' + data.desc + '</div>');
    $img = Y.Node.create('<img src="' + data.image + '"/>');
    $bd.append($img).append($desc);
    
    $ft = Y.Node.create('<div class="yui3-widget-ft"><span class="source">rendered by ' + opts.source + '</span></div>');
    
	$docDetailOverlay = Y.Node.create('<div id="doctorDetail" class="yui3-overlay-loading"></div>');
	$docDetailOverlay.append($hd);
	$docDetailOverlay.append($bd);
	$docDetailOverlay.append($ft);
			
	$node.append($docDetailOverlay);
	
	return $node.get('innerHTML');
};