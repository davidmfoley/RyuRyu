var ryuryu = {};

ryuryu.board = function(element) {
	var wrapper = $(element);
	var data = "[{}]";
	return {
		load : function(json) {
			data = json;
			wrapper.html('');
			var squares = {};
			var regions = eval(json);

			var squareMarkup = "";

			var square_count = 0;

			for (var i = 0; i < regions.length; i++) {
				var region = regions[i];
				for (var j = 0; j < region.squares.length; j++) {

					var square = region.squares[j];
					var info;

					if (j == 0)
						info = '' + region.total + region.operator;
					else
						info = "";

					squares[square] = {
						info : info,
						region : region
					};
					square_count++;
				}
			}

			var board_size = Math.sqrt(square_count);

			for (var row = 1; row <= board_size; row++) {
				for (var col = 1; col <= board_size; col++) {
					var s = squares[[row, col]];

					squareMarkup += "<div class='square" + getSquareClasses(s, row, col, board_size) + "'><div class='region-info'>" + s.info + "</div></div>";
				}
			}

			console.log(squareMarkup);

			wrapper.html(squareMarkup);
		},
		toJson : function() {
			//temp... once this is editable, this will need to change
			return data;
		}
	};

	function getSquareClasses(square, row, col, board_size) {

		var hasRightNeighbor =false, hasBottomNeigbor = false;

		for (var i = 0; i < square.region.squares.length; i++) {
			var other = square.region.squares[i];

			if (other[0] == row+1 && other[1] == col)
				hasBottomNeigbor = true;
			if (other[0] == row && other[1] == col+1)
				hasRightNeighbor = true;
		
			console.log(row, col, hasBottomNeigbor, hasRightNeighbor);
		}

		return	classIf( 'right-edge', (col < board_size) && !hasRightNeighbor) +
			classIf( 'bottom-edge', (row < board_size) && !hasBottomNeigbor) +
			classIf( 'outside-top-edge', row == 1) +
			classIf( 'outside-left-edge', col == 1) +
			classIf( 'outside-bottom-edge', row == board_size) +
			classIf( 'outside-right-edge', col == board_size);
	}

	function classIf( className, condition) {
		return (condition) ? " " + className  : "";
	}
};