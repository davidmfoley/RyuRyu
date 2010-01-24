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
		get_all_combinations(@region.squares.length).select{|c| @math_checker.check(c)}
	end

	def get_all_combinations length
		if (length == 1)
			(1..@board_size).to_a.map {|x| [x]}
		else
			sub_possibilities = get_all_combinations(length - 1)
			result = []

			for n in 1..@board_size
				sub_possibilities.each do |sp|
					combo = sp + [n]
					if combination_is_valid(combo)
						result.push combo
					end
				end
			end
			result
		end
	end

	def combination_is_valid(combo)
		(!@duplicate_checker.has_duplicates(combo)) && @math_checker.check(combo)
	end
end

