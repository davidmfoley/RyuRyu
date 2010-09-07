
ryuryu.board = function(json) {
	var squares = {};

	var regions = [];

	var square_count = 0;
	var board_size;


	initFromJson(json);

	function initFromJson(json) {
		var jsonRegions = eval("(" + json + ")").regions;

		for (var i = 0; i < jsonRegions.length; i++) {
			var jsonRegion = jsonRegions[i];
			var region = {
				squares : [],
				total : jsonRegion.total,
				operator : jsonRegion.operator
			};

			for (var j = 0; j < jsonRegion.squares.length; j++) {
				var square = jsonRegion.squares[j];
				region.squares.push(square);

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
			}
			regions.push(region);

			square_count += region.squares.length;
		}

		board_size = Math.sqrt(square_count);
	}
	
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

	function moveSquareToRegion(squarePosition, toRegion) {
		squares[squarePosition].region = toRegion;
		var fromRegion = findRegionWithSquare(squarePosition);

		addToRegion(toRegion, squarePosition);
	
		removeFromRegion(fromRegion, squarePosition);
	}

	function addToRegion(toRegion, squarePosition) {
		toRegion.squares.push(squarePosition);

		for (var i = 0; i < toRegion.squares.length; i++) {
			var regionSquare = toRegion.squares[i];
			squares[[regionSquare[0], regionSquare[1]]].region = toRegion;
		}
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

	function moveSquares(edit) {
		for (var editSquareIndex = 0; editSquareIndex < edit.squares.length; editSquareIndex++) {
			var squarePosition = edit.squares[editSquareIndex];
			var toRegion = findRegionWithSquare(edit.addTo);
			moveSquareToRegion(squarePosition, toRegion);
		}
	}

	function deleteEmptyRegions() {
		for (var i = regions.length - 1; i >= 0; i--) 
			if (regions[i].squares.length == 0)
				regions.splice(i, 1);
	}

	function fixRegionInfoSquares() {
		for (var i = regions.length - 1; i >= 0; i--)
			setRegionInfo(regions[i]);
	}


	function setRegionInfo(r) {
		r.squares[0].info = r.total + r.operator;
		
		for (var s = 1; s < r.squares.length; s++)
			r.squares[s].info = "";
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

		onUpdate : function() {},

		applyEdit : function(edit) {
			moveSquares(edit);

			deleteEmptyRegions();
			fixRegionInfoSquares();

			this.onUpdate();
		},

		toJson : function() {

			var regionJson = [];

			for (var i = 0; i < regions.length; i++) {

				var currentRegion = regions[i];

				var sq = [];
				for (var s = 0; s < currentRegion.squares.length; s++) {
					sq.push("[" + currentRegion.squares[s].join(",") + "]")
				}

				var regionJsonPiece = "{\"squares\":[" + sq.join(",") + "], \"total\": " + currentRegion.total + ", \"operator\": \"" + currentRegion.operator + "\"}";
				regionJson.push(regionJsonPiece);
			}

			var json = "{\"regions\":[" + regionJson.join(",") + " ]}";

			console.log(json);
			return json;
		}
	};
};