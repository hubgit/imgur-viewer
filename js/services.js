var Service = function() {};

Service.prototype.get = function(options) {
	options = $.extend({ cache: true }, options);
	options.data = $.extend({}, this.defaults, options.data);

	var method = options.queue ? $.ajaxQueue : $.ajax;
	return method(options);
};

var Imgur = function(options) {
	this.defaults = $.extend({}, options);


	this.proxy = function(url) {
		return "./proxy.php?url=" + encodeURIComponent(url);
	}

	this.gallery = function(options) {
		var url = "http://imgur.com/gallery/" + options.sort + "/all/page/" + options.page + ".json";
		url = this.proxy(url);

		return this.get({ url: url });
	};
};

Imgur.prototype = new Service();
