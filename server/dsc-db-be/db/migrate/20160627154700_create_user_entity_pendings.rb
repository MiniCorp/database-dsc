class CreateUserEntityPendings < ActiveRecord::Migration
  def change
    create_table :user_entity_pendings do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.integer :entity_type
      t.integer :entity_id

      t.timestamps null: false
    end
  end
end
