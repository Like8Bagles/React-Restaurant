class UpdateItemsChangePriceColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :items, :price, :decimal, precision: 10, scale: 2
  end
end
