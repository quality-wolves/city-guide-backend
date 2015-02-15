namespace :zip do

	task :do do
		temp_file = Tempfile.new( 'attachments.zip' )
		 
		Zip::File.open(temp_file.path, Zip::File::CREATE) do |zipfile|
      Find.find( File.join( Rails.public_path , 'uploads' ) ) do |path|
        Find.prune if File.basename(path)[0] == ?.
        dest = /#{dir}\/(\w.*)/.match(path)
        # Skip files if they exists
        begin
          zipfile.add(dest[1],path) if dest
        rescue Zip::ZipEntryExistsError
        end
      end
    end

		temp_file.save
	end

end
