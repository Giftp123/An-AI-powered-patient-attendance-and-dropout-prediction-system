class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  has_secure_password

  field :name, type: String
  field :email, type: String
  field :password_digest, type: String
  field :phone_number, type: String
  field :profile_image_url, type: String, default: "https://image2url.com/r2/default/images/1772557830988-428d3761-1c85-4bb4-a11f-70ec21d38637.png"

  index({ email: 1 }, { unique: true })

  def public_id
    "user-#{id}"
  end

  validates :name, presence: true

  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password,
    length: { minimum: 6 },
    format: {
      with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "must include uppercase, lowercase, and number"
    },
    if: -> { new_record? || !password.nil? }

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end