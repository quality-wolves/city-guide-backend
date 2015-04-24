class AlterWhatsOns < ActiveRecord::Migration
  def change
  	rename_column :whats_ons, :title, :name
  	add_column :whats_ons, :lat, :float
  	add_column :whats_ons, :lng, :float
  	add_column :whats_ons, :phone, :string
  	add_column :whats_ons, :site, :string
  	add_column :whats_ons, :address, :string
  	add_column :whats_ons, :is_primary, :boolean, :default=>false
  	add_column :whats_ons, :tagline, :string
  end
end
