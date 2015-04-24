class CreateWhatsOnImages < ActiveRecord::Migration
  def change
    create_table :whats_on_images do |t|
    	t.integer :whats_on_id
    	t.attachment :file
    	t.string :position
      	t.timestamps null: false
    end
  end
end
