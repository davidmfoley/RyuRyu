require "spec"
require File.dirname(__FILE__) + '/spec_helper.rb'
require "board"

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

	describe "recognizing validity of various layouts" do
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

		it "should allow valid 2x2 grid" do
			should_be_valid([
				{:squares => [[1,1], [1,2]], :total => 2},
				{:squares => [[2,1], [2,2]], :total => 2}])
		end

		it "should not allow non-contiguous regions" do
			should_be_invalid([
				{:squares => [[1,1], [2,2]], :total => 2},
				{:squares => [[1,2], [2,1]], :total => 2}])
		end

		describe "region checking for contiguity"  do

			it "should recognize simple contiguous region" do
				region = Region.new([[1,2], [1,1]], 1, "")
				region.is_contiguous.should == true
			end


			it "should recognize larger contiguous region" do
				region = Region.new([[1,2], [1,1], [2,2], [3,2], [4,2], [4,3]], 1, "")
				region.is_contiguous.should == true
			end


			it "should recognize non-contiguous region" do
				region = Region.new([[1,2], [2,1]], 1, "")
				region.is_contiguous.should == false
			end

		end
	end
end

def should_be_invalid regions
	check_validity regions, false
end

def should_be_valid regions
	check_validity regions, true
end

def check_validity regions, expected
	@board = Board.new regions
	@board.is_valid.should == expected
end
