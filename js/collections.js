var Collections = {};

Collections.Images = Backbone.Collection.extend({
	sort: "hot",
	page: 1,

	proxy: function(url) {
		var params = {
			q: "select gallery from json where url=\"" + url + "\"",
			format: "json",
		};

		return "http://query.yahooapis.com/v1/public/yql" + "?" + $.param(params);
	},

	url: function() {
		//console.log("Loading page " + this.page);
		var url = "http://imgur.com/gallery/" + this.sort + "/all/page/" + this.page++ + ".json";
		return this.proxy(url);
	},

	parse: function(data) {
		if(!data.query.count) return [];

		return data.query.results.json.map(function(item) {
			return new Models.Image(item.gallery);
		});
	}
});
