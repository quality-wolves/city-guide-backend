class ChangeWhatsOnDateColumnType < ActiveRecord::Migration
  def change
  	change_column :whats_ons, :date, :date
  end
end
