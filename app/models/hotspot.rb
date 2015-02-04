class Hotspot < ActiveRecord::Base
  enum category: [:stay, :eat, :buy, :drink, :see, :do]
  validates :name, :presence => true
  validates :category, :presence => true
end
