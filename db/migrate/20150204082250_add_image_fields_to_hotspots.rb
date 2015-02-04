class AddImageFieldsToHotspots < ActiveRecord::Migration
  def change
  	add_column :hotspots, :banner, :text
  	add_column :hotspots, :aditionnnal_image1, :text
  	add_column :hotspots, :aditionnnal_image2, :text
  end
end
