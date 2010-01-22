require "spec"

describe "Parsing a board" do
	describe "1x1 grid"  do
		before do
			@board = Board.new([{
				:squares => [[1, 1]],
				:total => 1,
				:operator => "+"
			}])
		end

		it "should have one region" do
			@board.regions.length.should == 1
		end

		it "should have square of 1,1" do
			@board.regions[0].squares[0].should == [1, 1]
		end

		it "should have the total of 1 (that was passed in)" do
			@board.regions[0].total.should == 1
		end

		it "should be valid" do
			@board.is_valid.should == true
		end
	end

	def should_be_invalid regions
		@board = Board.new regions
		@board.is_valid.should == false
	end

	describe "recognizing invalid layouts" do
		it "should not allow multiple entries for the same square" do
			should_be_invalid([
				{
					:squares => [[1, 1], [1, 2]],
					:total => 2,
					:operator => "+"
				},
				{
					:squares => [[2, 1], [1, 2]],
					:total => 3,
					:operator => "+"
				}])
		end

		it "should not allow 1x2 grid " do
			should_be_invalid([{
				:squares => [[1, 1], [1, 2]],
				:total => 2,
				:operator => "+"
			}])
		end

		it "should not allow indexes greater than 1 in 1x1 grid " do
			should_be_invalid([{
				:squares => [[1, 2]],
				:total => 1,
				:operator => "+"
			}])
		end

	end
end

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

class Region
	attr_reader :squares, :total, :operator

	def initialize squares, total, operator
		@squares = squares
		@total = total
		@operator = operator
	end

end