json.array!(@hotspots) do |hotspot|
  json.extract! hotspot, :id, :name, :is_primary
  json.image  hotspot.hotspot_images.any? ? request.protocol + request.host_with_port + image_tag hotspot.hotspot_images[0].file.url(:medium).gsub(/^\w+/, '') : ''
  json.url hotspot_url(hotspot, format: :json)
end
