require File.dirname(__FILE__) + '/spec_helper.rb'

require "board"
require "printer"


describe "Formatting boards for display" do
	it "should print basic 1x1 board" do
		board = TestData.board(:simple_1x1)

		Printer.new(board).format_board.should == [
			"+---+",
			"|1  |",
			"+---+"
		]
	end

	describe "2x2 boards" do
		it "should print vertical columns" do
			board = TestData.board(:vertical_2x2)

			result = Printer.new(board).format_board

			puts result
			result.should == [
				"+---+---+",
				"|1  |2  |",
				"+   +   +",
				"|   |   |",
				"+---+---+"
			]
		end

		it "should print horizontal columns" do
			board = TestData.board(:horizontal_2x2)
			
			result = Printer.new(board).format_board

			puts result
			result.should == [
				"+---+---+",
				"|1      |",
				"+---+---+",
				"|2      |",
				"+---+---+"
			]
		end
	end

	describe "3x3 board" do
		it "should print correctly" do
			board = TestData.board(:complex_3x3)

			result = Printer.new(board).format_board

			puts result
			result.should == [
				"+---+---+---+",
				"|1+     |4/ |",
				"+---+---+   +",
				"|2-     |   |",
				"+---+---+   +",
				"|3*     |   |",
				"+---+---+---+"
			]
		end
	end
end
