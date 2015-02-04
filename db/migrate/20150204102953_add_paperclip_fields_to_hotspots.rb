class AddPaperclipFieldsToHotspots < ActiveRecord::Migration
  def change
  	add_attachment :hotspots, :banner
  	add_attachment :hotspots, :aditionnal_image1
  	add_attachment :hotspots, :aditionnal_image2
  end
end
