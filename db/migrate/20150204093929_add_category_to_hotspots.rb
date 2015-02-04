class AddCategoryToHotspots < ActiveRecord::Migration
  def change
    add_column :hotspots, :category, :text
  end
end
