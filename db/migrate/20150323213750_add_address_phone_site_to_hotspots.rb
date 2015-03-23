class AddAddressPhoneSiteToHotspots < ActiveRecord::Migration
  def change
  	add_column :hotspots, :phone, :string
  	add_column :hotspots, :site, :string
  	add_column :hotspots, :address, :string
  end
end
