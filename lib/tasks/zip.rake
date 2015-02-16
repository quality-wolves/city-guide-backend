require 'rubygems'
require 'zip'

namespace :zip do

	task :do do
		Dir.mkdir File.join( Rails.public_path , 'archive')
		@inputDir = File.join( Rails.public_path , 'uploads' )
    @outputFile = File.join( Rails.public_path , 'archive', 'attachments.zip' )

    entries = Dir.entries(@inputDir); entries.delete("."); entries.delete("..")
    io = Zip::File.open(@outputFile, Zip::File::CREATE);
    writeEntries(entries, "", io)
    io.close();

	end

  def writeEntries(entries, path, io)
    entries.each { |e|
      zipFilePath = path == "" ? e : File.join(path, e)
      diskFilePath = File.join(@inputDir, zipFilePath)
      puts "Deflating " + diskFilePath
      if File.directory?(diskFilePath)
        io.mkdir(zipFilePath)
        subdir =Dir.entries(diskFilePath); subdir.delete("."); subdir.delete("..")
        writeEntries(subdir, zipFilePath, io)
      else
        io.get_output_stream(zipFilePath) { |f| f.print(File.open(diskFilePath, "rb").read())}
      end
    }
  end

end
