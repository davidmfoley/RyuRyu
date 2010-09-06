
class TestData
	def self.board key
		test_boards = {
			:simple_1x1 => [
				{:squares => [[1, 1]], :total => 1 }
			],
			:horizontal_2x2 => [
				{:squares => [[1, 1], [1, 2]], :total => 1},
				{:squares => [[2, 1], [2, 2]], :total => 2}
			],
			:vertical_2x2 => [
				{:squares => [[1, 1], [2, 1]], :total => 1},
				{:squares => [[1, 2], [2, 2]], :total => 2}
			],
			:complex_3x3 => [
				{:squares => [[1, 1], [1, 2]], :total => 1, :operator => "+"},
				{:squares => [[2, 1], [2, 2]], :total => 2, :operator => "-"},
				{:squares => [[3, 1], [3, 2]], :total => 3, :operator => "*"},
				{:squares => [[1, 3], [2, 3], [3, 3]], :total => 4, :operator => "/"}
			]
		}
		Board.new(test_boards[key])
	end

end