class ServicesController < ApplicationController
	before_filter :authenticate
	
	def is_updated
		@count = Hotspot.where("updated_at > ?",params[:date]).count
	end

	def get_attachments_that_has_loaded_after
		require 'rubygems'
		require 'zip'
		archive = File.join( Rails.public_path , 'archive');
		Dir.mkdir File.join( Rails.public_path , 'archive') unless Dir.exists? archive
		outputFile = File.join( archive, params[:date]+'_attachments.zip' )

		unless File.exist?(outputFile)
			io = Zip::File.open( outputFile, Zip::File::CREATE);
		    Hotspot.where("image_updated_at > ?",params[:date]).each { |h|
    			zipFilePath = h.image.path(:large)
	    		diskFilePath = File.join( Rails.public_path, zipFilePath )
		      zipFilePath = File.basename(zipFilePath)
		      io.get_output_stream(zipFilePath) { |f| 
		      	f.print(File.open(diskFilePath, "rb").read())
		    	}
		    }
		    io.close();
		end
    
    send_file outputFile;

	end

	protected

	def authenticate
	    authenticate_or_request_with_http_basic do |username, password|
	        if( admin = Admin.find_by_email(username) )
	        	admin.valid_password?(password)
	        end
	    end
	end

end