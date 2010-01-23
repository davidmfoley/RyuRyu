require File.dirname(__FILE__) + '/spec_helper.rb'

require "spec"
require "board_solver"
require "test_data"

describe "Solving a board" do
	describe "when presented with a single solution for each region" do
		before do
			@solver = BoardSolver.new
		end
		it "should solve a 1x1 board" do
			@board = Board.new([{:squares=> [[1,1]], :total => 1}])
			@solver.solve(@board).should == [[1]]
		end

		it "should solve a 2x2 board" do
			@board = Board.new([
				{:squares=> [[1,1]], :total => 1},
				{:squares=> [[1,2]], :total => 2},
				{:squares=> [[2,1]], :total => 2},
				{:squares=> [[2,2]], :total => 1}
			])

			puts @board.size

			@solver.solve(@board).should == [
				[1,2],
				[2,1]]
		end
	end
end