Screw.Unit(function() {

		describe('editOverlay', function() {
			var overlay;
			var boardDisplay;
			var edit;
			var dropHandler;

			describe('of a 2x2 board', function() {

				before(function() {
					$('#sandbox').html('<div id="board-wrapper"></div>"');
					boardDisplay = ryuryu.boardDisplay($('#board-wrapper'));

					boardDisplay.load('{regions:[{squares : [[1,1]],	total : 1,operator : "+"},{	squares : [[1,2],[2,1],[2,2]],total : 4,operator : "*"}]}');

					edit = null;
					boardDisplay.board().applyEdit = function(e) {
						edit = e;
					};

					dropHandler = {
						applyDragDrop : function(dragged, dropped) {
							dropHandler.dragged = dragged;
							dropHandler.dropped = dropped;
							dropHandler.wasCalled = true;
						},
						wasCalled : false
					};
					overlay = ryuryu.editOverlay(boardDisplay, dropHandler);
				});

				describe('overlay edges', function() {

					it('should have 6 droppable right edges', function() {
						expect(overlay.wrapper.find(".overlay-right-edge.ui-droppable").length).to(equal, 6);
					});

					it('should have 1 draggable right edge', function() {
						expect(overlay.wrapper.find(".overlay-right-edge.ui-draggable").length).to(equal, 1);
					});

					it('should have 6 droppable bottom edges', function() {
						expect(overlay.wrapper.find(".overlay-bottom-edge.ui-droppable").length).to(equal, 6);
					});

					it('should have 1 draggable bottom edge', function() {
						expect(overlay.wrapper.find(".overlay-bottom-edge.ui-draggable").length).to(equal, 1);
					});
				});

				describe('dragging & dropping a horizontal edge', function() {
					var dragEdge;

					function dropOn(node) {
						node = $(node);


						// a bit cheesy... or more than a little bit
						if (node.droppable('option', 'accept')(dragEdge))
							node.droppable('option', 'drop').call([
								{},
								dragEdge
							]);
					}

					before(function() {
						dragEdge = $('.overlay-bottom-edge.ui-draggable').eq(0);
						dragEdge.draggable('option', 'drag').call([

						]);
					});

					describe('onto a vertical edge', function() {
						before(function() {
							dropOn($('.overlay-right-edge').eq(0));
						});
						it('should not have an effect', function() {
							expect(dropHandler.wasCalled).to(equal, false);
						});
					});

					describe('onto another horizontal edge', function() {
						before(function() {
							dropOn($('.overlay-bottom-edge.ui-draggable').eq(1));
						});

						it('should edit the board definition', function() {
							expect(dropHandler.wasCalled).to(equal, true);
						});						
					});
				});
			});
		});
	});

