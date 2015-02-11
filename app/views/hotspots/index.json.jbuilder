json.array!(Hotspot.categories) do |category|
  json.categoryName category
  json.url list_hotspots_url(:category => category, format: :json)
end
