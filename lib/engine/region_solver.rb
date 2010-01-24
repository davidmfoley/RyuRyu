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
		@math_checker = MathChecker.get(region.operator, region.total, board_size)
	end

	def get_solutions
		combinations = get_all_combinations  @region.squares.length
		combinations.select {|combo| @math_checker.check_solution(combo)}
	end

	def get_all_combinations length
		if (length == 1)
			(1..@board_size).to_a.map {|x| [x]}
		else
			sub_possibilities = get_all_combinations(length - 1)
			result = []

			for n in 1..@board_size
				sub_possibilities.each do |sp|
					potential_combo = sp + [n]
					if !@duplicate_checker.has_duplicates potential_combo
						if (length == @region.squares.length) || @math_checker.check_partial(potential_combo)
							result.push potential_combo
						end
					end
				end
			end
			result
		end
	end
end

