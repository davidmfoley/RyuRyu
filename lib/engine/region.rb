

class Region
	attr_reader :squares, :total, :operator

	def initialize squares, total, operator
		@squares = squares
		@total = total
		@operator = operator
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
end