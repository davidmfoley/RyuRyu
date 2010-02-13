Screw.Unit(function() {
	describe('loading board from json', function() {
		describe('for a simple 1x1 board', function() {
			var boardDisplay;
			before(function() {
				$('#sandbox').html('<div id="board-wrapper"></div>"');
				boardDisplay = ryuryu.boardDisplay($('#board-wrapper'));

				boardDisplay.load('{regions:[{squares : [[1,1]],total : 1,	operator : "+"}]}');
			});

			it('should have a square', function() {
				expect($('.square').length).to(equal, 1);
			});
			it('should have the total and operator', function() {
				expect($('.square > .region-info').text()).to(equal, '1+');
			});

			it('should have all four outer edges set', function() {
				var square = $('td');

				expect(square).to(match_selector, ".outside-top-edge");
				expect(square).to(match_selector, ".outside-bottom-edge");
				expect(square).to(match_selector, ".outside-left-edge");
				expect(square).to(match_selector, ".outside-right-edge");
			});

			it('should not have region edges', function() {
				expect($('.square.right-edge').length).to(equal, 0);
				expect($('.square.bottom-edge').length).to(equal, 0);
			});
		});


		describe('for a 2x2 board', function() {
			var boardDisplay;
			before(function() {
				$('#sandbox').html('<div id="board-wrapper"></div>"');
				boardDisplay = ryuryu.boardDisplay($('#board-wrapper'));

				boardDisplay.load('{regions:[{squares : [[1,1]],	total : 1,operator : "+"},{	squares : [[1,2],[2,1],[2,2]],total : 4,operator : "*"}]}');
			});

			it('should have four squares', function() {
				expect($('td').length).to(equal, 4);
			});

			it('should display the total and operator in the top-left square', function() {
				expect($('td').first().text()).to(equal, "1+");
			});

			it('should display the total and operator in the second square', function() {
				expect($('td').slice(1).first().text()).to(equal, "4*");
			});

			it('should not display total or operator in the other two squares', function() {
				expect($('td').slice(2, 3).text()).to(equal, "");
			});

			it('should set region edges on the top-left square', function() {
				expect($('td').first()).to(match_selector, ".right-edge.bottom-edge");
			});

			it('should not set region edges on any other squares', function() {
				expect($('td.right-edge').length).to(equal, 1);
				expect($('td.bottom-edge').length).to(equal, 1);
			});

			describe('serializing to json', function() {
				var jsonResult;

				before(function() {
					jsonResult = eval(boardDisplay.board().toJson());
				});

				it('should have two regions', function() {
					expect(jsonResult.length).to(equal, 2);
				});

				it('should have 1 square in the first region', function() {
					expect(jsonResult[0].squares.length).to(equal, 1);
				});

				it('should have 3 squares in the second region', function() {
					expect(jsonResult[1].squares.length).to(equal, 3);
				});

			});

			describe('applying a solution', function() {
				var solutions;

				before(function() {
					boardDisplay.applySolution([
						[1,2],
						[3,4]
					]);
					solutions = $('.square .solution');
				});

				it('should have top-left solution', function() {
					expect($(solutions[0]).text()).to(equal, "1");
				});

				it('should have top-right solution', function() {
					expect($(solutions[1]).text()).to(equal, "2");
				});

				it('should have bottom-left solution', function() {
					expect($(solutions[2]).text()).to(equal, "3");
				});

				it('should have bottom-right solution', function() {
					expect($(solutions[3]).text()).to(equal, "4");
				});
			});
		});

		describe('editing board definition', function() {
			var overlay;
			var boardDisplay;
			var edit;
			describe('of a 2x2 board', function() {

				before(function() {
					$('#sandbox').html('<div id="board-wrapper"></div>"');
					boardDisplay = ryuryu.boardDisplay($('#board-wrapper'));

					boardDisplay.load('{regions:[{squares : [[1,1]],	total : 1,operator : "+"},{	squares : [[1,2],[2,1],[2,2]],total : 4,operator : "*"}]}');

					edit = null;
					boardDisplay.board().applyEdit = function(e) {
						edit = e;
					};
					overlay = ryuryu.editOverlay(boardDisplay);
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
						//debugger;
						//$(node).trigger('drop', [$.Event('drop'), {draggable : dragEdge}]);
						node = $(node);

						//console.log(node.droppable());
						if (node.droppable('option', 'accept')(dragEdge))
							node.droppable('option', 'drop').call([
								{},
								dragEdge
							]);
					}

					before(function() {

						dragEdge = $('.overlay-bottom-edge.ui-draggable').eq(0);

					});

					describe('onto a vertical edge', function() {
						before(function() {
							dropOn($('.overlay-right-edge').eq(0));
						});
						it('should not have an effect', function() {
							expect(edit).to(equal, null);
						});
					});

					describe('onto another horizontal edge', function() {
						before(function() {
							dropOn($('.overlay-bottom-edge.ui-draggable').eq(1));
						});

						it('should edit the board definition', function() {
							expect(!!edit).to(equal, true);
						});
					});
				});
			});
		});
	});
});
