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
  validates :category, 
    :presence => true,
    :inclusion => { :in => self.categories }

#crop params accessors
  # attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

#banner iamge processing
  #validates :banner, :presence => true
  
  has_attached_file :image, 
                    :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x640#'},
                    :path => 'uploads/:class-:id-:basename-:style.:extension'
  do_not_validate_attachment_file_type :image
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

end
