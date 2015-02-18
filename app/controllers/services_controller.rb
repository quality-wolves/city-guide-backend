class ServicesController < ApplicationController
	before_filter :authenticate
	
	def is_updated
		@count = Hotspot.where("updated_at > ?",params[:date]).count
	end

	def get_attachments_that_has_loaded_after
		require 'rubygems'
		require 'zip'
		archive_path = Rails.configuration.archive_path
		outputFile = File.join( archive_path, params[:date] + '_attachments.zip' )

		unless File.exist?(outputFile)
			io = Zip::File.open( outputFile, Zip::File::CREATE);
	    Hotspot.where("image_updated_at > ?",params[:date]).each { |h|
  			zipFilePath = h.image.path(:large)
	      io.get_output_stream( File.basename(zipFilePath) ) { |f| 
	      	f.print( File.open( File.join( Rails.public_path, zipFilePath ) ,"rb" ).read() )
	    	}
	    }
	    io.close();
		end
    
    send_file outputFile;

	end

	def get_database
		send_file Dir[ File.join( Rails.configuration.archive_db_path, '*' ) ].max { |a,b| File.ctime(a) <=> File.ctime(b) }
	end

	def publish_db
		require 'rake'
		CityGuide::Application.load_tasks
		Rake::Task['zip:db_backup'].invoke
		flash[:notice] = sprintf("Database is published now")
    redirect_to :back
	end

	protected

	def authenticate
		authenticate_admin! if action_name == 'publish_db'
    authenticate_or_request_with_http_basic do |username, password|
      if( admin = Admin.find_by_email(username) )
      	admin.valid_password?(password)
      end
    end
	end

end