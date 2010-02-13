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
				region : jsonRegion,
				position : square
			};

			region.squares.push(square);
			square_count++;
		}

		regions.push(region);
	}

	board_size = Math.sqrt(square_count);

	function findRegionWithSquare(square) {
		for (var r = 0; r < regions.length; r++) {
			console.log(regions[r]);
			console.log(square);
			for (var s = 0; s < regions[r].squares.length; s++) {
				var p = regions[r].squares[s];
				if (p[0] == square[0] && p[1] == square[1])
					return regions[r];
			}
		}

		return undefined;
	}
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
		applyEdit : function(edit) {

			var squarePosition = edit.squares[0];
			var square = squares[squarePosition];
			var fromRegion = findRegionWithSquare(squarePosition);
			var toRegion = findRegionWithSquare(edit.addTo);
			square.region = toRegion;
			toRegion.squares.push(squarePosition);

			for (var i = 0; i < toRegion.squares.length; i++) {
				var regionSquare = toRegion.squares[i];
				this.squareAt(regionSquare[0], regionSquare[1]).region = toRegion;
			}
			for (var i = 0; i < fromRegion.squares.length; i++) {
				var sq = fromRegion.squares[i];
				if (sq[0] == squarePosition[0] && sq[1] == squarePosition[1]) {
					fromRegion.squares.splice(i, 1);
					return;
				}
			}
		},
		toJson : function() {
			
			var regionJson = [];

			for (var i = 0; i < regions.length; i++) {

				var sq = [];
				for (var s = 0; s < regions[i].squares.length; s++) {
					sq.push("[" + regions[i].squares[s].join(",") + "]")
				}

				regionJson.push("{squares:[" +sq.join(",") + "]}");
			}
			//temp... once this is editable, this will need to change
			return "{regions:[" + regionJson.join(",") + " ]}";
		}
	};
};