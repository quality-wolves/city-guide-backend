class AddAttachmentFileToHotspotImages < ActiveRecord::Migration
  def self.up
    change_table :hotspot_images do |t|
      t.attachment :file
    end
  end

  def self.down
    remove_attachment :hotspot_images, :file
  end
end
