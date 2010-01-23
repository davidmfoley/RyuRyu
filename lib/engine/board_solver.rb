require "region_solver"

class BoardSolver
	def initialize region_solver = RegionSolver.new
		@region_solver = region_solver
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

	def solve board

		matrix = empty_matrix(board.size)

		board.regions.each do |region|
			solutions = @region_solver.solve(region, board.size)
			matrix = apply_solution_to_matrix matrix, region, solutions[0]
		end

		matrix
	end

	def apply_solution_to_matrix matrix, region, solution
		new_matrix = matrix.clone

		solution.each_index do |index|
			square = region.squares[index]
			new_matrix[square[0] - 1][square[1] -1] = solution[index]
		end
		
		new_matrix
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
end