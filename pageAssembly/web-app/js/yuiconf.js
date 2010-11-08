YUI({gallery: 'gallery-2010.08.04-19-46'}).add('yuiconf', function(Y) {
    
    Y.namespace('YUICONF');
    
    var on = extractParam('log'),
        supress = false,
        block = extractParam('block'),
    
        infoOverlay = new Y.Overlay({
            headerContent: 'Rendering Log',
            bodyContent: '<ul id="demolog"></ul>',
            width       : '600px',
            zIndex      : 100,
            xy: [200, 10],
            constrain   : true,
            render      : true,
            visible     : false,
            plugins     : [
                { fn: Y.Plugin.OverlayModal },
                { fn: Y.Plugin.OverlayKeepaligned },
                { fn: Y.Plugin.OverlayAutohide, 
                    cfg: {
                        focusedOutside : false  // disables the Overlay from auto-hiding on losing focus
                    }
                }
            ],
        }),
        count = 0,
    
        demolog = Y.one('#demolog');
        
    infoOverlay.on('visibleChange', function(evt) {
        if (!evt.newVal) {
            Y.one('#demolog').set('innerHTML', '');
        }
    });
    
    // handling nav links and attaching log flags
    Y.all('.render-link').on('click', function(evt) {
        var url = evt.target.get('href');
        if (Y.one('#logit').get('checked')) {
            url = url + '&log=1';
        }
        if (Y.one('#blockit').get('checked')) {
            url = url + '&block=1';
        }
        evt.halt();
        window.location = url;
    });
    
    Y.Global.on('demo-info', function(payload) {
        updateOptions();
        if (!on) { return; }
        var evenOdd = count++ % 2 == 0 ? 'even' : 'odd';
        var typeClass = payload.type ? payload.type + '-log' : '';
        demolog.append('<li class="' + typeClass + ' ' + evenOdd + '">'
            + '<div class="arrow">⬅</div>'
            + '<span class="' + payload.context + '">' + payload.context + '</span>:  ' + payload.text 
            + '</li>');
        infoOverlay.show();
        if (block) {
            alert(payload.context + '\n-------------------\n' + payload.text);
        }
    });
    
    function updateOptions() {
        function isChecked(name) {
            return Y.one('#' + name).get('checked');
        }
        on = isChecked('logit');
        block = isChecked('blockit');
    }
    
    function extractParam(name) {
        var regex = null, 
            results = null;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        regex = "[\\?&]"+name+"=([^&#]*)";
        regex = new RegExp( regex );
        results = regex.exec( window.location.href );
        if( results == null ) {
            return false;
        } else {
            if (results[1].indexOf(',') < 0) {
                return [results[1]];
            } else {
                return results[1].split(',');
            }
        }
    }
    
}, '0.1', {requires: ['gallery-overlay-extras', 'node', 'overlay', 'widget-anim']});