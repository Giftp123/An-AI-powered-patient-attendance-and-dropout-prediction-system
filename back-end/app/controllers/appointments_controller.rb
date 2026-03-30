class AppointmentsController < ApplicationController
  before_action :authenticate_staff!
#   before_action :set_patient, only: [:create]
    def index
        appointments = Appointment.all
        render json: appointments
    end

    def show
        appointment = Appointment.find(params[:id])
        render json: appointment
    end

    def create
        patient = Patient.find(params[:patient_id])
        appointment = patient.appointments.build(appointment_params)
        appointment.staff = current_staff

        if appointment.save
            render json: appointment, status: :created
        else
            render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        appointment = Appointment.find(params[:id])

        if appointment.update(appointment_params)
            render json: appointment
        else
            render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        appointment = Appointment.find(params[:id])
        appointment.destroy
        head :no_content
    end

    private

    def appointment_params
        params.permit(
            :appointment_date,
            :appointment_details,
            :status
        )
    end
end