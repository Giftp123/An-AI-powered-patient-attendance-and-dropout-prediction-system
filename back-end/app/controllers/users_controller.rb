class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    wrap_parameters :user, include: [:name, :email, :role, :phone_number, :profile_image_url, :password, :password_confirmation]
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /users
    def index
        @users = User.all
        render json: @users, except: [:password_digest]
    end
  
    # GET /users/:id
    def show
        @user = User.find(params[:id])
        render json: @user, except: [:password_digest]
    end

    # POST /users
    def create
        @user = User.new(user_params)

        if @user.save
        render json: { user: @user }, status: :created
        else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /users/:id
    def update
        if @user.update(user_params)
        render json: @user
        else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # DELETE /users/:id
    def destroy
        @user.destroy
        head :no_content
    end
 
  private

    def set_user
        @user = User.find(params[:id])
        if @user.nil?
        render json: { error: 'User not found' }, status: :not_found
        end
    end

    def update_user_params
        params.require(:user).permit(:name, :email, :role, :phone_number, :profile_image_url, :password, :password_confirmation)
    end

    def user_params
        params.require(:user).permit(:name, :email, :role, :phone_number, :profile_image_url, :password, :password_confirmation)
    end

end