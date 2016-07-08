class AddApplicationsToHubs < ActiveRecord::Migration
  def change
    add_column :hubs, :applications, :jsonb, default: '[]'
  end
end
