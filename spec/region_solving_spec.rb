require File.dirname(__FILE__) + '/spec_helper.rb'

require "spec"
require "region_solver"

describe "Getting solutions for a region" do

	before do
		@solver = RegionSolver.new
	end

	it "should solve 1x1 region" do
		region = Region.new [[1, 1]], 1
		@solver.solve(region, 1).should  == [[1]]
	end

	describe "2x1 region" do

		before do
			@region = Region.new [[1, 1], [1, 2]], 2
		end

		it "should return potential solutions for a board size of 2" do
			@solver.solve(@region, 2).sort.should == [[1, 2], [2, 1]]
		end

		it "should return potential solutions for a board size of 3" do
			@solver.solve(@region, 3).sort.should == [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]
		end
	end

	describe "L-shaped 3 square region" do
		before do
			@region = Region.new [[1, 1], [1, 2], [2,1]]
		end
		it "should solve for board size 2" do
			@solver.solve(@region, 2).sort.should == [[1,2,2], [2,1,1]]
		end
	end

	describe "Box-shaped 4 square region" do
		before do
			@region = Region.new [[1, 1], [1, 2], [2,1], [2,2]]
		end
		it "should solve for board size 2" do
			@solver.solve(@region, 2).sort.should == [[1,2,2,1], [2,1,1,2]]
		end
	end

	describe "3x1 region" do
		it "should return potential solutions" do
			region = Region.new [[1, 1], [1, 2], [1, 3]], 6
			@solver.solve(region, 3).sort.should == [
				[1, 2, 3], [1, 3, 2],
				[2, 1, 3], [2, 3, 1],
				[3, 1, 2], [3, 2, 1]]
		end
	end
end