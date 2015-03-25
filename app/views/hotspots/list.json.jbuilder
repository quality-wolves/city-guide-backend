json.array!(@hotspots) do |hotspot|
  json.extract! hotspot, :id, :name, :is_primary
  json.image request.protocol + request.host_with_port + hotspot.image.url(:medium).gsub(/^\w+/, '')
  json.url hotspot_url(hotspot, format: :json)
end
