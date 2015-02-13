class CreateAdminUser < ActiveRecord::Migration
	def up
    Admin.create! do |admin|
    	admin.email = 'admin@cityguide.com'
    	admin.password = '12345678'
    	admin.password_confirmation = '12345678'
    end
  end
 
  def down
    Admin.delete({email:'admin@cityguide.com'})
  end
end
