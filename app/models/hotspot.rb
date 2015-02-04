class Hotspot < ActiveRecord::Base
  include Paperclip::Glue
  
  validates :name, :presence => true
#  validates :category, :presence => true

  enum category: [ :stay, :eat, :buy, :drink, :see, :do]

#crop params accessors
  # attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

#banner iamge processing
  #validates :banner, :presence => true
  
  has_attached_file :image, :styles => { :small => "100x100#" }
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
