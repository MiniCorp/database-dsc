class CreateAdmins < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      t.string :email,              null: false, default: ""
      t.string :first_name
      t.string :last_name
      t.string :password_digest

      t.timestamps null: false
    end

    add_index :admins, :email,       unique: true
  end
end
