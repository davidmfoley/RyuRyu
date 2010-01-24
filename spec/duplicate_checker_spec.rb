require File.dirname(__FILE__) + '/spec_helper.rb'

require "spec"
require "region_solver"

describe "duplicate checking" do
	describe "for a 2x1 region" do
		before do
			@squares = [[1,1], [1,2]]
		end

		it "should recognize duplicates" do
			is_duplicate(@squares, [1,1]).should == true
		end

		it "should allow non-duplicates" do
			is_duplicate(@squares, [1,2]).should == false
		end
	end

	describe "for an L-shaped 3-sqaure region" do
		before do
			@squares = [[1,1], [1,2], [2,1]]
		end

		it "should recognize duplicates" do
			is_duplicate(@squares, [1, 1, 2]).should == true
		end

		it "should allow duplicates in squares that are not in the same line" do
			is_duplicate(@squares, [1, 2, 2]).should == false
		end
	end

	def is_duplicate squares, values
		DuplicateChecker.new(squares).has_duplicates values
	end
end