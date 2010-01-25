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
			@region = Region.new [[1, 1], [1, 2]]
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
			@region = Region.new [[1, 1], [1, 2], [2, 1]]
		end
		it "should solve for board size 2" do
			@solver.solve(@region, 2).sort.should == [[1, 2, 2], [2, 1, 1]]
		end
	end

	describe "Box-shaped 4 square region" do
		before do
			@region = Region.new [[1, 1], [1, 2], [2, 1], [2, 2]]
		end
		it "should solve for board size 2" do
			@solver.solve(@region, 2).sort.should == [[1, 2, 2, 1], [2, 1, 1, 2]]
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

	describe "with addition" do
		describe "2x1 with sum of 3" do
			before do
				@region = Region.new [[1, 1], [1, 2]], 3, "+"
			end

			for size in 1..3 do
				it "should solve for a board size of #{size}" do
					@solver.solve(@region, size).sort.should == [
						[1, 2], [2, 1]
					]
				end
			end
		end

		describe "3x1 with sum of 7" do
			before do
				@region = Region.new [[1, 1], [1, 2], [1, 3]], 7, "+"
			end

			for size in 4..6 do
				it "should solve for a board size of #{size}" do
					@solver.solve(@region, size).sort.should == [
						[1, 2, 4], [1, 4, 2],
						[2, 1, 4], [2, 4, 1],
						[4, 1, 2], [4, 2, 1]
					]
				end
			end
		end
	end

	describe "with multiplication" do
		describe "2x1 with product of 6" do
			before do
				@region = Region.new [[1, 1], [1, 2]], 6, "*"
			end

			it "should solve for a board size of 3" do
				@solver.solve(@region, 3).sort.should == [
					[2, 3], [3, 2]
				]
			end

			it "should solve for a board size of 6" do
				@solver.solve(@region, 6).sort.should == [
					[1, 6], [2, 3], [3, 2], [6, 1]
				]
			end
		end
	end

	describe "with subtraction" do
		describe "2x1 with difference of 1" do
			before do
				@region = Region.new [[1, 1], [1, 2]], 1, "-"
			end

			it "should solve for a board size of 3" do
				@solver.solve(@region, 3).sort.should == [
					[1, 2], [2, 1], [2, 3], [3, 2]
				]
			end

			it "should solve for a board size of 6" do
				@solver.solve(@region, 6).sort.should == [
					[1, 2], [2, 1], [2, 3], [3, 2], [3, 4], [4, 3], [4, 5], [5, 4], [5, 6], [6, 5]
				]
			end
		end
	end

	describe "with division" do
		describe "2x1 with quotient of 2" do
			before do
				@region = Region.new [[1, 1], [1, 2]], 2, "/"
			end

			it "should solve for a board size of 3" do
				@solver.solve(@region, 3).sort.should == [
					[1, 2], [2, 1]
				]
			end

			it "should solve for a board size of 4" do
				@solver.solve(@region, 4).sort.should == [
					[1, 2], [2, 1], [2, 4], [4, 2]
				]
			end

			it "should solve for a board size of 6" do
				@solver.solve(@region, 6).sort.should == [
					[1, 2], [2, 1], [2, 4], [3, 6], [4, 2], [6, 3]
				]
			end
		end
	end

	describe "with no operator" do
		describe "2x1 with total of 6" do
			before do
				@region = Region.new [[1, 1], [1, 2]], 6
			end

			it "should solve for a board size of 3" do
				@solver.solve(@region, 3).sort.should == [
					[2, 3], [3, 2]
				]
			end

			it "should solve for a board size of 4" do
				@solver.solve(@region, 4).sort.should == [
					[2, 3], [2, 4], [3, 2], [4, 2]
				]
			end


			it "should solve for a board size of 5" do
				@solver.solve(@region, 5).sort.should == [
					[1, 5], [2, 3], [2, 4], [3, 2], [4, 2], [5, 1]
				]
			end

			it "should solve for a board size of 6" do
				@solver.solve(@region, 6).sort.should == [
					[1, 5], [1, 6], [2, 3], [2, 4], [3, 2], [4, 2], [5, 1], [6, 1]
				]
			end
		end

		describe "degenerate 6-square region case" do
			it "should solve within a reasonable amount of time" do

				squares = (1..6).map {|row| [row, 1]}
				region =Region.new(squares, 21)

				time_region_solution(region, 6)
			end
		end

		describe "degenerate 7-square region case" do
			it "should solve within a reasonable amount of time" do
				squares = (1..7).map {|row| [row, 1]}
				region =Region.new(squares, 28)

				time_region_solution(region, 7)
				#time_region_solution(region, 8)
				#time_region_solution(region, 9)
			end
		end

		describe "degenerate 8-square region case" do
			it "should solve within a reasonable amount of time" do
				pending "takes a long time"
				squares = (1..8).map {|row| [row, 1]}
				region = Region.new(squares, 36)

				time_region_solution(region, 8)
			end
		end

		describe "L-shaped 3 squares with total of 9" do
			before do
				@region = Region.new [[1, 1], [1, 2], [2,1]], 9
			end
			it "should solve for a board size of 4" do
				@solver.solve(@region, 4).sort.should == [
					[1, 3, 3], [1, 4, 4],
					[2, 3, 4], [2, 4, 3],
					[3, 2, 4], [3, 4, 2],
					[4, 2, 3], [4, 3, 2]
				]
			end
		end

		def time_region_solution(region, size)
			time = nil
			puts Benchmark.measure { time = RegionSolver.new.solve(region, size) }
			time
		end
	end
end