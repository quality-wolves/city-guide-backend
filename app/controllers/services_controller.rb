class ServicesController < ApplicationController
	
	def is_updated
		@count = Hotspot.where("updated_at > ?",params[:date]).count
	end

end