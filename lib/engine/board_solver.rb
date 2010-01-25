require "region_solver"

class BoardSolver
	def initialize
		@region_solver = RegionSolver.new
	end

	def solve board
		if !board.is_valid
			raise "Cannot solve invalid board!"
		end

		regions_and_solutions = board.regions.map{|r| [r, @region_solver.solve(r, board.size)]}

		find_solution regions_and_solutions, empty_matrix(board.size)
	end

	def find_solution(regions_and_solutions, matrix_so_far)
		remaining = regions_and_solutions.clone
		current = remaining.pop

		region = current[0]
		solutions = current[1]

		solutions.each do |s|
			matrix = apply_solution_to_matrix matrix_so_far, region.squares, s

			if is_valid_board matrix
				if remaining.length == 0
					return matrix
				end

				result = find_solution remaining, matrix

				if result != nil
					return result
				end
			end
		end

		nil
	end

	def is_valid_board(matrix)
		for index in 0...matrix.length
			column_values = matrix.map{|row| row[index]}

			row_values = matrix[index]
			if ! (check_line_of_values(row_values) && check_line_of_values(column_values))
				return false
			end
		end
		true
	end

	def check_line_of_values(vals_to_check)
		non_zero_vals = vals_to_check.select{|v| v > 0}
		non_zero_vals.length == non_zero_vals.uniq.length
	end

	def empty_matrix(size)
		matrix = []
		matrix_row= []

		for x in 1..size do
			matrix_row.push 0
		end
		for x in 1..size do
			matrix.push matrix_row.clone
		end
		return matrix
	end

	def apply_solution_to_matrix matrix, squares, solution
		new_matrix = matrix.map {|r| r.clone}

		solution.each_index do |index|
			square = squares[index]

			new_matrix[square[0] - 1][square[1] -1] = solution[index]
		end

		new_matrix
	end
end

class SolutionBoard
	def initialize size
		@matrix = []
		matrix_row= []

		for x in 1..size do
			matrix_row.push 0
		end
		for x in 1..size do
			@matrix.push matrix_row.clone
		end
	end

	def apply_solution squares, solution
		new_matrix = @matrix.map {|r| r.clone}

		solution.each_index do |index|
			square = squares[index]

			new_matrix[square[0] - 1][square[1] -1] = solution[index]
		end

		new_matrix
	end
end