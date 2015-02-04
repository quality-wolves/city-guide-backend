json.array!(@hotspots) do |hotspot|
  json.extract! hotspot, :id
  json.url hotspot_url(hotspot, format: :json)
end
