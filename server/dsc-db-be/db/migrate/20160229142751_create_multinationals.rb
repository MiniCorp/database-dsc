class CreateMultinationals < ActiveRecord::Migration
  def change
    create_table :multinationals do |t|
      t.string :name
      t.string :logo
      t.text :short_description
      t.string :headquarters
      t.string :local_office

      t.timestamps
    end
  end
end
