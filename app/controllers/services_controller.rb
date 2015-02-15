class ServicesController < ApplicationController
	
	def is_updated
		@count = Hotspot.where("updated_at > ?",@date).count
	end

end