json.array!(@whatsOns) do |whatsOn|
  json.extract! hotspot, :id, :title
  json.image request.protocol + request.host_with_port + whatsOn.image.url(:medium).gsub(/^\w+/, '')
  json.url whats_on_url(whatsOn, format: :json)
end
