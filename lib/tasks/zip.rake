require 'rubygems'
require 'zip'

namespace :zip do

	task :clean_attachments do
    Dir["#{Rails.root}/public/archive/*_attachments.zip"].each{ |f|
      File.remove(f) if ((Time.now - File.atime(f))/ 3600).round > 1
    }
	end

  task :db_back_up do

  end

end
