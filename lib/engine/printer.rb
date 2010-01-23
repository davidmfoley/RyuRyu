require "board"

class Printer
	def initialize board
		@board = board
	end

	def get_top_and_bottom_border
		top_and_bottom = "+"

		for row in 1..@board.size
			top_and_bottom += "--+"
		end
		return top_and_bottom
	end

	def format_board
		result = []

		result.push get_top_and_bottom_border

		for row in 1..@board.size
			row_result = "|"
			bottom_edge = "+"

			for column in 1..@board.size
				row_result += get_contents([row, column])
				row_result += get_right_edge([row, column])
				bottom_edge += get_bottom_edge([row, column])
			end

			result.push row_result
			
			if (row < @board.size)
				result.push(bottom_edge)
			end
		end

		result.push get_top_and_bottom_border

		return result
	end

	private

	def get_right_edge square
		return (@board.right_edges.include? square) ? "|" : " "
	end


	def get_bottom_edge square
		return (@board.bottom_edges.include? square) ? "--+" : "  +"
	end

	def get_contents square
		region = @board.regions.select {|r| r.squares[0] == square}
		if nil != region && region.length > 0
			region[0].total.to_s + region[0].operator.to_s
		else
			"  "
		end

	end
end