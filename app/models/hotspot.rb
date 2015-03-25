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
  
  validates :name, :presence => true
  validates :image, :presence => true
  validates :category, 
    :presence => true,
    :inclusion => { :in => self.categories }

  before_save :update_primary, :if => :is_set_primay

#crop params accessors
  # attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

#banner iamge processing
  #validates :banner, :presence => true
  
  has_attached_file :image, 
                    :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x640#'},
                    :path => 'uploads/:class-:id-:basename-:style.:extension'
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  has_attached_file :aditionnal_image1, 
                    :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x640#'},
                    :path => 'uploads/:class-:id-:basename-:style.:extension'
  validates_attachment_content_type :aditionnal_image1, :content_type => /\Aimage\/.*\Z/

  has_attached_file :aditionnal_image2, 
                    :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x640#'},
                    :path => 'uploads/:class-:id-:basename-:style.:extension'
  validates_attachment_content_type :aditionnal_image2, :content_type => /\Aimage\/.*\Z/
  
  # validates_attachment_content_type :banner, :content_type => /\Aimage\/.*\Z/
  
  #after_update :reprocess_banner, :if => :cropping?
  
  # def cropping?(param = nil)
  #   !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  # end
  
  # def banner_geometry(style = :original)
  #   @geometry ||= {}
  #   @geometry[style] ||= Paperclip::Geometry.from_file(banner.path(style))
  # end
  
  private
    def reprocess_banner
      banner.reprocess!
    end

    def is_set_primay
      is_primary && (new_record? || is_primary_changed?)
    end

    def update_primary
      Hotspot.where('category =?', category).update_all(is_primary: false)
    end

end
