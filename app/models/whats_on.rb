class WhatsOn < ActiveRecord::Base

  has_many :whats_on_images, -> { order('position desc') }, :dependent => :destroy
  accepts_nested_attributes_for :whats_on_images, :reject_if => :all_blank, :allow_destroy => true
  
  validates :name, :presence => true
  validates_length_of :tagline, :maximum => 140, :allow_blank => true

  before_save :update_primary, :if => :is_set_primay
  
  private
    def is_set_primay
      is_primary && (new_record? || is_primary_changed?)
    end

    def update_primary
      WhatsOn.update_all(is_primary: false)
    end

end
