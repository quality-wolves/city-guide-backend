class RemoveAttachmentsFromHotspots < ActiveRecord::Migration
  def change
  	remove_attachment :hotspots, :image
  	remove_attachment :hotspots, :banner
  	remove_attachment :hotspots, :aditionnal_image1
  	remove_attachment :hotspots, :aditionnal_image2
  end
end
