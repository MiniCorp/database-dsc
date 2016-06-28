class AddLiveStatusToEntities < ActiveRecord::Migration
  def up
    add_column :companies, :is_live, :boolean, default: false
    add_column :multinationals, :is_live, :boolean, default: false
    add_column :investors, :is_live, :boolean, default: false
    add_column :hubs, :is_live, :boolean, default: false

    # all new records should be set to is_live: false.
    # all existing records should be considered live.
    Company.update_all(is_live: true)
    Multinational.update_all(is_live: true)
    Investor.update_all(is_live: true)
    Hub.update_all(is_live: true)
  end

  def down
    remove_column :companies, :is_live
    remove_column :multinationals, :is_live
    remove_column :investors, :is_live
    remove_column :hubs, :is_live
  end
end
