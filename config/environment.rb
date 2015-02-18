# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

Rails.configuration.archive_path = archive_path = File.join( Rails.root, 'archive')
Rails.configuration.archive_db_path = archive_db_path = File.join( archive_path, 'db')

unless Dir.exists? archive_db_path
	Dir.mkdir archive_db_path
	File.chmod 0755, archive_db_path
end
