Screw.Unit(function() {
	describe('loading board from json', function() {
		describe('for a simple 1x1 board', function() {
			var board;
			before(function() {
				$('#sandbox').html('<div id="board-wrapper"></div>"');
				board = ryuryu.board($('#board-wrapper'));

				board.load([
					{
						squares : [
							[1,1]
						],
						total : 1,
						operator : "+"
					}
				]);
			});

			it('should have a square', function() {
				expect($('.square').length).to(equal, 1);
			});
			it('should have the total and operator', function() {
				expect($('.square > .region-info').text()).to(equal, '1+');
			});

			it('should have all four outer edges set', function() {
				var square = $('.square');

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
			var board;
			before(function() {
				$('#sandbox').html('<div id="board-wrapper"></div>"');
				board = ryuryu.board($('#board-wrapper'));

				board.load([
					{
						squares : [
							[1,1]
						],
						total : 1,
						operator : "+"
					},
					{
						squares : [
							[1,2],
							[2,1],
							[2,2]
						],
						total : 4,
						operator : "*"
					}
				]);
			});

			it('should have four squares', function() {
				expect($('.square').length).to(equal, 4);
			});

			it('should display the total and operator in the top-left square', function() {
				expect($('.square').first().text()).to(equal, "1+");
			});

			it('should display the total and operator in the second square', function() {
				expect($('.square').slice(1).first().text()).to(equal, "4*");
			});

			it('should not display total or operator in the other two squares', function() {
				expect($('.square').slice(2, 3).text()).to(equal, "");
			});

			it('should set region edges on the top-left square', function() {
				expect($('.square').first()).to(match_selector, ".right-edge.bottom-edge");
			});

			it('should not set region edges on any other squares', function() {
				expect($('.square.right-edge').length).to(equal, 1);
				expect($('.square.bottom-edge').length).to(equal, 1);
			});

			describe('serializing to json', function() {
				var jsonResult;
				before(function() {
					jsonResult = eval(board.toJson());
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
		});
	});

});
