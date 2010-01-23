
class Region
	attr_reader :squares, :total, :operator

	def initialize squares, total, operator
		@squares = squares
		@total = total
		if operator != nil && operator.length > 0
			@operator = operator
		else
			@operator = ' '
		end
	end

	def is_contiguous
		if squares.length == 1
			return true
		end
		squares.each do |square|
			if !squares.any? {|s| [ (square[0] - s[0]).abs, (square[1] - s[1]).abs].sort == [0,1]}
				return false
			end
		end
		return true
	end

	def right_edges
		squares.select {|s|
			!(squares.any? {
				|sq| sq == [s[0], s[1] +1]
			})
		}
	end

	def bottom_edges
		squares.select {|s|
			!(squares.any? {
				|sq| sq == [s[0] + 1, s[1]]
			})
		}
	end
end