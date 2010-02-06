ryuryu.board = function(json) {
	var data = json;
	var squares = {};
	var jsonRegions = eval("(" + json + ")").regions;
	var regions = [];

	var square_count = 0;
	var board_size;


	for (var i = 0; i < jsonRegions.length; i++) {
		var jsonRegion = jsonRegions[i];
		var region = {
			squares : [],
			total : jsonRegion.total,
			operator : jsonRegion.operator
		};

		for (var j = 0; j < jsonRegion.squares.length; j++) {

			var square = jsonRegion.squares[j];
			var info;

			if (j == 0)
				info = '' + jsonRegion.total + jsonRegion.operator;
			else
				info = "";

			squares[square] = {
				info : info,
				region : jsonRegion
			};

			region.squares.push(squares[square]);
			square_count++;
		}

		regions.push(region);
	}

	board_size = Math.sqrt(square_count);

	return {
		squareAt : function(row, col) {
			return squares[[row,col]];
		},
		regions : function() {
			return regions;
		},
		size : function() {
			return board_size;
		},
		toJson : function() {
			//temp... once this is editable, this will need to change
			return data;
		}
	};
};