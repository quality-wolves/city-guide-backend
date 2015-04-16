class AddTaglineToHotspots < ActiveRecord::Migration
  def change
  	add_column :hotspots, :tagline, :string
  end
end
