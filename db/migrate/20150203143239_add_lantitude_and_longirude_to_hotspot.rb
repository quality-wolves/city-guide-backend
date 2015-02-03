class AddLantitudeAndLongirudeToHotspot < ActiveRecord::Migration
  def change
  	add_column :hotspots, :lat, :float
  	add_column :hotspots, :lng, :float
  end
end
