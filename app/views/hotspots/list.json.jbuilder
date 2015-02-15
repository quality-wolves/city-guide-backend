json.array!(@hotspots) do |hotspot|
  json.extract! hotspot, :id, :name
  json.image request.protocol + request.host_with_port + hotspot.image.url(:medium)
  json.url hotspot_url(hotspot, format: :json)
end
