class Appointment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :appointment_date, type: Date
  field :appointment_time, type: String
  field :appointment_details, type: String
  field :status, type: String, default: "Scheduled"

  belongs_to :staff
  belongs_to :patient

  validates :appointment_date, presence: true
  validates :appointment_time,
  format: { with: /\A([01]\d|2[0-3]):([0-5]\d)\z/, message: "must be in HH:MM (24-hour) format" },
  allow_blank: true
  validates :status, inclusion: { in: %w[Scheduled Completed Cancelled] }

  after_create :update_patient_data
  after_create :send_reminder_email

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

  def send_reminder_email
    return unless upcoming?
    PatientMailer.appointment_reminder(patient, self).deliver_now
  end
end