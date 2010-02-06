ryuryu.editOverlay = function(boardDisplay) {
	var overlay = $('<div class="edit-overlay"/>');

	function addBottomAndRightEdges(board) {
		for (var row = 0; row < board.size(); row++) {
			for (var col = 0; col < board.size(); col++) {
				var info = boardDisplay.squareInfo(row + 1, col + 1);
				addRightEdge(info);
				addBottomEdge(info);
			}
		}
	}

	function addTopAndLeftEdges(board) {
		for (var row = 0; row < board.size(); row++) {

			var topRowInfo = boardDisplay.squareInfo(1, row + 1);

			var topEdge = createEdge('overlay-bottom-edge', topRowInfo.position.top, topRowInfo.position.left);
			setDragDropBehavior(topEdge, false, "y");

			var leftColumnInfo = boardDisplay.squareInfo(row + 1, 1);
			var leftEdge = createEdge('overlay-right-edge', leftColumnInfo.position.top, leftColumnInfo.position.left);
			setDragDropBehavior(leftEdge, false, "y");

		}
	}

	function init() {
		var board = boardDisplay.board();

		addTopAndLeftEdges(board);
		addBottomAndRightEdges(board);

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