Screw.Unit(function() {
	describe('board definition', function() {
		var board;
		var updateWasCalled;
		var initBoard = function() {
			board = ryuryu.board('{regions:[{squares : [[1,1]],	total : 1,operator : "+"},{	squares : [[1,2],[2,1],[2,2]],total : 4,operator : "*"}]}');
			updateWasCalled = false;
			board.onUpdate = function() {
				updateWasCalled = true;
			}
		};

		describe('serializing to json', function() {
			var jsonEvaled;
			
			before(function() {
				initBoard();
				jsonEvaled = eval(board.toJson());
			});

			it('should have two regions', function() {
				expect(jsonEvaled.length).to(equal, 2);
				
			});

			it('should have the total', function() {
				expect(jsonEvaled[0].total).to(equal, 1);
			});

			it('should have the total', function() {
				expect(jsonEvaled[1].total).to(equal, 4);
			});
		});

		describe('applying edits', function() {
			describe('moving a square from one region to another', function() {
				before(function() {
					initBoard();
					board.applyEdit({squares :[
						[1,2]
					], addTo:[1,1]});
				});
				it('should update the square\'s region', function() {
					expect(board.squareAt(1, 2).region).to(equal, board.squareAt(1, 1).region);
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

				it('should call onUpdate callback', function() {
					expect(updateWasCalled).to(equal, true);
				});
			});

			describe('moving multiple squares from one region to another', function() {
				before(function() {
					initBoard();
					board.applyEdit({squares :[
						[1,2],
						[2,2]
					], addTo:[1,1]});
				});

				it('should update the first square\'s region', function() {
					expect(board.squareAt(1, 2).region).to(equal, board.squareAt(1, 1).region);
				});

				it('should update the second square\'s region', function() {
					expect(board.squareAt(2, 2).region).to(equal, board.squareAt(1, 1).region);
				});

				it('should add the squares to the target region', function() {
					var regionSquares = board.regions()[0].squares;

					expect(regionSquares).to(contain, [1,1]);
					expect(regionSquares).to(contain, [1,2]);
					expect(regionSquares).to(contain, [2,2]);
					expect(regionSquares.length).to(equal, 3);
				});

				it('should remove the squares from the previous region', function() {
					var regionSquares = board.regions()[1].squares;
					expect(regionSquares).to(contain, [2,1]);
					expect(regionSquares.length).to(equal, 1);
				});

				it('should update the json', function() {
					var json = board.toJson();
					var regions = eval(json);
					expect(regions[0].squares.length).to(equal, 3);
					expect(regions[1].squares.length).to(equal, 1);
				});
			});


		});
	});
});