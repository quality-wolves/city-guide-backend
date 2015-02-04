class AddPaperclipFieldsFromHotspots < ActiveRecord::Migration
  def change
  	add_column :hotspots, :banner_file_name, :string
  	add_column :hotspots, :banner_file_size, :number
  	add_column :hotspots, :banner_content_type, :string
  	add_column :hotspots, :banner_updated_at, :timestamps

  	add_column :hotspots, :aditionnal_image1_file_name, :string
  	add_column :hotspots, :aditionnal_image1_file_size, :number
  	add_column :hotspots, :aditionnal_image1_content_type, :string
  	add_column :hotspots, :aditionnal_image1_updated_at, :timestamps

  	add_column :hotspots, :aditionnal_image2_file_name, :string
  	add_column :hotspots, :aditionnal_image2_file_size, :number
  	add_column :hotspots, :aditionnal_image2_content_type, :string
  	add_column :hotspots, :aditionnal_image2_updated_at, :timestamps
  end
end
