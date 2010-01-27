


Screw.Unit(function() {
	describe('rendering json', function() {
		describe('for a simple 1x1 board', function() {
			var board;
			before(function() {
				$('#sandbox').html('<div id="board-wrapper"></div>"');
				board = ryuryu.board($('#board-wrapper'));

				board.load({squares : [
					[1,1]
				]});
			});
			it('should have a square', function() {
				expect($('.square').length).to(equal, 1);
			});
		});
	});
});
