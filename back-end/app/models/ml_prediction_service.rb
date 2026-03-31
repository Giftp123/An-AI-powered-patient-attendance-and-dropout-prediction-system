require 'net/http'
require 'json'

class MlPredictionService
  def self.predict(patient)
    uri = URI("http://localhost:8000/predict")

    data = patient.to_ml_payload

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.path, { "Content-Type" => "application/json" })
    request.body = data.to_json

    response = http.request(request)
    JSON.parse(response.body)
  end
end