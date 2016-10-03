class CreatePublicMultinationals < ActiveRecord::Migration
  def change
    create_view :public_multinationals
  end
end
