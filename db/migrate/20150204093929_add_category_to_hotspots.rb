class AddCategoryToHotspots < ActiveRecord::Migration
  def change
    add_column :hotspots, :category, :enum
  end
end
