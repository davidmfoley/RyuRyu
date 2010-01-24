require File.dirname(__FILE__) + '/spec_helper.rb'

require "spec"
require "board_solver"
require "test_data"

describe "Solving a board" do
	before do
		@solver = BoardSolver.new
	end
	describe "when presented with a single solution for each region" do

		it "should solve a 1x1 board" do
			@board = Board.new([{:squares=> [[1, 1]], :total => 1}])
			@solver.solve(@board).should == [[1]]
		end

		it "should solve a 2x2 board" do
			@board = Board.new([
				{:squares=> [[1, 1]], :total => 1},
				{:squares=> [[1, 2]], :total => 2},
				{:squares=> [[2, 1]], :total => 2},
				{:squares=> [[2, 2]], :total => 1}
			])

			puts @board.size

			@solver.solve(@board).should == [
				[1, 2],
				[2, 1]]
		end
	end

	describe "multiple solutions" do
		it "should solve a 2x2 board" do
			@board = Board.new([
				{:squares=> [[1, 1], [1, 2], [2, 1]], :total => 4},
				{:squares=> [[2, 2]], :total => 2}
			])

			@solver.solve(@board).should == [
				[2, 1],
				[1, 2]]
		end

		it "should solve a 3x3 board" do
			check_solution([
				{:squares=> [[1, 1], [2, 1]], :total => 3, :operator =>"+"},
				{:squares=> [[1, 2], [2, 2]], :total => 4, :operator =>"+"},
				{:squares=> [[1, 3]], :total => 3},
				{:squares=> [[3, 1], [3, 2]], :total => 5, :operator =>"+"},
				{:squares=> [[2, 3], [3, 3]], :total => 3, :operator =>"+"}
			],

						   [
							   [2, 1, 3],
							   [1, 3, 2],
							   [3, 2, 1]])
		end

		it "should solve a 4x4 board" do
			check_solution([
				{:squares=> [[1, 1], [2, 1]], :total => 2, :operator =>"/"},
				{:squares=> [[1, 2], [2, 2]], :total => 3, :operator =>"*"},
				{:squares=> [[1, 3], [1, 4]], :total => 12, :operator =>"*"},
				{:squares=> [[2, 3], [2, 4]], :total => 2, :operator =>"/"},
				{:squares=> [[3, 1], [3, 2], [3, 3]], :total => 6, :operator =>"*"},
				{:squares=> [[4, 1]], :total => 3},
				{:squares=> [[4, 2], [4, 3]], :total => 4, :operator =>"*"},
				{:squares=> [[3, 4], [4, 4]], :total => 8, :operator => "*"}
			],

						   [
							   [2, 1, 4, 3],
							   [4, 3, 2, 1],
							   [1, 2, 3, 4],
							   [3, 4, 1, 2]])
		end

		def check_solution regions, expected
			board = Board.new(regions)
			puts Printer.new(board).format_board

			puts board.regions.length
			begin
				BoardSolver.new().solve(board).should == expected
			rescue
				raise $!
			end
		end
	end
end