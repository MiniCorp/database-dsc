class CreateEntityExports < ActiveRecord::Migration
  def change
    create_table :entity_exports do |t|
      t.string :entity_type
      t.references :user
      t.timestamps null: false
    end

    add_attachment :entity_exports, :csv_file
  end
end
