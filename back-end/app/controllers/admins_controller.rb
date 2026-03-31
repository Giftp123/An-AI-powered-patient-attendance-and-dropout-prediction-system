class AdminsController < UsersController
  before_action :authenticate_admin!, except: [:create]
  skip_before_action :authenticate_user!, only: [:create]
    # skip_before_action :verify_authenticity_token

    def index
        admins = Admin.all
        render json: admins
    end

    def show
        admin = current_admin
        render json: admin
    end

    def create
        admin = Admin.new(admin_params)

        if admin.save
            render json: admin, status: :created
        else
            render json: { errors: admin.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        admin = current_admin
        admin.destroy
        head :no_content
    end

    private

    def admin_params
        params.permit(:name, :email, :password, :phone_number)
    end
end