class Patient
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :age, type: Integer
  field :gender, type: String

  field :disease_severity, type: Integer
  field :engagement_status, type: String
  field :no_shows, type: Integer
  field :distance, type: Float
  field :lead_time_days, type: Integer

  field :risk_level, type: String # Low / Medium / High

  has_many :appointments

  validates :name, :age, :gender, presence: true

  def to_ml_payload
    {
      Age: age,
      Gender: gender == "Male" ? 0 : 1,
      DiseaseSeverity: disease_severity,
      PastNoShows: no_shows,
      DistanceToClinic_KM: distance,
      LeadTime_Days: lead_time_days
    }
  end

  def update_risk!
    result = MlPredictionService.predict(self)
    update(risk_level: result["prediction"])
  end
end
