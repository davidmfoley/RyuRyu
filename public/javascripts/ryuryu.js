var ryuryu = {};

ryuryu.board = function(element) {
	var wrapper = $(element);
	return {
		load : function(json) {
			wrapper.html("<div class='square'/>");
		}
	};
};