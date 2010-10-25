if (typeof RENDERERS === 'undefined') { RENDERERS = {}; };

RENDERERS.doctors = function(opts) {
    var $node = opts.node, 
        data = opts.data, 
        Y = opts.Y, 
        $docs,
        cnt = 1;
        
    Y.log("'Doctors' renderer is executing.", 'info');
    
    $node.append('<div class="source">rendered by ' + opts.source + '</div>');
    $node.append('<ul id="doctors"></ul>');
    $docs = $node.one('ul');
	Y.Array.each(data, function(doc) {
		$docs.append('<li id="doctor-' + cnt + '" class="doctor"><a href="' + doc.link + '"><img src="' + doc.image + '"></a><a href="/pageAssembly/doctor/show/' + doc.id + '"><h2>' + doc.name + ' (Doctor #' + (cnt++) + ')</h2></a></li>');
	});
	
	return $node.get('innerHTML');
};