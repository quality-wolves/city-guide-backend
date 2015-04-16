json.extract! @hotspot, :id, :name,:is_primary, :tagline, :description, :address, :phone, :site, :lat, :lng, :created_at, :updated_at
json.hotspot_images(@hotspot.hotspot_images) do |image|
	image.file