class SessionsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!, only: [:staff_login, :admin_login, :whoami]

  def staff_login
    staff = Staff.find_by(email: params[:email])

    if staff&.authenticate(params[:password])
      session[:admin_id] = nil
      session[:staff_id] = staff.id
      render json: { message: "Staff logged in", staff: staff }
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

  def admin_login
    admin = Admin.find_by(email: params[:email])

    if admin&.authenticate(params[:password])
      session[:staff_id] = nil
      session[:admin_id] = admin.id
      render json: { message: "Admin logged in", admin: admin }
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

  def whoami
    render json: {
      staff: current_staff,
      admin: current_admin
    }
  end

  def current_staff_info
    if current_staff
        render json: current_staff.as_json(except: [:password_digest])
    else
        render json: { error: "Not logged in" }, status: :unauthorized
    end
  end    

  def current_admin_info
    if current_admin
        render json: current_admin.as_json(except: [:password_digest])
    else
        render json: { error: "Not logged in" }, status: :unauthorized
    end
  end

  def logout
    session.delete(:staff_id)
    session.delete(:admin_id)
    render json: { message: "Logged out" }
  end
end
