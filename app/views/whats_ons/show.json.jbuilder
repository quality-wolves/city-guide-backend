json.extract! @whatsOn, :id, :title, :description, :date
json.image request.protocol + request.host_with_port + @whatsOn.image.url(:medium).gsub(/^\w+/, '')
