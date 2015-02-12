json.extract! @hotspot, :id, :name, :description, :lat, :lng, :created_at, :updated_at
json.image request.protocol + request.host_with_port + @hotspot.image.url(:medium).gsub(/^\w+/, '')
