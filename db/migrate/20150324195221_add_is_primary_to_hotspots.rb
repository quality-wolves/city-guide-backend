class AddIsPrimaryToHotspots < ActiveRecord::Migration
  def change
  	add_column :hotspots, :is_primary, :boolean, :default=>false
  end
end
