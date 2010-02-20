ryuryu.boardDisplay = function(element) {
	var wrapper = $(element);
	var board;
	wrapper.html('');

	return {
		load : function(json) {
			board = ryuryu.board(json);

			board.onUpdate = function () {
				buildMarkup();
			};
			buildMarkup();
		},

		applySolution:	function(solution) {
			var squares = wrapper.find(".square");
			var index = 0;


			for (var row = 0; row < solution.length; row++) {
				for (var col = 0; col < solution.length; col++) {
					var square = squares.slice(index, index + 1);
					var solutionDiv = square.find('.solution');
					if (solutionDiv.length == 0) {
						solutionDiv = $("<div class='solution'>" + solution[row][col] + "</div>");
						square.append(solutionDiv);
					}
					else {
						solutionDiv.text(solution[row][col]);
					}
					index++;
				}
			}
		},

		board : function() {
			return board;
		},

		wrapper : function() {
			return  wrapper
		},
		squareInfo : function(row, col) {
			var index = (row - 1) * board.size() + col - 1;

			var div = $(wrapper.find(".square")[index]);

			var parent = div.parent();
			var pos = parent.position();

			return {
				row : row,
				column : col,

				position : {
					left : pos.left,
					top : pos.top
				},

				edges : {
					right : parent.hasClass('right-edge'),
					bottom : parent.hasClass('bottom-edge')
				}
			};
		}
	};


	function buildMarkup() {
		var squareMarkup = "<div class='board-wrapper'> <table>";

		for (var row = 1; row <= board.size(); row++)
			squareMarkup += buildRowMarkup(row);

		squareMarkup += "</table></div>";

		wrapper.html(squareMarkup);
	}

	function buildRowMarkup(row) {
		var rowMarkup = "<tr>";

		for (var col = 1; col <= board.size(); col++)
			rowMarkup += buildSquareMarkup(row, col);

		rowMarkup += "</tr>";
		return rowMarkup;
	}

	function buildSquareMarkup(row, col) {
		var s = board.squareAt(row, col);
 
		return "<td class='" + getSquareClasses(s, row, col) + "'><div class='square'><div class='region-info'>" + s.info + "</div></div></td>";
	}	

	function getSquareClasses(square, row, col) {
		var hasRightNeighbor = false, hasBottomNeigbor = false;

		for (var i = 0; i < square.region.squares.length; i++) {
			var other = square.region.squares[i];

			if (other[0] == row + 1 && other[1] == col)
				hasBottomNeigbor = true;
			if (other[0] == row && other[1] == col + 1)
				hasRightNeighbor = true;
		}

		return	classIf('right-edge', (col < board.size()) && !hasRightNeighbor) +
				  classIf('bottom-edge', (row < board.size()) && !hasBottomNeigbor) +
				  classIf('outside-top-edge', row == 1) +
				  classIf('outside-left-edge', col == 1) +
				  classIf('outside-bottom-edge', row == board.size()) +
				  classIf('outside-right-edge', col == board.size());
	}

	function classIf(className, condition) {
		return (condition) ? " " + className : "";
	}
};