class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.has_many_through :items
      t.string :order_name

      t.timestamps
    end
  end
end
