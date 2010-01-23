require File.dirname(__FILE__) + '/spec_helper.rb'
require "region"

describe "Region" do
	describe "checking for contiguity"  do
		it "should recognize simple contiguous region" do
			region = Region.new([[1, 2], [1, 1]], 1, "")
			region.is_contiguous.should == true
		end

		it "should recognize larger contiguous region" do
			region = Region.new([[1, 2], [1, 1], [2, 2], [3, 2], [4, 2], [4, 3]], 1, "")
			region.is_contiguous.should == true
		end

		it "should recognize non-contiguous region" do
			region = Region.new([[1, 2], [2, 1]], 1, "")
			region.is_contiguous.should == false
		end
	end
end

