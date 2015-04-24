class WhatsOnImage < ActiveRecord::Base
	include Paperclip::Glue

	belongs_to :whatsOn

#crop params accessors
  # attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

#banner iamge processing
  #validates :banner, :presence => true

	has_attached_file :file, 
                    :styles => { :small => "100x100#", :medium => "275x275#", :large => '640x335#'},
                    :path => 'uploads/:class-:id-:basename-:style.:extension'
	validates_attachment_content_type :file, :content_type => /\Aimage\/.*\Z/
  	#crop_attached_file :avatar

# validates_attachment_content_type :banner, :content_type => /\Aimage\/.*\Z/
  
# after_update :reprocess_banner, :if => :cropping?

# def cropping?(param = nil)
#   !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
# end

# def banner_geometry(style = :original)
#   @geometry ||= {}
#   @geometry[style] ||= Paperclip::Geometry.from_file(banner.path(style))
# end
end
