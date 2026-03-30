class StaffsController < UsersController
  before_action :authenticate_staff!, except: [:create]
  skip_before_action :authenticate_user!, only: [:create]
    # skip_before_action :verify_authenticity_token

    def index
        staffs = Staff.all
        render json: staffs
    end

    def show
        staff = current_staff
        render json: staff
    end

    def create
        staff = Staff.new(staff_params)

        if staff.save
            render json: staff, status: :created
        else
            render json: { errors: staff.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        staff = current_staff

        if staff.update(staff_params)
            render json: staff
        else
            render json: { errors: staff.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        staff = current_staff
        staff.destroy
        head :no_content
    end

    private

    def staff_params
        params.permit(:name, :email, :password, :phone_number, :staff_type, :department)
    end
end