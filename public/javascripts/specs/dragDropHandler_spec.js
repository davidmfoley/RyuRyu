Screw.Unit(function() {
	describe('Drag/Drop Handler', function() {
		var board;
		var dropHandler;
		var editApplied;

		before(function() {
			editApplied = null;
			board = {
				applyEdit : function(edit) {
					editApplied = edit;
				}
			};

			dropHandler = ryuryu.dropHandler(board);
		});

		describe('should handle downward single-square', function() {
			before(function() {
				dropHandler.applyDragDrop(h(1,1), h(2,1))
			});

			it('should have correct source square', function() {
				expect(editApplied.squares.length).to(equal, 1);
				expect(editApplied.squares[0][0]).to(equal, 2);
				expect(editApplied.squares[0][1]).to(equal, 1);
			});

			it('should have dest square', function() {	
				expect(editApplied.addTo[0]).to(equal, 1);
				expect(editApplied.addTo[1]).to(equal, 1);
			});		

		});

		describe('should handle upward single-square', function() {
			before(function() {
				dropHandler.applyDragDrop(h(2,1), h(1,1))
			});

			it('should have correct source square', function() {
				expect(editApplied.squares.length).to(equal, 1);
				expect(editApplied.squares[0][0]).to(equal, 2);
				expect(editApplied.squares[0][1]).to(equal, 1);
			});

			it('should have dest square', function() {
				expect(editApplied.addTo[0]).to(equal, 3);
				expect(editApplied.addTo[1]).to(equal, 1);
			});

		});

		describe('should handle left-to-right single-square', function() {
			before(function() {
				dropHandler.applyDragDrop(v(1,1), v(1,2))
			});

			it('should have correct source square', function() {
				expect(editApplied.squares.length).to(equal, 1);
				expect(editApplied.squares[0][0]).to(equal, 1);
				expect(editApplied.squares[0][1]).to(equal, 2);
			});

			it('should have dest square', function() {
				expect(editApplied.addTo[0]).to(equal, 1);
				expect(editApplied.addTo[1]).to(equal, 1);
			});

		});

		describe('should handle right-to-left single-square', function() {
			before(function() {
				dropHandler.applyDragDrop(v(3,3), v(3,2))
			});

			it('should have correct source square', function() {
				expect(editApplied.squares.length).to(equal, 1);
				expect(editApplied.squares[0][0]).to(equal, 3);
				expect(editApplied.squares[0][1]).to(equal, 3);
			});

			it('should have dest square', function() {
				expect(editApplied.addTo[0]).to(equal, 3);
				expect(editApplied.addTo[1]).to(equal, 4);
			});

		});

		function h(row,column) {
			return { row : row, column: column, orientation: 'horizontal'};
		}
		
		function v(row,column) {
			return { row : row, column: column, orientation: 'vertical'};
		}
	});
});