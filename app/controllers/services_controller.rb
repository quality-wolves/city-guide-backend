class ServicesController < ApplicationController
	before_filter :authenticate
	
	def is_updated
		@count = modified_hotspots.count
	end

	def get_attachments_that_has_loaded_after
		require 'rubygems'
		require 'zip'
		archive_path = Rails.configuration.archive_path
		outputFile = File.join( archive_path, params[:date] + '_attachments.zip' )

		unless File.exist?(outputFile)
			io = Zip::File.open( outputFile, Zip::File::CREATE);
	    modified_hotspots.each do |h|
  			zipFilePath = h.hotspot_images[0].path(:large)
	      io.get_output_stream( File.basename(zipFilePath) ) do |f| 
	      	f.print( File.open( File.join( Rails.public_path, zipFilePath ) ,"rb" ).read() )
	    	end
	    end
	    io.close();
	    File.chmod 0644, outputFile 
		end
    
    send_file outputFile;

	end

	def get_database
		send_file Dir[ File.join( Rails.configuration.archive_db_path, '*' ) ].max { |a,b| File.ctime(a) <=> File.ctime(b) }
	end

	def publish_db
		require 'rake'
		CityGuide::Application.load_tasks
		Rake::Task['zip:db_backup'].reenable
		Rake::Task['zip:db_backup'].invoke
		flash[:notice] = sprintf("Database is published now")
    redirect_to :back
	end

	protected

	def authenticate
		if action_name == 'publish_db'
			authenticate_admin! 
		else
	    authenticate_or_request_with_http_basic do |username, password|
	      if( admin = Admin.find_by_email(username) )
	      	admin.valid_password?(password)
	      end
	    end
	  end
	end

	def modified_hotspots
		after_date = DateTime.strptime(params[:date], '%Y-%m-%d %H:%M:%S') + 1.seconds
		back_up = Dir[ File.join( Rails.configuration.archive_db_path, '*' ) ].max { |a,b| File.ctime(a) <=> File.ctime(b) }
		last_date = File.ctime(back_up)
		if(last_date < after_date)
			return []
		end
		return Hotspot.where(updated_at: after_date..last_date)
	end

end