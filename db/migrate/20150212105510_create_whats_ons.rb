class CreateWhatsOns < ActiveRecord::Migration
  def change
    create_table :whats_ons do |t|
      t.string :title
      t.text :description
      t.attachment :image
      t.datetime :date

      t.timestamps null: false
    end
  end
end
