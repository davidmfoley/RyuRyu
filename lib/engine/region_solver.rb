require "region"

class RegionSolver
	def solve region, board_size
		all_possibilities = get_all_possibilities region.squares.length, board_size

		all_possibilities.select {|p| is_valid_combination(p, region)}
	end

	def is_valid_combination combo, region
		if has_duplicates combo, region
			return false
		end

		true
	end

	def has_duplicates combo, region		
		for i in 0..combo.length
			for j in (i+1)..combo.length  do
				if combo[i] == combo[j]
					ri = region.squares[i]
					rj = region.squares[j]

					if ri[0] == rj[0] || ri[1] == rj[1]
						return true
					end
				end
			end
		end

		false
	end

	def get_all_possibilities length, upper_bound
		if (length == 1)
			(1..upper_bound).to_a.map {|x| [x]}
		else
			sub_possibilities = get_all_possibilities(length - 1, upper_bound)
			result = []

			for n in 1..upper_bound
				sub_possibilities.each do |sp|
					result.push [n] + sp	
				end
			end
			result
		end
	end
end