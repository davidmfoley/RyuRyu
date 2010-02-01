var ryuryu = {};

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

ryuryu.boardDisplay = function(element) {
	var wrapper = $(element);
	var board;
	wrapper.html('');

	return {
		load : function(json) {
			board = ryuryu.board(json);
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

		for (var row = 1; row <= board.size(); row++) {
			squareMarkup += "<tr>";
			for (var col = 1; col <= board.size(); col++) {
				var s = board.squareAt(row, col);

				squareMarkup += "<td class='" + getSquareClasses(s, row, col) + "'><div class='square'><div class='region-info'>" + s.info + "</div></div></td>";
			}
			squareMarkup += "</tr>"
		}
		squareMarkup += "</table></div";

		wrapper.html(squareMarkup);
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

ryuryu.editOverlay = function(boardDisplay) {
	var overlay = $('<div class="edit-overlay"/>');

	function init() {
		var board = boardDisplay.board();

		for (var row = 0; row < board.size(); row++) {
			for (var col = 0; col < board.size(); col++) {
				var info = boardDisplay.squareInfo(row + 1, col + 1);

				if (col < board.size() - 1)
					addRightEdge(info);
				if (row < board.size() - 1)
					addBottomEdge(info);
			}
		}

		var p = boardDisplay.wrapper().position();
		overlay.css({left:p.left,  top:p.top});

		$('body').append(overlay);
	}

	function addRightEdge(squareInfo) {
		var edge = createEdge('overlay-right-edge', squareInfo.position.top, squareInfo.position.left + 75);

		setDragDropBehavior(edge, squareInfo.edges.right, "x");
	}

	function addBottomEdge(squareInfo) {
		var edge = createEdge('overlay-bottom-edge', squareInfo.position.top + 75, squareInfo.position.left);

		setDragDropBehavior(edge, squareInfo.edges.bottom, "y");
	}

	function createEdge(className, top, left) {
		var edge = $('<div/>');

		edge.addClass(className);
		edge.css({
			left: left,
			top: top
		});

		overlay.append(edge);

		return edge;
	}

	function setDragDropBehavior(edge, isDraggable, axis) {
		if (isDraggable) {
			edge.draggable('option', 'axis', axis);
		}
		else {
			edge.droppable();
		}
	}

	init();
	return {
		wrapper : overlay
	};
};