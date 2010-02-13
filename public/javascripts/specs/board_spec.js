Screw.Unit(function() {
	describe('board definition', function() {
		var board;
		var initBoard = function() {
			board = ryuryu.board('{regions:[{squares : [[1,1]],	total : 1,operator : "+"},{	squares : [[1,2],[2,1],[2,2]],total : 4,operator : "*"}]}');
		};
		describe('applying edits', function() {
			describe('moving a square from one region to another', function() {
				before(function() {
					initBoard();
					board.applyEdit({squares :[[1,2]], addTo:[1,1]});
				});
				it('should update the square\'s region', function() {
					expect(board.squareAt(1,2).region).to(equal, board.squareAt(1,1).region);
				});

				it('should add the square to the target region', function() {
					var regionSquares = board.regions()[0].squares;
					expect(regionSquares).to(contain, [1,1]);
					expect(regionSquares).to(contain, [1,2]);
				});

				it('should remove the square from the previous region', function() {
					var regionSquares = board.regions()[1].squares;
					expect(regionSquares).to(contain, [2,1]);
					expect(regionSquares).to(contain, [2,2]);
				});

				it('should update the json', function() {
					var json = board.toJson();
					var regions = eval(json);
					expect(regions[0].squares.length).to(equal, 2);
					expect(regions[1].squares.length).to(equal, 2);
				});
			});
		});
	});
});