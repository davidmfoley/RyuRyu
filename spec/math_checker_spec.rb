require File.dirname(__FILE__) + '/spec_helper.rb'
require "math_checker"

describe "math checking" do
	describe "for multiplication" do
		describe "with a 3-square region with a product of 12" do
			before do
				@checker = MultiplyChecker.new(12, 6, 3)
			end

			it "should allow 1,3" do
				@checker.check([1, 3]).should == true
			end

			it "should allow 1,3,4" do
				@checker.check([1, 3, 4]).should == true
			end

			it "should not allow 5" do
				@checker.check([5]).should == false
			end
		end
	end

	describe "for addition" do
		describe "with a 3-square region with a sum of 7" do
			before do
				@checker = AddChecker.new(7, 6, 3)
			end

			it "should allow 1,3" do
				@checker.check([1, 3]).should == true
			end

			it "should not allow 1,3,4" do
				@checker.check([1, 3, 4]).should == false
			end

			it "should allow 1,5" do
				@checker.check([1, 5]).should == true
			end

			it "should not allow 4,5" do
				@checker.check([4, 5]).should == false
			end

			it "should not allow 2,5" do
				@checker.check([2, 5]).should == false
			end

			it "should not allow 6" do
				@checker.check([6]).should == false
			end
		end
	end

	describe "for subtraction" do
		describe "with a difference of 3" do
			before do
				@checker = SubtractChecker.new(3, 6, 2)
			end

			it "should allow 1,4" do
				@checker.check([1, 4]).should == true
			end


			it "should allow 4,1" do
				@checker.check([1, 4]).should == true
			end

			it "should not allow 1, 3" do
				@checker.check([1, 3]).should == false
			end

			it "should not allow 3, 1" do
				@checker.check([3, 1]).should == false
			end

		end
	end

	describe "for division" do
		describe "with a quotient of 2" do
			before do
				@checker = DivideChecker.new(2, 6, 2)
			end

			it "should allow 2,4" do
				@checker.check([2, 4]).should == true
			end

			it "should allow 4,2" do
				@checker.check([4, 2]).should == true
			end

			it "should not allow 1, 3" do
				@checker.check([1, 3]).should == false
			end

			it "should not allow 3, 1" do
				@checker.check([3, 1]).should == false
			end

			it "should not allow 5" do
				@checker.check([5]).should == false
			end
		end
	end
end