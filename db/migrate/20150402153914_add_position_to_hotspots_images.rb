class AddPositionToHotspotsImages < ActiveRecord::Migration
  def up
  	add_column :hotspot_images, :position, :string
  	HotspotImage.find_each do |image|
  		image.position = image.id
  		image.save
  	end
  end

  def down
  	remove_column :hotspot_images, :position
  end
end
