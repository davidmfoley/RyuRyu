class DuplicateChecker
	def initialize squares
		max = squares.map {|sq| sq[0] > sq[1] ? sq[0] : sq[1]}.sort.last

		@mutex_groups = []
		(0..1).each do |square_index|
			rows = (1..max).map {|row|
				squares.select{|square| square[square_index] == row}
			}.select {|r| r.length > 1}

			@mutex_groups.concat(rows.map {|row| row.map{|square| squares.index(square)}})
		end
	end

	def has_duplicates combo
		@mutex_groups.each do |group|
			values = group.map {|index| combo[index]}.select {|x| x != nil && x > 0}

			if values.length > 1
				if values.length != values.uniq.length
					return true
				end
			end
		end

		return false
	end
end