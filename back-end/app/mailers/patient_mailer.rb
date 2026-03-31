class PatientMailer < ApplicationMailer
  default from: 'no-reply@clinic.com'

  def appointment_reminder(patient, appointment)
    @patient = patient
    @appointment = appointment

    mail(
      to: @patient.email,
      subject: "Appointment Reminder"
    )
  end
end