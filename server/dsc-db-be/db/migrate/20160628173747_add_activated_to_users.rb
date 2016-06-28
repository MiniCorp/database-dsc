class AddActivatedToUsers < ActiveRecord::Migration
  def up
    add_column :users, :activated, :boolean
    # all new users should be set to activated: false.
    # all existing users should be considered activated.
    User.update_all(activated: true)
  end

  def down
    remove_column :users, :activated
  end
end
