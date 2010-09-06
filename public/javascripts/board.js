ryuryu.board = function(json) {
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
			for (var s = 0; s < regions[r].squares.length; s++) {
				var p = regions[r].squares[s];
				if (p[0] == square[0] && p[1] == square[1])
					return regions[r];
			}
		}

		return undefined;
	}

	function removeFromRegion(fromRegion, squarePosition) {
		for (var i = 0; i < fromRegion.squares.length; i++) {
			var sq = fromRegion.squares[i];
			if (sq[0] == squarePosition[0] && sq[1] == squarePosition[1]) {
				fromRegion.squares.splice(i, 1);
				return;
			}
		}
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

			for (var editSquareIndex = 0; editSquareIndex < edit.squares.length; editSquareIndex++) {

				var squarePosition = edit.squares[editSquareIndex];
				var square = squares[squarePosition];
				var fromRegion = findRegionWithSquare(squarePosition);
				var toRegion = findRegionWithSquare(edit.addTo);
				square.region = toRegion;

				toRegion.squares.push(squarePosition);

				for (var i = 0; i < toRegion.squares.length; i++) {
					var regionSquare = toRegion.squares[i];
					this.squareAt(regionSquare[0], regionSquare[1]).region = toRegion;
				}

				removeFromRegion(fromRegion, squarePosition);
			}

			for (var i = regions.length -1; i >= 0; i--) {
				if (regions[i].squares.length == 0)
					regions.splice(i,1)
				else {
					for (var s = 0; s < regions[i].squares.length; s++) {
						var sq = regions[i].squares[s];

						if (s == 0)
							sq.info = regions[i].total + regions[i].operator;
						else
							sq.info = "";
					}
				}
			}

			if (this.onUpdate)
				this.onUpdate();
		},

		toJson : function() {

			var regionJson = [];

			for (var i = 0; i < regions.length; i++) {

				var sq = [];
				var currentRegion = regions[i];
				for (var s = 0; s < currentRegion.squares.length; s++) {
					sq.push("[" + currentRegion.squares[s].join(",") + "]")
				}

				regionJson.push("{\"squares\":[" + sq.join(",") + "], \"total\": " + currentRegion.total + ", \"operator\": \"" + currentRegion.operator + "\"}");
			}
			//temp... once this is editable, this will need to change
			var json = "{\"regions\":[" + regionJson.join(",") + " ]}";

			console.log(json);
			return json;
		}
	};
};