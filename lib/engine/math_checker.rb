
class MathChecker

	def initialize total, board_size
		@total = total
		@board_size = board_size
	end

	def check_partial combo
		true
	end

	def self.get operator, total, board_size
		if operator == "+"
			return AddChecker.new total, board_size
		elsif operator == "*"
			return MultiplyChecker.new total, board_size
		elsif operator == "-"
			return SubtractChecker.new total, board_size
		elsif operator == "/"
			return DivideChecker.new total, board_size
		elsif (total || 0) > 0
			return NoOpChecker.new total, board_size
		else
			return NoConstraintChecker.new
		end
	end


	def check_solution combo
		@total == combo.inject {|result, element| result + element}
	end
end

class AddChecker < MathChecker
	def check_partial combo
		@total > combo.inject {|result, element| result + element}
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
		if combo.length > 1
			return false
		end
		(combo[0] * total) <= @board_size
	end

	def check_solution combo
		sorted = combo.sort

		sorted[0] * @total == sorted[1]

	end
end

class SubtractChecker < MathChecker
	def check_partial combo
		if combo.length > 1
			return false
		end
	end

	def check_solution combo
		combo.length == 2 && @total == (combo[1] - combo[0]).abs
	end
end

class NoOpChecker
	def initialize total, board_size
		@sub_checkers = [
			AddChecker.new(total, board_size),
			MultiplyChecker.new(total, board_size),
			SubtractChecker.new(total, board_size),
			DivideChecker.new(total, board_size)
		]
	end

	def check_partial combo
		@sub_checkers.any?{|checker| checker.check_partial combo}
	end

	def check_solution combo
		@sub_checkers.any?{|checker| checker.check_solution combo}
	end
end

class NoConstraintChecker
	def check_partial combo
		true
	end

	def check_solution combo
		true
	end
end