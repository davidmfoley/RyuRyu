require 'json'

class JsonSerializer
	def serialize board
		"{\"regions\":[#{board.regions.map {|r| r.to_json}.join(',')}]}"
	end

	def deserialize serialized
		data = JSON.parse serialized
		Board.new data["regions"].map{|r| deserialize_region r}
	end

	def deserialize_region(region)
		opts = {:squares => region["squares"]}
		opts[:total] = region["total"] if region["total"]

		opts[:operator] = region["operator"] if region["operator"]
		opts
	end
end