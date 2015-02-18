require 'rubygems'
require 'zip'

namespace :zip do
	
  task :clean_attachments do
    archive_path = Rails.configuration.archive_path
    archive_db_path = Rails.configuration.archive_db_path

    Dir[ File.join(archive_path,'*_attachments.zip') ].each{ |f|
      File.delete(f) if ((Time.now - File.atime(f))/ 3600).round > 1
    }

    db_arhives = Dir[ archive_db_path ]
    db_arhives.each{ |f|
      File.delete(f) if ((Time.now - File.atime(f))/ 3600).round > 1
    } if db_arhives.length > 1

	end

  #00 00 * * * /bin/bash -l -c 'rake zip:db_backup >> /var/log/city-guide/backup.log 2>&1'
  task :db_backup => :environment do
    archive_path = Rails.configuration.archive_path
    archive_db_path = Rails.configuration.archive_db_path

    io = Zip::File.open( File.join(archive_db_path,"#{Time.now}.zip"), Zip::File::CREATE)
    io.get_output_stream( "db.sqlite3" ) { |f| 
      f.print( File.open( File.join( Rails.root, 'db', "#{Rails.env}.sqlite3"), "rb").read )
    }
    io.close

  end

end
