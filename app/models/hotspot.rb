class Hotspot < ActiveRecord::Base
  validates :name, :presence => true
  validates :category, :presence => true

  has_attached_file :banner, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :additionnal_image1, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :additionnal_image2, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"

  validates_attachment_content_type :banner, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :additionnal_image1, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :additionnal_image2, :content_type => /\Aimage\/.*\Z/

  enum category: [ :stay, :eat, :buy, :drink, :see, :do]
end
