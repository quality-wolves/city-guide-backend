class CreateHotspotImages < ActiveRecord::Migration
  def change
    create_table :hotspot_images do |t|
      t.integer :hotspot_id

      t.timestamps null: false
    end
  end
end
