class AddEmailConfirmedToUsers < ActiveRecord::Migration
  def up
    add_column :users, :email_confirmed, :boolean, default: false
    # all new users should be set to email_confirmed: false.
    # all existing users should be considered email_confirmed.
    User.update_all(email_confirmed: true)
  end

  def down
    remove_column :users, :email_confirmed
  end
end
