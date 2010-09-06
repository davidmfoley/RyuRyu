ryuryu.editOverlay = function(boardDisplay, dragDropHandler) {
	var dropHandler = dragDropHandler || ryuryu.dropHandler(boardDisplay.board());

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
			topEdge.data('position', { row : 0, column: row, orientation: 'horizontal'});

			setDragDropBehavior(topEdge, false, "y");

			var leftColumnInfo = boardDisplay.squareInfo(row + 1, 1);
			var leftEdge = createEdge('overlay-right-edge', leftColumnInfo.position.top, leftColumnInfo.position.left);
			leftEdge.data('position', { row : row, column: 0, orientation: 'vertical'});
						
			setDragDropBehavior(leftEdge, false, "x");

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
		var edge = createVerticalEdge(squareInfo.row, squareInfo.column, squareInfo.position.top, squareInfo.position.left + 75);

		setDragDropBehavior(edge, squareInfo.edges.right, "x");
	}

	function createVerticalEdge(row, column, top, left) {
		var edge = createEdge('overlay-right-edge', top, left);
		edge.data('position', { row : row, column: column, orientation: 'vertical'});

		return edge;
	}


	function addBottomEdge(squareInfo) {
		var edge = createHorizontalEdge(squareInfo.row, squareInfo.column, squareInfo.position.top + 75, squareInfo.position.left);
		setDragDropBehavior(edge, squareInfo.edges.bottom, "y");
	}

	function createHorizontalEdge(row, column, top, left)  {
		var edge = createEdge('overlay-bottom-edge', top, left);
		edge.data('position', { row : row, column: column, orientation: 'horizontal'});
		return edge;
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
			edge.draggable({
				axis: axis,
				drag : function() {
					ryuryu.editOverlay.currentlyDragging = edge;
				}
			});
			edge.addClass('ui-draggable');
		}

		edge.droppable({
			accept: function(dragged) {
				if (dragged.draggable('option', 'axis') != axis)
					return false;

				var position = dragged.data('position');
				var myPosition = edge.data('position');
				if (axis == 'y')
					return position.column == myPosition.column;

				return position.row == myPosition.row;
			},
			drop: function() {
				var dragged = ryuryu.editOverlay.currentlyDragging.data('position');
				var dropped = edge.data('position');
				dropHandler.applyDragDrop(dragged, dropped);				
			}
		});
	}

	init();
	return {
		wrapper : overlay
	};
};

ryuryu.dropHandler = function(board) {

	return {
		applyDragDrop: function (dragged, dropped) {
			console.log(dragged);
			console.log(dropped);

			var squares =[];
			var addTo = [];
			var i;

			if (dropped.row > dragged.row) {
				for (i = dragged.row +1; i <= dropped.row; i++) {
					squares.push([i, dragged.column]);
				}
				addTo = [dragged.row, dragged.column];
			}
			else if (dropped.row < dragged.row) {
				for (i = dropped.row + 1 ; i < dragged.row + 1; i++) {
					squares.push([i, dragged.column]);
				}
				addTo = [dragged.row + 1, dragged.column];
			}
			else if (dropped.column > dragged.column) {
				for (i = dragged.column +1; i <= dropped.column; i++) {
					squares.push([dragged.row, i]);
				}
				addTo = [dragged.row, dragged.column];
			}
			else if (dropped.column < dragged.column) {
				for (i = dropped.column + 1; i < dragged.column + 1; i++) {
					squares.push([dragged.row, i]);
				}
				addTo = [dragged.row, dragged.column + 1];
			}

			var edit = {
				squares : squares,
				addTo : addTo
			};
			board.applyEdit(edit);
		}
	};
};