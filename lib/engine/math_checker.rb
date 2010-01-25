require "region"
class MathChecker

	def initialize total, board_size, square_count
		@total = total
		@board_size = board_size
		@square_count = square_count
	end

	def check combo
		if combo.length == @square_count
			check_solution combo
		else
			check_partial combo
		end
	end

	def self.get region, board_size
		square_count = region.squares.length

		operator = region.operator
		total = region.total

		if operator == "+" || square_count == 1
			checker = AddChecker.new total, board_size, square_count
		elsif operator == "*"
			checker = MultiplyChecker.new total, board_size, square_count
		elsif operator == "-"
			checker = SubtractChecker.new total, board_size, square_count
		elsif operator == "/"
			checker = DivideChecker.new total, board_size, square_count
		elsif (total || 0) > 0
			checker = NoOpChecker.new total, board_size, square_count
		else
			checker = NoConstraintChecker.new
		end
		return checker
	end


	def check_solution combo
		@total == combo.inject {|result, element| result + element}
	end
end

class AddChecker < MathChecker
	def check_partial combo
		@total >= (@square_count - combo.length) + get_sum(combo)
	end

	def check_solution combo
		result = @total == get_sum(combo)
		result
	end

	def get_sum(combo)
		combo.inject {|result, element| result + element}
	end
end

class MultiplyChecker < MathChecker
	def check_partial combo
		total_so_far = combo.inject {|result, element| result * element}
		(@total % total_so_far) == 0
	end

	def check_solution combo
		@total == combo.inject {|result, element| result * element}
	end
end

class DivideChecker < MathChecker
	def check_partial combo
		(combo[0] % @total == 0) || (combo[0] * @total <= @board_size)
	end

	def check_solution combo
		sorted = combo.sort

		sorted[0] * @total == sorted[1]
	end
end

class SubtractChecker < MathChecker
	def check_partial combo
		true
	end

	def check_solution combo
		combo.length == 2 && @total == (combo[1] - combo[0]).abs
	end
end

class NoOpChecker < MathChecker
	def initialize total, board_size, square_count
		@sub_checkers = [
			AddChecker.new(total, board_size, square_count),
			MultiplyChecker.new(total, board_size, square_count)
		]

		if square_count == 2
			@sub_checkers.concat([
				SubtractChecker.new(total, board_size, square_count),
				DivideChecker.new(total, board_size, square_count)
			])
		end
	end

	def check combo
		result = @sub_checkers.any?{|checker| checker.check combo}
		result
	end
end

class NoConstraintChecker
	def check combo
		true
	end
end