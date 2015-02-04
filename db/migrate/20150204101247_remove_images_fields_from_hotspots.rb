class RemoveImagesFieldsFromHotspots < ActiveRecord::Migration
  def change
  	remove_column :hotspots, :banner
  	remove_column :hotspots, :aditionnnal_image1
  	remove_column :hotspots, :aditionnnal_image2
  end
end
