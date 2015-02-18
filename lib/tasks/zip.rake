require 'rubygems'
require 'zip'

namespace :zip do
	
  task :clean_attachments do
    archive_path = File.join( Rails.public_path , 'archive');
    archive_db_path = File.join( archive_path , 'db');

    Dir.mkdir archive_path unless Dir.exists? archive_path
    Dir.mkdir archive_db_path unless Dir.exists? archive_db_path

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
    archive_path = File.join( Rails.public_path , 'archive');
    archive_db_path = File.join( archive_path , 'db');

    Dir.mkdir archive_path unless Dir.exists? archive_path
    Dir.mkdir archive_db_path unless Dir.exists? archive_db_path

    io = Zip::File.open( File.join(archive_db_path,"#{Time.now}.zip"), Zip::File::CREATE)
    io.get_output_stream( "#{model}.json" ) { |f| 
      f.print( File.open( File.join( Rails.root, 'db', "#{Rails.env}.sqlite3"), "rb").read )
    }
    io.close

  end

end
