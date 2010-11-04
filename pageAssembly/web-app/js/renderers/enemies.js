if (typeof RENDERERS === 'undefined') { RENDERERS = {}; };

RENDERERS.enemies = function(opts) {
	var $node = opts.node, 
        data = opts.data, 
        Y = opts.Y, 
        $enemies,
        cnt = 1;
        
    Y.log('"enemies" data being rendered into <strong>' + $node.getAttribute('id') + '</strong> node.', 'info');
        
	$node.append('<div class="source">rendered by ' + opts.source + '</div>');
    $node.append('<ul id="enemies"></ul>');
    $enemies = $node.one('ul');
	Y.Array.each(data, function(enemy) {
		$enemies.append('<li><h2>' + enemy.name + '</h2><img src="' + enemy.image + '"><p>' + enemy.desc + '</p></li>');
	});
	return $node.get('innerHTML');
};