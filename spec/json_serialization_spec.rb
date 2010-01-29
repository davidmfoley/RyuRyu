require File.dirname(__FILE__) + '/spec_helper.rb'
require "json_serializer"
require "test_data"

describe "serializing boards to JSON" do
	@serializer = nil
	before do
		@serializer = JsonSerializer.new
	end

	it "should be able to serialize/deserialize 1x1 board" do
		round_trip_test TestData.board(:simple_1x1)
	end

	it "should be able to serialize/deserialize 2x2 board" do
		round_trip_test TestData.board(:horizontal_2x2)
	end

	it "should be able to serialize/deserialize 3x3 board" do
		round_trip_test TestData.board(:complex_3x3)
	end

	def round_trip_test board
		serializer = JsonSerializer.new
		serialized = serializer.serialize board
		result = serializer.deserialize(serialized)
		result.regions.each_index do |i|
			result.regions[i].squares.should == board.regions[i].squares
			result.regions[i].total.should == board.regions[i].total
			result.regions[i].operator.should == board.regions[i].operator

		end
	end
end