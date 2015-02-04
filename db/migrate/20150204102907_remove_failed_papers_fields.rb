class RemoveFailedPapersFields < ActiveRecord::Migration
  def change
  	remove_column :hotspots, :banner_file_name, :string
  	remove_column :hotspots, :banner_file_size, :number
  	remove_column :hotspots, :banner_content_type, :string
  	remove_column :hotspots, :banner_updated_at, :timestamps

  	remove_column :hotspots, :aditionnal_image1_file_name, :string
  	remove_column :hotspots, :aditionnal_image1_file_size, :number
  	remove_column :hotspots, :aditionnal_image1_content_type, :string
  	remove_column :hotspots, :aditionnal_image1_updated_at, :timestamps

  	remove_column :hotspots, :aditionnal_image2_file_name, :string
  	remove_column :hotspots, :aditionnal_image2_file_size, :number
  	remove_column :hotspots, :aditionnal_image2_content_type, :string
  	remove_column :hotspots, :aditionnal_image2_updated_at, :timestamps
  end
end
