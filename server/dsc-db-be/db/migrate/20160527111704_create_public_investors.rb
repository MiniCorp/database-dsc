class CreatePublicInvestors < ActiveRecord::Migration
  def change
    create_view :public_investors
  end
end
