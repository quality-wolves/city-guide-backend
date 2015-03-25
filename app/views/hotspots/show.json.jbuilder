json.extract! @hotspot, :id, :name,:is_primary, :description, :address, :phone, :site, :lat, :lng, :created_at, :updated_at
json.image request.protocol + request.host_with_port + @hotspot.image.url(:medium).gsub(/^\w+/, '')
json.aditionnal_image1 request.protocol + request.host_with_port + @hotspot.aditionnal_image1.url(:small).gsub(/^\w+/, '') if @hotspot.aditionnal_image1.exists?
json.aditionnal_image2 request.protocol + request.host_with_port + @hotspot.aditionnal_image2.url(:small).gsub(/^\w+/, '') if @hotspot.aditionnal_image2.exists?
