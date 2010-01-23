require "region"

class Board
	def initialize regions
		@regions = []

		regions.each do |r|
			@regions.push Region.new r[:squares], r[:total], r[:operator]
		end
	end

	def regions
		@regions
	end

	def is_valid
		all_squares = []
		@regions.each {|r| all_squares += r.squares}

		if @regions.any? {|r| !r.is_contiguous}
			return false
		end

		board_size =  [0, 1, 4, 9, 16, 25, 36].index(all_squares.length)

		if board_size == nil
			return false
		end

		while all_squares.length > 0 do
			head = all_squares.shift

			if all_squares.include? head
				return false
			end

			if head.any? {|x| x > board_size}
				return false
			end
		end

		return true
	end
end
