var Collections = {};

Collections.Images = Backbone.Collection.extend({
	sort: "new",
	page: 1,

	/*
	yqlproxy: function(url) {
		var params = {
			q: "select gallery from json where url=\"" + url + "\"",
			format: "json",
		};

		return "http://query.yahooapis.com/v1/public/yql" + "?" + $.param(params);
	},

	yqlparse: function(data) {
		if(!data.query.count) return [];

		return data.query.results.json.map(function(item) {
			return new Models.Image(item.gallery);
		});
	},
	*/

	proxy: function(url) {
		return "http://www.macropus.org/imgur/gallery.php?url=" + encodeURIComponent(url);
	},

	url: function() {
		//console.log("Loading page " + this.page);
		var url = "http://imgur.com/gallery/" + this.sort + "/all/page/" + this.page++ + ".json";
		return this.proxy(url);
	},

	parse: function(data) {
		if(!data.gallery) return [];

		return data.gallery.map(function(item) {
			return new Models.Image(item);
		});
	},

});
