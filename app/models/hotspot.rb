class Hotspot < ActiveRecord::Base
  include Paperclip::Glue

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

  has_many :hotspot_images, :dependent => :destroy
  accepts_nested_attributes_for :hotspot_images, :reject_if => :all_blank, :allow_destroy => true

  has_attached_file :image, :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x640#'}, :path => 'uploads/:class-:id-:basename-:style.:extension'
  has_attached_file :aditionnal_image1, :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x640#'}, :path => 'uploads/:class-:id-:basename-:style.:extension'
  has_attached_file :aditionnal_image2, :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x640#'}, :path => 'uploads/:class-:id-:basename-:style.:extension'
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :aditionnal_image1, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :aditionnal_image2, :content_type => /\Aimage\/.*\Z/
  
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
