require "region"

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
	end

	def get_solutions
		combinations = get_all_combinations  @region.squares.length
		combinations.select {|combo| is_valid_combination(combo)}
	end

	def is_valid_combination combo
		if @region.operator == "+"
			adds_to combo, @region.total
		elsif @region.operator == "*"
			multiplies_to combo, @region.total
		elsif @region.operator == "-"
			subtracts_to combo, @region.total
		elsif @region.operator == "/"
			divides_to combo, @region.total
		elsif (@region.total || 0) > 0
			adds_to(combo, @region.total) ||
				multiplies_to(combo, @region.total) ||
				subtracts_to(combo, @region.total) ||
				divides_to(combo, @region.total)
		else
			true
		end
	end

	def adds_to combo, total
		total == combo.inject {|result, element| result + element}
	end

	def subtracts_to combo, total
		combo.length == 2 && total == combo.inject {|result, element| result - element}.abs
	end

	def divides_to combo, total
		ordered = combo.sort
		return combo.length == 2  && ordered[0] * total == ordered[1]
	end

	def multiplies_to combo, total
		total == combo.inject {|result, element| result * element}
	end

	def has_duplicates combo
		for i in 0...combo.length
			for j in (i+1)..combo.length  do
				if combo[i] == combo[j]
					ri = @region.squares[i]
					rj = @region.squares[j]

					if ri[0] == rj[0] || ri[1] == rj[1]
						return true
					end
				end
			end
		end

		false
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
					if !has_duplicates potential_combo
						result.push potential_combo
					end
				end
			end
			result
		end
	end
end