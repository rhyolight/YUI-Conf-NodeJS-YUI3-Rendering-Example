var sys = require('sys'),
    time, lastMark;

function log(str) {
	var t = new Date();
	sys.puts(t + ':\t' + str);
};

exports.log = log;

exports.startTimer = function() {
    time = new Date().getTime();
    lastMark = time;
};

exports.mark = function(tag) {
    var t = new Date().getTime();
    var incrementalDiff = t - lastMark;
    lastMark = t;
    log("::" + tag + "::" + incrementalDiff);
};

