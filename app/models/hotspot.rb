class Hotspot < ActiveRecord::Base
  belongs_to :category
  validates :name, :presence => true
  validates :category, :presence => true

  rails_admin do
    configure :category do
      label 'Category of this hotspot: '
    end
  end
end
