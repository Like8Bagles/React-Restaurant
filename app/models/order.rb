class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items, :dependent => :destroy
  has_many :items, through: :order_items

  accepts_nested_attributes_for :order_items

  validates :order_name, presence: :true
end
