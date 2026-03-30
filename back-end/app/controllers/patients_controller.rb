class PatientsController < ApplicationController
    before_action :authenticate_staff!
    def index
        patients = Patient.all
        render json: patients
    end

    def show
        patient = Patient.find(params[:id])
        render json: patient, include: :appointments
    end

    def create
        patient = Patient.new(patient_params)

        if patient.save
            patient.update_risk! # 🔥 trigger ML immediately
            render json: patient, status: :created
        else
            render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        patient = Patient.find(params[:id])

        if patient.update(patient_params)
            patient.update_risk! # 🔥 recalc risk on update
            render json: patient
        else
            render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        patient = Patient.find(params[:id])
        patient.destroy
        head :no_content
    end

    # 🔥 OPTIONAL endpoint (very nice for demo)
    def predict
        patient = Patient.find(params[:id])
        result = patient.update_risk!
        render json: { risk: patient.risk_level }
    end

    def bulk_create
        patients = params[:patients]

        created = patients.map do |patient_data|
            Patient.create!(
            patient_data.permit(
                :name,
                :email,
                :age,
                :gender,
                :disease_severity,
                :engagement_status,
                :no_shows,
                :distance,
                :lead_time_days
            )
            )
        end

        # 🔥 Now trigger predictions
        created.each do |patient|
            patient.update_risk!
        end

        render json: { message: "#{created.count} patients created with predictions" }, status: :created
    end

    private

    def patient_params
        params.permit(
            :name,
            :email,
            :age,
            :gender,
            :disease_severity,
            :engagement_status,
            :no_shows,
            :distance,
            :lead_time_days
        )
    end
end