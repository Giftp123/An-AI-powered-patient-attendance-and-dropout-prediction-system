class Staff < User
  field :staff_type, type: String
  field :department, type: String

  has_many :appointments

  validates :staff_type, presence: :true
  validates :department, presence: true

  before_save -> { self.staff_type = staff_type.capitalize if staff_type.present? }
end