class Hotspot < ActiveRecord::Base
  validates :name, :presence => true
  validates :category, :presence => true
  enum category: [ :stay, :eat, :buy, :drink, :see, :do]
end
