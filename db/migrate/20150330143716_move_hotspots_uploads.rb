class MoveHotspotsUploads < ActiveRecord::Migration

  def up
  	fields = ['image','aditionnal_image1','aditionnal_image2']
    suffixes = ['_content_type','_file_size','_updated_at','_file_name']

    hotspot_table = Hotspot.table_name
    image_table = HotspotImage.table_name
  	Hotspot.find_each do |hotspot|
  		puts "do hotspot: #{hotspot.id}"
  		fields.each do |field_name|
  			###################
  			puts "do field_name: #{field_name}"
  			puts hotspot[field_name+'_file_name']
  			###################
  			next if !hotspot[field_name+'_file_name']
  			
  			image = HotspotImage.new
  			image.hotspot_id = hotspot.id

  			suffixes.each do |suffix|
  				###################
  				puts "image.file#{suffix} = hotspot.#{field_name}#{suffix}"
  				###################
  				image['file'+suffix] = hotspot[field_name+suffix]
  			end
  			
  			if image.save
  				(hotspot.send(field_name).styles.keys+[:original]).each do |style|
		  			###################
		  			puts "do style: #{style}"
		  			###################

						source = File.join(Rails.public_path,hotspot.send(field_name).path(style))
  					target = source.gsub(hotspot_table,image_table).gsub("#{hotspot.id}","#{image.id}")
  					###################
	  				puts "FileUtils.mv(#{source},#{target})"
	  				###################
  					FileUtils.mv(source,target)
  				
  				end
  			else
  				puts image.errors.full_messages.to_sentence
  			end

  		end
  	end
  end

  def down
  end
end
