require "region"

class Board
	attr_accessor :regions, :size, :all_squares

	def initialize regions
		@regions = []

		regions.each do |r|
			@regions.push Region.new r[:squares], r[:total], r[:operator] || ""
		end

		@all_squares = []
		@regions.each {|r| @all_squares += r.squares}

		@size = [0,1,4,9,16,25,36,49,64,81].index(all_squares.length)
	end

	def collect_squares_from_regions 
		squares = []

		@regions.each do |r|
			squares.concat yield(r)
		end

		squares
	end

	def right_edges
		collect_squares_from_regions {|r| r.right_edges}
	end

	def bottom_edges
		collect_squares_from_regions {|r| r.bottom_edges}
	end

	def is_valid

		if @size == nil
			return false
		end

		if @regions.any? {|r| !r.is_contiguous}
			return false
		end

		while all_squares.length > 0 do
			head = all_squares.shift

			if all_squares.include? head
				return false
			end

			if head.any? {|x| x > @size}
				return false
			end
		end

		return true
	end
end
