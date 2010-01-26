require "region"
require "duplicate_checker"
require "math_checker"

class RegionSolver
	def solve region, board_size
		solver_job = RegionSolverJob.new(region, board_size)

		solver_job.get_solutions
	end
end

class RegionSolverJob
	def initialize region, board_size
		@region = region
		@board_size = board_size

		@duplicate_checker = DuplicateChecker.new(region.squares)
		@math_checker = MathChecker.get(region, board_size)
	end

	def get_solutions
		get_all_combinations(@region.squares.length).select{|c| combination_is_valid(c)}
	end

	def get_all_combinations length
		if (length == 1)
			(1..@board_size).map {|x| [x]}.select{|combo| @math_checker.check combo}
		else
			sub_combinations = get_all_combinations(length - 1)
			return apply_combinations sub_combinations, 1..@board_size
		end
	end

	def apply_combinations sub_combinations, range
		result = []

		range.each do |n|
			result.concat sub_combinations.map{|sub_combo|
				sub_combo + [n]
			}.select {|combo|
				combination_is_valid(combo)
			}
		end
		result
	end

	def combination_is_valid(combo)
		(!@duplicate_checker.has_duplicates(combo)) && @math_checker.check(combo)
	end
end

