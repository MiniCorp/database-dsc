class CreatePublicCompanies < ActiveRecord::Migration
  def change
    create_view :public_companies
  end
end
