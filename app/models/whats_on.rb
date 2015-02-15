class WhatsOn < ActiveRecord::Base
	include Paperclip::Glue

  validates :title, :presence => true
  
  has_attached_file :image,
  					:styles => { :small => "100x100#", :medium => "275x275#" },
  					:path => 'uploads/:class-:id-:basename.:extension'
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

end
