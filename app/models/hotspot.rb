class Hotspot < ActiveRecord::Base

  def self.categories 
    [ 'stay', 'eat', 'buy', 'drink', 'see', 'do' ]
  end

  def self.category_icon_class(category)
    case category
      when 'buy'
        'fa fa-gift'
      when 'stay'
        'fa fa-home'
      when 'eat'
        'fa fa-smile-o'
      when 'drink'
        'fa fa-glass'
      when 'see'
        'fa fa-camera-retro'
      when 'do'
        'fa fa-car'
    end
  end

  def self.category_title(category)
    case category
      when 'buy'
        'Buy'
      when 'stay'
        'Stay'
      when 'eat'
        'Eat'
      when 'drink'
        'Drink'
      when 'see'
        'See'
      when 'do'
        'Do'
    end
  end

  has_many :hotspot_images, -> { order('position desc') }, :dependent => :destroy
  accepts_nested_attributes_for :hotspot_images, :reject_if => :all_blank, :allow_destroy => true
  
  validates :name, :presence => true
  validates :category, 
    :presence => true,
    :inclusion => { :in => self.categories }

  before_save :update_primary, :if => :is_set_primay
  
  private
    def is_set_primay
      is_primary && (new_record? || is_primary_changed?)
    end

    def update_primary
      Hotspot.where('category =?', category).update_all(is_primary: false)
    end

end
