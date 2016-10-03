class RemoveProgramsApplicationDeadlineFromHubs < ActiveRecord::Migration
  def change
    drop_view :public_hubs
    
    remove_column :hubs, :programs, :text
    remove_column :hubs, :application_deadline, :date
  end
end
