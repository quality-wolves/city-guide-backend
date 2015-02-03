class CreateHotspots < ActiveRecord::Migration
  def change
    create_table :hotspots do |t|
      t.string :name
      t.text :description
      t.references :category, index: true

      t.timestamps null: false
    end
    add_foreign_key :hotspots, :categories
  end
end
