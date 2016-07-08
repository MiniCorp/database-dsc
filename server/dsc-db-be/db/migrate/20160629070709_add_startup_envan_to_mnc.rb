class AddStartupEnvanToMnc < ActiveRecord::Migration
  def change
    add_column :multinationals, :startup_evangelist, :boolean
  end
end
