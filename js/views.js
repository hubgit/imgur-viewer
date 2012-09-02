var Views = {};

Views.Images = Backbone.View.extend({
	className: "collection",

	initialize: function() {
		this.collection.on("reset", this.reset, this);
		this.collection.on("add", this.add, this);
		this.reset();
	},

	reset: function() {
		this.$el.empty();
		this.collection.each(this.add, this);
	},

	add: function(model) {
		var view = new Views.Image({
			className: "item",
			model: model,
		});
		view.render();
		this.$el.append(view.$el);
	}
});

Views.Image = Backbone.View.extend({
	events: {
		"click": "clicked"
	},

	render: function() {
		this.$el.html(Templates.Image(this.model.toJSON()));

		this.$("img").on("load", function() {
			$(this).addClass("loaded");
		});
	},

	clicked: function(event) {
		event.preventDefault();
		event.stopPropagation();

		this.$el.addClass("selected").siblings(".selected").removeClass("selected");
		app.views.viewer.showItem(this.model);
	}
});

Views.Pagination = Backbone.View.extend({
	tagName: "a",

	attributes: {
		rel: "next"
	},

	events: {
		"inview": "nextPage",
		"click": "clicked"
	},

	nextPage: function(event, inview) {
	    if (!inview) return;

	    var node = $(event.currentTarget);
	    if (node.hasClass("loading")) return;

	    node.addClass("loading");

	    return this.collection.fetch({ add: true }).done(function() {
	        node.removeClass("loading");
	    });
	},

	clicked:  function(event) {
	    event.preventDefault();
	    event.stopPropagation();

	    return this.nextPage(event, true);
	}
});

Views.Viewer = Backbone.View.extend({
	id: "viewer",

	events: {
		"click": "close"
	},

	initialize: function() {
		$(document).bind("keydown", this.handleKeypress);
	},

	handleKeypress: function(event) {
		var selected = app.views.images.$(".selected");
		if (!selected.length) return;

		switch (event.which) {
			// right = next
			case 39:
				if (!selected.next().click().length) {
					app.views.pagination.$el.click();
				}
			break;

			// left = previous
			case 37:
				selected.prev().click();
			break;
		}
	},

	showItem: function(model) {
		this.model = model;

		var data = model.toJSON();
		this.$el.html(Templates.Viewer(data));

		$("body").addClass("noscroll");
		this.$el.show(0);
	},

	close: function(event) {
		this.$el.hide(100);
		$("body").removeClass("noscroll");
		app.views.images.$(".selected").removeClass("selected");
	},
})
