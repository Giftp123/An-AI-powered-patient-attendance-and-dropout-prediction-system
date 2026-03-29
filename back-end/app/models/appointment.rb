class Appointment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :appointment_date, type: Date
  field :appointment_details, type: String
  field :status, type: String

  belongs_to :staff
  belongs_to :patient

  validates :appointment_date, presence: true
  validates :status, inclusion: { in: %w[Scheduled Completed Cancelled] }

  after_create :update_patient_data

  def upcoming?
    appointment_date >= Date.today
  end

  private

  def update_patient_data
    update_patient_lead_time
    patient.update_risk!
  end

  def update_patient_lead_time
    return unless appointment_date.present?

    lead_time = [(appointment_date - created_at.to_date).to_i, 0].max
    patient.update(lead_time_days: lead_time)
  end
end