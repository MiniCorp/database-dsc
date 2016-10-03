class RemoveActivatedFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :activated, :boolean, default: false
  end
end
