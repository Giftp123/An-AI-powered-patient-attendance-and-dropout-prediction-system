class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword
  has_secure_password

  field :name, type: String
  field :email, type: String
  field :password_digest, type: String
  field :role, type: String, default: "patient"
  field :profile_image_url, type: String, default: "https://image2url.com/r2/default/images/1772557830988-428d3761-1c85-4bb4-a11f-70ec21d38637.png"

    # Virtual prefixed ID
  def public_id
    "user-#{id.to_s}" # Create a virtual id to distinguish user ids from other system ids
  end

  # Field validations
  # Name
  validates :name, presence: true

  # Email
  validates :email, presence: true, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP, 
    message: "must be a valid email address"}

  # Password
  validates :password, length: { minimum: 6 },
    format: {
      with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "must include at least one uppercase letter, one lowercase letter, and one number"
    }, if: -> { new_record? || !password.nil? }

  # Role restriction
  validates :role, inclusion: { in: %w[patient admin staff] }

  # Profile Image URL format
  validates :profile_image_url,
    format: {
      with: URI::DEFAULT_PARSER.make_regexp(%w[http https]),
      message: "must be a valid URL"
    }, allow_blank: true

  # Callbacks to private methods
  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase # Email address normalisation
  end

end
