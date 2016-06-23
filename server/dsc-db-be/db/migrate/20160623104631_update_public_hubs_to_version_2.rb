class UpdatePublicHubsToVersion2 < ActiveRecord::Migration
  def change
    create_view :public_hubs, version: 2
  end
end
