class UpdatePublicCompaniesToVersion2 < ActiveRecord::Migration
  def change
    create_view :public_companies, version: 2
  end
end
