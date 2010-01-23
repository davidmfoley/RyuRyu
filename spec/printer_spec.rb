require File.dirname(__FILE__) + '/spec_helper.rb'
require "board"
require "printer"


describe "printer" do
	it "should print basic 1x1 board" do
		board = Board.new([{:squares => [[1,1]], :total => 1 }])

		Printer.new(board).format_board.should == [
			"+--+",
			"|1 |",
			"+--+"
		]
	end

	it "should print correct total" do
		board = Board.new([{:squares => [[1,1]], :total => 2}])

		Printer.new(board).format_board.should == [
			"+--+",
			"|2 |",
			"+--+"
		]
	end

	describe "2x2 boards" do
		it "should print vertical columns" do
			board = Board.new([
				{:squares => [[1,1], [2,1]], :total => 1},
				{:squares => [[1,2], [2,2]], :total => 2}
			])

			result = Printer.new(board).format_board

			puts result
			result.should == [
				"+--+--+",
				"|1 |2 |",
				"+  +  +",
				"|  |  |",
				"+--+--+"
			]
		end

		it "should print horizontal columns" do
			board = Board.new([
				{:squares => [[1,1], [1,2]], :total => 1},
				{:squares => [[2,1], [2,2]], :total => 2}
			])

			result = Printer.new(board).format_board

			puts result
			result.should == [
				"+--+--+",
				"|1    |",
				"+--+--+",
				"|2    |",
				"+--+--+"
			]
		end
	end
end