class User < ApplicationRecord
    has_many :orders
    has_secure_password

    validates :name, presence: :true
end
