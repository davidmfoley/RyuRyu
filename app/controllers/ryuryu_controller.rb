require 'board'
require 'board_solver'
class RyuryuController < ApplicationController
	layout "application"
	def index
		@board = Board.new([
			{:squares=> [[1, 1], [2, 1]], :total => 3, :operator =>"+"},
				{:squares=> [[1, 2], [2, 2]], :total => 4, :operator =>"+"},
				{:squares=> [[1, 3]], :total => 3},
				{:squares=> [[3, 1], [3, 2]], :total => 5, :operator =>"+"},
				{:squares=> [[2, 3], [3, 3]], :total => 3, :operator =>"+"}
				
			])

		solver = BoardSolver.new()
		@solution = solver.solve(@board)

		@json = JsonSerializer.new.serialize(@board)

	end

	def solve
		board_json = params[:board]
		board = JsonSerializer.new.deserialize board_json
		solution = BoardSolver.new.solve board
		puts solution.to_json
		render :text => solution.to_json
	end
end