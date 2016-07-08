class CreatePublicHubs < ActiveRecord::Migration
  def change
    create_view :public_hubs
  end
end
