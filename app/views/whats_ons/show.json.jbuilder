json.extract! @whatsOn, :id, :title, :description
json.image request.protocol + request.host_with_port + @whatsOn.image.url(:medium)
json.date @whatsOn.date.strftime('%m/%d/%Y')