class AddAllowSharingToEntities < ActiveRecord::Migration
  def change
    add_column :companies, :allow_sharing, :boolean, default: false
    add_column :hubs, :allow_sharing, :boolean, default: false
    add_column :investors, :allow_sharing, :boolean, default: false
    add_column :multinationals, :allow_sharing, :boolean, default: false
  end
end
