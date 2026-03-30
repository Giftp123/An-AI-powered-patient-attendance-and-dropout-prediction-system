class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  include ActionController::Cookies
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user!

  private

  # 🔐 General auth check
  def authenticate_user!
    return if current_staff || current_admin

    render json: { error: "Not authorized" }, status: :unauthorized
  end

  # 👨‍⚕️ Staff auth
  def authenticate_staff!
    unless current_staff
      render json: { error: "Staff not authorized" }, status: :unauthorized
    end
  end

  # 👑 Admin auth
  def authenticate_admin!
    unless current_admin
      render json: { error: "Admin not authorized" }, status: :unauthorized
    end
  end

  # 🔍 Current user helpers
  def current_staff
    @current_staff ||= Staff.where(id: session[:staff_id]).first
  end

  def current_admin
    @current_admin ||= Admin.where(id: session[:admin_id]).first
  end
end